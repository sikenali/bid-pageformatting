<script setup>
defineProps({
  params: { type: Object, required: true },
})

const cnFonts = ['宋体', '仿宋', '黑体', '楷体', '微软雅黑', '思源宋体']
const enFonts = ['Times New Roman', 'Arial', 'Calibri', 'Verdana', 'Courier New']
const sizeCN = ['初号', '小初', '一号', '小一', '二号', '小二', '三号', '四号', '小四', '五号', '小五']
const lineSpacingModes = [
  { value: 'EXACT', label: '固定值' },
  { value: 'SINGLE', label: '单倍行距' },
  { value: 'MULTIPLE', label: '多倍行距' },
  { value: 'AT_LEAST', label: '最小值' },
]
const alignOptions = [
  { value: 'LEFT', label: '左对齐' },
  { value: 'CENTER', label: '居中对齐' },
  { value: 'RIGHT', label: '右对齐' },
  { value: 'JUSTIFY', label: '两端对齐' },
]
const units = ['pt', 'cm', 'inch', 'char']
</script>

<template>
  <div class="bg-cream px-6 py-4 border-b border-tan-border space-y-5 max-h-[calc(100vh-16rem)] overflow-y-auto">

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">字体</h4>
      <div class="grid grid-cols-3 gap-x-4 gap-y-3">
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[60px] shrink-0">中文字体</span>
          <select v-model="params.cn_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="f in cnFonts" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[60px] shrink-0">英文字体</span>
          <select v-model="params.en_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="f in enFonts" :key="f" :value="f">{{ f }}</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[60px] shrink-0">字号</span>
          <select v-model="params.size_cn" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="s in sizeCN" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">样式</h4>
      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="params.bold" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
          <span class="text-[12px] text-brown">粗体</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="params.italic" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
          <span class="text-[12px] text-brown">斜体</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="params.underline" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
          <span class="text-[12px] text-brown">下划线</span>
        </label>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">行距</h4>
      <div class="flex items-center gap-4">
        <select v-model="params.line_spacing_mode" class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[120px]">
          <option v-for="m in lineSpacingModes" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>
        <div class="flex items-center gap-2">
          <input type="number" step="0.5" v-model.number="params.line_spacing_value" class="w-20 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <span class="text-[12px] text-brown-muted">磅</span>
        </div>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">段间距</h4>
      <div class="grid grid-cols-2 gap-x-4 gap-y-3">
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[40px] shrink-0">段前</span>
          <input type="number" step="0.5" v-model.number="params.space_before_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <select v-model="params.space_before_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[40px] shrink-0">段后</span>
          <input type="number" step="0.5" v-model.number="params.space_after_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <select v-model="params.space_after_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">缩进</h4>
      <div class="grid grid-cols-3 gap-x-4 gap-y-3">
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[40px] shrink-0">左</span>
          <input type="number" step="0.1" v-model.number="params.left_indent_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <select v-model="params.left_indent_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[40px] shrink-0">右</span>
          <input type="number" step="0.1" v-model.number="params.right_indent_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <select v-model="params.right_indent_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] text-brown w-[60px] shrink-0">首行</span>
          <input type="number" step="0.1" v-model.number="params.first_line_indent_chars" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          <span class="text-[12px] text-brown-muted w-[30px]">字符</span>
        </div>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">对齐</h4>
      <div class="flex items-center gap-2">
        <button
          v-for="a in alignOptions" :key="a.value"
          @click="params.align = a.value"
          class="px-4 py-2 rounded-lg text-[12px] font-medium transition-colors"
          :class="params.align === a.value ? 'bg-cinnabar text-white' : 'bg-cream-darker text-brown border border-tan-border'"
        >{{ a.label }}</button>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-2">中英文空格</h4>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="params.add_space" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
          <span class="text-[12px] text-brown">添加中英文间空格</span>
        </label>
        <div class="flex items-center gap-2" v-if="params.add_space">
          <span class="text-[12px] text-brown">空格数</span>
          <input type="number" min="1" max="5" v-model.number="params.space_count" class="w-16 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
        </div>
      </div>
    </div>

  </div>
</template>
