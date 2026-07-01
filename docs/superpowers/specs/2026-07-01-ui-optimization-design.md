# UI 组件提取与布局对齐优化设计

## 目标

1. 7 个设置面板（BodyPanel、HeadingPanel、TOCPanel、ChartPanel、HeaderFooterPanel、PagePanel、ResetPanel）的字段水平和垂直对齐优化
2. 区块背景不变
3. 提取共享 UI 组件到 `src/components/ui/`
4. 参数单位界面显示保持统一，优化视觉呈现

## 设计范围

### 1. 组件提取

#### 1a. AlignButtonGroup 替换（3处）

替换内联对齐按钮组，修复 `indexOf` 引用比较 bug：

| 位置 | 替换内容 | 行号 |
|------|---------|------|
| HeadingPanel | 对齐方式按钮组 | 293-317 |
| ChartPanel (图/表标题) | 对齐方式按钮组 | 180-199 |
| ChartPanel (表格单元格) | 对齐方式按钮组 | 282-301 |

#### 1b. CheckboxToggle 替换（6处）

替换内联 checkbox 模式：

| 位置 | 替换内容 | 行号 |
|------|---------|------|
| HeadingPanel | 粗体/斜体/下划线 | 208-228 |
| ChartPanel | 粗体/斜体/下划线 | 96-118 |

需要确认 `CheckboxToggle` 接口满足需求：当前 `size` prop 支持 `small`(16px) / `medium`(18px)，`label` 必填。

#### 1c. LevelBar 组件提取（3处通用）

提取为 `src/components/ui/LevelBar.vue`

**接口设计：**
```vue
<LevelBar v-model="activeLevel" :labels="levelLabels" />
```

| 使用处 | 当前实现 | 行号 |
|--------|---------|------|
| HeadingPanel | 标题级别选择器（动态 labels） | 170-180 |
| TOCPanel | 目录层级选择器（固定 labels） | 157-166 |
| ChartPanel | 图/表标题切换（固定 labels） | 64-74 |

**Props:**
- `modelValue: Number` — 当前选中索引
- `labels: String[]` — 各级别标签数组

**逻辑：**
- 滑动白色指示器 + 按钮列表
- `positionIndicator()` 根据选中按钮计算位置
- `data-highlighted` 属性

#### 1d. SpacingInput 替换裸输入（~8处）

将以下位置的裸 `<input type="number"> + <span>磅/字符</span>` 替换为 `<SpacingInput>`：

| Panel | 字段 |
|-------|------|
| HeadingPanel | 行距值（磅）、段前值（+单位）、段后值（+单位）、左缩进值（+单位）、右缩进值（+单位）、首行缩进（字符） |
| TOCPanel | 段前间距（+单位）、段后间距（+单位） |
| ChartPanel | 行距值（磅）、段前值、段后值、左边距（+单位）、右边距（+单位） |

有些位置需要额外支持单位选择器（DropdownSelect 跟在输入框后），SpacingInput 的 `unit` prop 只支持静态文本标签。需要扩展 Prop 支持单位选择模式，或者保持目前的 `SpacingInput + DropdownSelect` 组合不变，仅替换静态单位标签。

**修正策略：**
- Static unit text (e.g., "磅", "字符"): use `<SpacingInput unit="磅">`
- Dropdown unit selector (e.g., spacingUnits): keep existing `SpacingInput + DropdownSelect` combo

### 2. 字段对齐优化

#### 2a. 间距统一

| 当前 | 统一为 |
|------|-------|
| `gap-3` (12px) | `gap-2` (8px) 或 `gap-[6px]` |
| `gap-1` (4px) | `gap-[6px]` |
| `gap-[8px]` | 保留（卡片标题专用） |

#### 2b. 修复 ChartPanel indentUnits bug

`ChartPanel.vue:161,167` 引用了未定义的变量 `indentUnits`，改为 `spacingUnits`。

### 3. 单位界面显示优化

- 保持当前 `spacingUnits` 取值和标签不变
- 统一使用 `SpacingInput` 组件渲染数值 + 单位
- 确保单位下拉框与输入框对齐在同一行

## 不变的部分

- 所有区块背景色（`bg-cream`、`bg-cream-dark`、`bg-cream-darker`）
- 卡片边框和圆角
- 标题字体和颜色
- 颜色选择器保持内联
- 特殊的 checkbox 样式（如 ResetPanel 的"全选" + 列表项）
- 单位取值和后端映射

## 边界情况

- `normalizedOptions` 已在 DropdownSelect 中做空保护
- AlignButtonGroup 的 `options` 为空时降级为`[]`
- LevelBar 的 `labels` 为空数组时渲染空按钮组
