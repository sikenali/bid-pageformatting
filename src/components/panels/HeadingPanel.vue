<script setup>
import { ref } from 'vue'

const props = defineProps({
  params: { type: Array, required: true },
  patterns: { type: Object, required: true },
})

const activeLevel = ref(0)

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
  { value: 'CENTER', label: '居中' },
  { value: 'RIGHT', label: '右对齐' },
  { value: 'JUSTIFY', label: '两端' },
]
const units = ['pt', 'cm', 'inch', 'char']
const schemes = [
  { value: 'ZH_NUM', label: '中文数字' },
  { value: 'ARABIC', label: '阿拉伯数字' },
  { value: 'ROMAN', label: '罗马数字' },
]
const wrappers = [
  { value: 'DUNHAO', label: '顿号（一、）' },
  { value: 'DOUBLE_PAREN', label: '双括号（（一））' },
  { value: 'DOT', label: '点号（1.）' },
  { value: 'SINGLE_PAREN', label: '单括号（1)）' },
]
const multiDepths = ['1', '1.1', '1.1.1', '1.1.1.1']
const levelLabels = ['一级标题', '二级标题', '三级标题', '四级标题']
</script>

<template>
  <div class="bg-cream border-b border-tan-border max-h-[calc(100vh-16rem)] flex flex-col">
    <div class="flex border-b border-tan-border">
      <button
        v-for="(label, idx) in levelLabels" :key="idx"
        @click="activeLevel = idx"
        class="flex-1 py-3 text-[13px] font-medium transition-colors text-center"
        :class="activeLevel === idx ? 'text-cinnabar border-b-2 border-cinnabar bg-cream-darker' : 'text-brown-muted hover:text-brown hover:bg-cream-dark'"
      >{{ label }}</button>
    </div>
    <div class="px-6 py-4 space-y-5 overflow-y-auto flex-1">
      <div>
        <h4 class="text-[13px] font-semibold text-brown-dark mb-2">字体</h4>
        <div class="grid grid-cols-3 gap-x-4 gap-y-3">
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">中文字体</span>
            <select v-model="params[activeLevel].cn_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="f in cnFonts" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">英文字体</span>
            <select v-model="params[activeLevel].en_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="f in enFonts" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">字号</span>
            <select v-model="params[activeLevel].size_cn" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
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
            <input type="checkbox" v-model="params[activeLevel].bold" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
            <span class="text-[12px] text-brown">粗体</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="params[activeLevel].italic" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
            <span class="text-[12px] text-brown">斜体</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="params[activeLevel].underline" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
            <span class="text-[12px] text-brown">下划线</span>
          </label>
        </div>
      </div>

      <div class="w-full h-[1px] bg-tan-border"></div>

      <div>
        <h4 class="text-[13px] font-semibold text-brown-dark mb-2">行距</h4>
        <div class="flex items-center gap-4">
          <select v-model="params[activeLevel].line_spacing_mode" class="px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[120px]">
            <option v-for="m in lineSpacingModes" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <div class="flex items-center gap-2">
            <input type="number" step="0.5" v-model.number="params[activeLevel].line_spacing_value" class="w-20 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
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
            <input type="number" step="0.5" v-model.number="params[activeLevel].space_before_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
            <select v-model="params[activeLevel].space_before_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[40px] shrink-0">段后</span>
            <input type="number" step="0.5" v-model.number="params[activeLevel].space_after_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
            <select v-model="params[activeLevel].space_after_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
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
            <input type="number" step="0.1" v-model.number="params[activeLevel].left_indent_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
            <select v-model="params[activeLevel].left_indent_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[40px] shrink-0">右</span>
            <input type="number" step="0.1" v-model.number="params[activeLevel].right_indent_value" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
            <select v-model="params[activeLevel].right_indent_unit" class="w-16 px-2 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">首行</span>
            <input type="number" step="0.1" v-model.number="params[activeLevel].first_line_indent_chars" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
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
            @click="params[activeLevel].align = a.value"
            class="px-4 py-2 rounded-lg text-[12px] font-medium transition-colors"
            :class="params[activeLevel].align === a.value ? 'bg-cinnabar text-white' : 'bg-cream-darker text-brown border border-tan-border'"
          >{{ a.label }}</button>
        </div>
      </div>

      <div class="w-full h-[1px] bg-tan-border"></div>

      <div>
        <h4 class="text-[13px] font-semibold text-brown-dark mb-2">编号规则</h4>
        <div class="space-y-3">
          <div v-for="(rule, idx) in patterns.rules" :key="idx" class="bg-cream-dark rounded-lg p-3 space-y-2">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="rule.enabled" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
                <span class="text-[12px] font-medium text-brown-dark">第 {{ idx + 1 }} 级</span>
              </label>
            </div>
            <div class="grid grid-cols-2 gap-x-3 gap-y-2" v-if="rule.enabled">
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-brown w-[50px] shrink-0">编号方案</span>
                <select v-model="rule.scheme" class="flex-1 px-2 py-1.5 bg-cream border border-tan-border rounded-lg text-[12px] text-brown">
                  <option v-for="s in schemes" :key="s.value" :value="s.value">{{ s.label }}</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-brown w-[50px] shrink-0">修饰符</span>
                <select v-model="rule.wrapper" class="flex-1 px-2 py-1.5 bg-cream border border-tan-border rounded-lg text-[12px] text-brown">
                  <option v-for="w in wrappers" :key="w.value" :value="w.value">{{ w.label }}</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-brown w-[50px] shrink-0">层级深度</span>
                <select v-model="rule.multi_depth" class="flex-1 px-2 py-1.5 bg-cream border border-tan-border rounded-lg text-[12px] text-brown">
                  <option v-for="d in multiDepths" :key="d" :value="d">{{ d }}</option>
                </select>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-brown w-[50px] shrink-0">自定义</span>
                <input type="text" v-model="rule.custom_example" placeholder="例如：(一)" class="flex-1 px-2 py-1.5 bg-cream border border-tan-border rounded-lg text-[12px] text-brown" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
