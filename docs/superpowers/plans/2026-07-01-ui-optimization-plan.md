# UI 组件提取与布局对齐优化 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 提取重复 UI 组件（LevelBar）、用已有组件替换内联代码、统一字段间距、修复 bug

**Architecture:** Panel 内部的内联代码逐步替换为 `src/components/ui/` 下已有或新建的组件；每个 Panel 文件独立修改，互不依赖

**Tech Stack:** Vue 3 (Composition API, `<script setup>`), Tailwind CSS, RemixIcon

---

### Task 1: 创建 LevelBar.vue 组件

**Files:**
- Create: `src/components/ui/LevelBar.vue`

- [ ] **Step 1: 创建 LevelBar.vue**

```vue
<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  labels: { type: Array, required: true },
})

const emit = defineEmits(['update:modelValue'])

const barRef = ref(null)
const indicatorStyle = ref({ left: '4px', width: '56px' })

function positionIndicator() {
  const bar = barRef.value
  if (!bar) return
  const btns = bar.querySelectorAll('button')
  const btn = btns[props.modelValue]
  if (!btn) return
  const barRect = bar.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  indicatorStyle.value = {
    left: `${btnRect.left - barRect.left}px`,
    width: `${btnRect.width}px`,
  }
}

function select(idx) {
  emit('update:modelValue', idx)
  nextTick(positionIndicator)
}

watch(() => props.modelValue, () => { nextTick(positionIndicator) })
onMounted(() => { nextTick(positionIndicator) })
</script>

<template>
  <div ref="barRef" class="bg-cream-darker rounded-lg p-[3px] flex items-center gap-[3px] relative">
    <div class="absolute top-[3px] bottom-[3px] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out pointer-events-none"
      :style="indicatorStyle">
    </div>
    <button v-for="(label, idx) in labels" :key="idx"
      @click="select(idx)"
      class="relative z-10 px-[10px] py-[5px] text-[12px] rounded-lg transition-colors duration-200 cursor-pointer"
      :class="modelValue === idx ? 'text-cinnabar font-semibold' : 'text-brown hover:text-brown-dark'"
    >{{ label }}</button>
  </div>
</template>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ui/LevelBar.vue
git commit -m "feat(ui): extract LevelBar component for tab/level switching"
```

---

### Task 2: HeadingPanel — 替换内联代码

**Files:**
- Modify: `src/components/panels/HeadingPanel.vue`

- [ ] **Step 1: 更新 import — 添加新组件引用，移除不再需要的图标**

```vue
<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { RiAddLine, RiSubtractLine } from '@remixicon/vue'
import DropdownSelect from '../ui/DropdownSelect.vue'
import AlignButtonGroup from '../ui/AlignButtonGroup.vue'
import CheckboxToggle from '../ui/CheckboxToggle.vue'
import SpacingInput from '../ui/SpacingInput.vue'
import LevelBar from '../ui/LevelBar.vue'
import { cnFonts, enFonts, sizeCN, lineSpacingModes, spacingUnits, numberingSchemes, wrappers } from '../../constants/ui'
```

- [ ] **Step 2: 移除内联 indicator 相关 script 代码 — 删除 `levelBarRef`、`indicatorStyle`、`positionIndicator()`、`onMounted`，由 LevelBar 接管**

```js
// 删除这些行:
const levelBarRef = ref(null)
const indicatorStyle = ref({ left: '4px', width: '56px' })
function positionIndicator() {
  const bar = levelBarRef.value
  if (!bar) return
  const btns = bar.querySelectorAll('button')
  const btn = btns[activeLevel.value]
  if (!btn) return
  const barRect = bar.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  indicatorStyle.value = {
    left: `${btnRect.left - barRect.left}px`,
    width: `${btnRect.width}px`,
  }
}
```

- [ ] **Step 3: 删除 `selectLevel` 函数中的 `nextTick(positionIndicator)`**

将:
```js
function selectLevel(idx) {
  activeLevel.value = idx
  nextTick(positionIndicator)
}
```
改为:
```js
function selectLevel(idx) {
  activeLevel.value = idx
}
```

- [ ] **Step 4: 删除 `onMounted(() => { nextTick(positionIndicator) })`**

- [ ] **Step 5: 模板 — 内联 level bar 替换为 `<LevelBar>`**

将:
```html
<div ref="levelBarRef" class="bg-cream-darker rounded-lg p-[3px] flex items-center gap-[3px] relative">
  <div class="absolute top-[3px] bottom-[3px] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out pointer-events-none"
    :style="indicatorStyle">
  </div>
  <button v-for="(label, idx) in levelLabels" :key="idx"
    @click="selectLevel(idx)"
    class="relative z-10 px-[10px] py-[5px] text-[12px] rounded-lg transition-colors duration-200 cursor-pointer"
    :class="activeLevel === idx ? 'text-cinnabar font-semibold' : 'text-brown hover:text-brown-dark'"
  >{{ label }}</button>
</div>
```
改为:
```html
<LevelBar v-model="activeLevel" :labels="levelLabels" />
```

- [ ] **Step 6: 模板 — 内联 align 按钮组替换为 `<AlignButtonGroup>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">对齐方式</span>
  <div class="bg-cream-darker rounded-lg p-[3px] flex items-center relative">
    <div class="absolute top-[3px] bottom-[3px] w-7 bg-white rounded-[3px] shadow-sm transition-all duration-300 ease-out pointer-events-none"
      :style="{ left: `${3 + ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFY'].indexOf(props.params[activeLevel].align) * 28}px` }">
    </div>
    <button @click="props.params[activeLevel].align = 'LEFT'"
      class="relative z-10 w-7 h-6 rounded-[3px] flex items-center justify-center transition-colors duration-200"
      :class="props.params[activeLevel].align === 'LEFT' ? 'text-cinnabar' : 'text-brown-muted hover:text-brown'">
      <RiAlignLeft size="13" />
    </button>
    <button @click="props.params[activeLevel].align = 'CENTER'"
      class="relative z-10 w-7 h-6 rounded-[3px] flex items-center justify-center transition-colors duration-200"
      :class="props.params[activeLevel].align === 'CENTER' ? 'text-cinnabar' : 'text-brown-muted hover:text-brown'">
      <RiAlignCenter size="13" />
    </button>
    <button @click="props.params[activeLevel].align = 'RIGHT'"
      class="relative z-10 w-7 h-6 rounded-[3px] flex items-center justify-center transition-colors duration-200"
      :class="props.params[activeLevel].align === 'RIGHT' ? 'text-cinnabar' : 'text-brown-muted hover:text-brown'">
      <RiAlignRight size="13" />
    </button>
    <button @click="props.params[activeLevel].align = 'JUSTIFY'"
      class="relative z-10 w-7 h-6 rounded-[3px] flex items-center justify-center transition-colors duration-200"
      :class="props.params[activeLevel].align === 'JUSTIFY' ? 'text-cinnabar' : 'text-brown-muted hover:text-brown'">
      <RiAlignJustify size="13" />
    </button>
  </div>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">对齐方式</span>
  <AlignButtonGroup v-model="props.params[activeLevel].align" :options="[
    { value: 'LEFT', icon: RiAlignLeft },
    { value: 'CENTER', icon: RiAlignCenter },
    { value: 'RIGHT', icon: RiAlignRight },
    { value: 'JUSTIFY', icon: RiAlignJustify },
  ]" />
</div>
```

需要在 script 中添加 `RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify` 的 import:
```js
import { RiAddLine, RiSubtractLine, RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify } from '@remixicon/vue'
```

- [ ] **Step 7: 模板 — 内联粗体/斜体/下划线 checkbox 替换为 `<CheckboxToggle>`**

将:
```html
<div class="flex items-center gap-[3px] cursor-pointer" ...>
  <div class="w-[16px] h-[16px] rounded-[3px] flex items-center justify-center transition-colors shrink-0"
    :class="... ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'">
    <RiCheckLine v-if="..." size="10" class="text-white" />
  </div>
  <span class="text-[12px] text-brown shrink-0">粗体</span>
</div>
<div class="flex items-center gap-[3px] cursor-pointer" ...>
  <div class="w-[16px] h-[16px] rounded-[3px] flex items-center justify-center transition-colors shrink-0"
    :class="... ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'">
    <RiCheckLine v-if="..." size="10" class="text-white" />
  </div>
  <span class="text-[12px] text-brown shrink-0">斜体</span>
</div>
<div class="flex items-center gap-[3px] cursor-pointer" ...>
  <div class="w-[16px] h-[16px] rounded-[3px] flex items-center justify-center transition-colors shrink-0"
    :class="... ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'">
    <RiCheckLine v-if="..." size="10" class="text-white" />
  </div>
  <span class="text-[12px] text-brown shrink-0">下划线</span>
</div>
```
改为:
```html
<CheckboxToggle v-model="props.params[activeLevel].bold" label="粗体" />
<CheckboxToggle v-model="props.params[activeLevel].italic" label="斜体" />
<CheckboxToggle v-model="props.params[activeLevel].underline" label="下划线" />
```

删除 `RiCheckLine` 的 import（不再需要）。

- [ ] **Step 8: 模板 — 行距值 `+ "磅"` 替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">值</span>
  <input type="number" min="0" step="0.5" v-model.number="props.params[activeLevel].line_spacing_value"
    class="w-[50px] bg-white border border-tan-border rounded-lg px-[8px] py-[6px] text-[12px] text-brown outline-none focus:border-cinnabar transition-colors" />
  <span class="text-[12px] text-brown shrink-0">磅</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">值</span>
  <SpacingInput v-model="props.params[activeLevel].line_spacing_value" unit="磅" step="0.5" width="w-[50px]" />
</div>
```

- [ ] **Step 9: 模板 — 首行缩进 `+ "字符"` 替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">首行</span>
  <input type="number" min="0" step="0.1" v-model.number="props.params[activeLevel].first_line_indent_chars"
    class="w-[50px] bg-white border ..." />
  <span class="text-[12px] text-brown shrink-0">字符</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">首行</span>
  <SpacingInput v-model="props.params[activeLevel].first_line_indent_chars" unit="字符" width="w-[50px]" />
</div>
```

- [ ] **Step 10: 提交**

```bash
git add src/components/panels/HeadingPanel.vue
git commit -m "refactor(heading): replace inline code with AlignButtonGroup, CheckboxToggle, LevelBar, SpacingInput"
```

---

### Task 3: ChartPanel — 替换内联代码 + 修复 bug

**Files:**
- Modify: `src/components/panels/ChartPanel.vue`

- [ ] **Step 1: 更新 import**

```js
import { ref, onMounted, nextTick } from 'vue'
import { RiCheckLine, RiAlignLeft, RiAlignCenter, RiAlignRight } from '@remixicon/vue'
import DropdownSelect from '../ui/DropdownSelect.vue'
import AlignButtonGroup from '../ui/AlignButtonGroup.vue'
import CheckboxToggle from '../ui/CheckboxToggle.vue'
import SpacingInput from '../ui/SpacingInput.vue'
import LevelBar from '../ui/LevelBar.vue'
import { cnFonts, enFonts, sizeCN, spacingUnits } from '../../constants/ui'
```

- [ ] **Step 2: 删除内联 indicator script 代码**

删除 `levelBarRef`、`indicatorStyle`、`positionIndicator()`、`onMounted(() => { nextTick(positionIndicator) })`。

- [ ] **Step 3: 简化 `selectLevel` 函数**

将:
```js
function selectLevel(idx) {
  activeLevel.value = idx
  nextTick(positionIndicator)
}
```
改为:
```js
function selectLevel(idx) {
  activeLevel.value = idx
}
```

- [ ] **Step 4: 模板 — level bar 替换为 `<LevelBar>`**

将:
```html
<div ref="levelBarRef" class="bg-cream-darker rounded-lg p-[3px] flex items-center gap-[3px] relative">
  <div class="absolute top-[3px] bottom-[3px] bg-white rounded-lg shadow-sm ..." :style="indicatorStyle"></div>
  <button v-for="(label, idx) in levelLabels" :key="idx"
    @click="selectLevel(idx)"
    class="relative z-10 px-[10px] py-[5px] text-[12px] rounded-lg ..."
    :class="activeLevel === idx ? 'text-cinnabar font-semibold' : 'text-brown hover:text-brown-dark'"
  >{{ label }}</button>
</div>
```
改为:
```html
<LevelBar v-model="activeLevel" :labels="levelLabels" />
```

- [ ] **Step 5: 模板 — 图/表标题对齐按钮组替换为 `<AlignButtonGroup>`**

将 `activeSubTab === 'fig'` 分支内的对齐按钮组（`['LEFT', 'CENTER', 'RIGHT'].indexOf(...)`）替换为:
```html
<AlignButtonGroup v-model="currentParams().align" :options="[
  { value: 'LEFT', icon: RiAlignLeft },
  { value: 'CENTER', icon: RiAlignCenter },
  { value: 'RIGHT', icon: RiAlignRight },
]" />
```

- [ ] **Step 6: 模板 — 表格单元格对齐按钮组替换为 `<AlignButtonGroup>`**

将表格设置内的对齐按钮组替换为:
```html
<AlignButtonGroup v-model="props.tableSettings.align" :options="[
  { value: 'LEFT', icon: RiAlignLeft },
  { value: 'CENTER', icon: RiAlignCenter },
  { value: 'RIGHT', icon: RiAlignRight },
]" />
```

- [ ] **Step 7: 模板 — 粗体/斜体/下划线替换为 `<CheckboxToggle>`**

将:
```html
<div class="flex items-center gap-[3px] cursor-pointer" @click="currentParams().bold = !currentParams().bold">
  <div class="w-[16px] h-[16px] rounded-[3px] flex items-center justify-center ..."
    :class="currentParams().bold ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'">
    <RiCheckLine v-if="currentParams().bold" size="10" class="text-white" />
  </div>
  <span class="text-[12px] text-brown shrink-0">粗体</span>
</div>
<div class="flex items-center gap-[3px] cursor-pointer" @click="currentParams().italic = !currentParams().italic">...</div>
<div class="flex items-center gap-[3px] cursor-pointer" @click="currentParams().underline = !currentParams().underline">...</div>
```
改为:
```html
<CheckboxToggle v-model="currentParams().bold" label="粗体" />
<CheckboxToggle v-model="currentParams().italic" label="斜体" />
<CheckboxToggle v-model="currentParams().underline" label="下划线" />
```

- [ ] **Step 8: 修复 `indentUnits` bug**

将:
```html
<DropdownSelect v-model="currentParams().left_indent_unit" :options="indentUnits" width-class="auto" />
```
改为:
```html
<DropdownSelect v-model="currentParams().left_indent_unit" :options="spacingUnits" width-class="auto" />
```

同理右缩进:
```html
<DropdownSelect v-model="currentParams().right_indent_unit" :options="indentUnits" width-class="auto" />
```
改为:
```html
<DropdownSelect v-model="currentParams().right_indent_unit" :options="spacingUnits" width-class="auto" />
```

- [ ] **Step 9: 图/表标题 — 行距值 `<input> + "磅"` 替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">值</span>
  <input type="number" min="0" step="0.5" v-model.number="currentParams().line_spacing_value"
    class="w-[50px] ..." />
  <span class="text-[12px] text-brown shrink-0">磅</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">值</span>
  <SpacingInput v-model="currentParams().line_spacing_value" unit="磅" step="0.5" width="w-[50px]" />
</div>
```

- [ ] **Step 10: 表格 — 行距值和最小行高替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">行距数值</span>
  <input type="number" min="0" step="0.5" v-model.number="props.tableSettings.line_spacing_value" class="w-[50px] ..." />
  <span class="text-[12px] text-brown shrink-0">磅</span>
</div>
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">最小行高</span>
  <input type="number" min="0" step="0.5" v-model.number="props.tableSettings.min_line_height" class="w-[50px] ..." />
  <span class="text-[12px] text-brown shrink-0">磅</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">行距数值</span>
  <SpacingInput v-model="props.tableSettings.line_spacing_value" unit="磅" step="0.5" width="w-[50px]" />
</div>
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">最小行高</span>
  <SpacingInput v-model="props.tableSettings.min_line_height" unit="磅" step="0.5" width="w-[50px]" />
</div>
```

- [ ] **Step 11: 提交**

```bash
git add src/components/panels/ChartPanel.vue
git commit -m "refactor(chart): replace inline code with components, fix indentUnits bug"
```

---

### Task 4: TOCPanel — LevelBar + SpacingInput 替换

**Files:**
- Modify: `src/components/panels/TOCPanel.vue`

- [ ] **Step 1: 更新 import**

```js
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { RiCheckLine, RiAddLine, RiSubtractLine } from '@remixicon/vue'
import DropdownSelect from '../ui/DropdownSelect.vue'
import SpacingInput from '../ui/SpacingInput.vue'
import LevelBar from '../ui/LevelBar.vue'
import { cnFonts, enFonts, sizeCN, lineSpacingModes, spacingUnits, tabLeaders } from '../../constants/ui'
```

- [ ] **Step 2: 添加 levelLabels computed**

删除 `levelBarRef`、`indicatorStyle`、`positionIndicator()`、`onMounted` 相关代码。

在 `activeLevel` 后添加:
```js
const levelLabels = computed(() =>
  props.params.level_styles.map((_, idx) => `第${idx + 1}层`)
)
```

- [ ] **Step 3: 简化 `selectLevel`**

去掉 `nextTick(positionIndicator)`。

- [ ] **Step 4: 模板 — level bar 替换为 `<LevelBar>`**

将:
```html
<div ref="levelBarRef" class="bg-cream-darker rounded-lg p-[3px] flex items-center gap-[3px] relative">
  <div class="absolute top-[3px] bottom-[3px] bg-white rounded-lg shadow-sm ..." :style="indicatorStyle"></div>
  <button v-for="(_, idx) in props.params.level_styles" :key="idx"
    @click="selectLevel(idx)"
    class="relative z-10 px-[10px] py-[5px] text-[12px] rounded-lg ..."
    :class="activeLevel === idx ? 'text-cinnabar font-semibold' : 'text-brown hover:text-brown-dark'"
  >第{{ idx + 1 }}层</button>
</div>
```
改为:
```html
<LevelBar v-model="activeLevel" :labels="levelLabels" />
```

- [ ] **Step 5: 模板 — 行距值 `<input> + "磅"` 替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">行距数值</span>
  <input type="number" min="0" step="0.1" v-model.number="params.level_styles[activeLevel].line_spacing_value"
    class="w-[60px] ..." />
  <span class="text-[12px] text-brown-muted shrink-0">磅</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">行距数值</span>
  <SpacingInput v-model="params.level_styles[activeLevel].line_spacing_value" unit="磅" width="w-[60px]" />
</div>
```

- [ ] **Step 6: 模板 — 左缩进 `<input> + "字符"` 替换为 `<SpacingInput>`**

将:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">左缩进</span>
  <input type="number" min="0" step="0.1" v-model.number="params.level_styles[activeLevel].left_indent_value"
    class="w-[60px] ..." />
  <span class="text-[12px] text-brown-muted shrink-0">字符</span>
</div>
```
改为:
```html
<div class="flex items-center gap-1">
  <span class="text-[12px] text-brown shrink-0">左缩进</span>
  <SpacingInput v-model="params.level_styles[activeLevel].left_indent_value" unit="字符" width="w-[60px]" />
</div>
```

- [ ] **Step 7: 提交**

```bash
git add src/components/panels/TOCPanel.vue
git commit -m "refactor(toc): replace inline code with LevelBar and SpacingInput"
```

---

### Task 5: 统一间距 + BodyPanel 对齐

**Files:**
- Modify: `src/components/panels/BodyPanel.vue`
- Modify: `src/components/panels/HeaderFooterPanel.vue`
- Modify: `src/components/panels/PagePanel.vue`

- [ ] **Step 1: BodyPanel — 统一 gap 间距**

BodyPanel 当前使用 `gap-4` (grid)、`gap-2`、`gap-3`：
- `.grid.grid-cols-2.gap-4` — 卡片间 grid 间距（保留 `gap-4`）
- 卡片内的 `.grid.grid-cols-2.gap-3` — 字段 grid（`gap-3` → `gap-2`）
- 行距区 `.flex.flex-wrap.items-center.gap-2` — 保留 `gap-2`（已统一）
- 段间距区的 `.flex.items-center.gap-2` — 保留 `gap-2`
- 缩进区的 `.grid.grid-cols-2.gap-3` — `gap-3` → `gap-2`
- 对齐区的 `.flex.flex-wrap.items-center.gap-2` — 保留

需要修改: `.gap-3` → `.gap-2` 在 grid 容器中（第24、80行）

- [ ] **Step 2: HeaderFooterPanel — 统一 gap**

`gap-3` → `gap-2` 统一，`gap-[6px]` 保持。

- [ ] **Step 3: PagePanel — 统一 gap**

`gap-3` → `gap-2` 统一。

- [ ] **Step 4: 提交**

```bash
git add src/components/panels/BodyPanel.vue src/components/panels/HeaderFooterPanel.vue src/components/panels/PagePanel.vue
git commit -m "style: unify gap spacing across panels (gap-3 -> gap-2)"
```

---

### Task 6: 全局校验 — 启动项目验证无控制台错误

- [ ] **Step 1: 启动 dev server 验证**

```bash
npm run dev
```

- [ ] **Step 2: 逐一点击 7 个 Panel 标签，检查控制台无报错**
  - BodyPanel: 检查字体/行距/缩进/对齐每个字段
  - HeadingPanel: 切换标题级别、检查对齐按钮组
  - TOCPanel: 切换目录层级、检查各字段
  - ChartPanel: 切换图/表标题、表格单元格
  - HeaderFooterPanel: 页眉/页脚切换
  - PagePanel: 纸张设置
  - ResetPanel: 选项切换

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "chore: verify all panels render without errors"
```
