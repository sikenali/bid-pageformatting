<script setup>
import { ref } from 'vue'

const props = defineProps({
  params: { type: Object, required: true },
})

const expandedLevel = ref(0)
const cnFonts = ['宋体', '仿宋', '黑体', '楷体', '微软雅黑', '思源宋体']
const enFonts = ['Times New Roman', 'Arial', 'Calibri', 'Verdana', 'Courier New']
const sizeCN = ['初号', '小初', '一号', '小一', '二号', '小二', '三号', '四号', '小四', '五号', '小五']
const lineSpacingModes = [
  { value: 'EXACT', label: '固定值' },
  { value: 'SINGLE', label: '单倍行距' },
  { value: 'MULTIPLE', label: '多倍行距' },
]
const tabLeaders = [
  { value: 'DOT', label: '点线' },
  { value: 'DASH', label: '虚线' },
  { value: 'UNDERSCORE', label: '下划线' },
  { value: 'NONE', label: '无' },
]
const levelLabels = ['第1层', '第2层', '第3层', '第4层']
</script>

<template>
  <div class="bg-cream px-6 py-4 border-b border-tan-border space-y-5 max-h-[calc(100vh-16rem)] overflow-y-auto">

    <div class="flex items-center gap-3 mb-2">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="params.enable" class="sr-only peer" />
        <div class="w-[40px] h-[22px] bg-cream-darker rounded-full peer peer-checked:bg-cinnabar transition-colors"></div>
        <div class="absolute left-[3px] top-[3px] w-[16px] h-[16px] bg-white rounded-full transition-transform peer-checked:translate-x-[18px]"></div>
      </label>
      <span class="text-[13px] font-medium text-brown-dark">启用目录</span>
    </div>

    <template v-if="params.enable">
      <div>
        <h4 class="text-[13px] font-semibold text-brown-dark mb-2">目录标题</h4>
        <div class="grid grid-cols-2 gap-x-4 gap-y-3">
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">标题文字</span>
            <input type="text" v-model="params.title_text" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">中文字体</span>
            <select v-model="params.title_cn_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="f in cnFonts" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">英文字体</span>
            <select v-model="params.title_en_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="f in enFonts" :key="f" :value="f">{{ f }}</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-[12px] text-brown w-[60px] shrink-0">字号</span>
            <select v-model="params.title_size_cn" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
              <option v-for="s in sizeCN" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="w-full h-[1px] bg-tan-border"></div>

      <div>
        <h4 class="text-[13px] font-semibold text-brown-dark mb-3">层级样式</h4>
        <div class="space-y-2">
          <div v-for="(level, idx) in params.level_styles" :key="idx" class="border border-tan-border rounded-lg overflow-hidden">
            <button
              @click="expandedLevel = expandedLevel === idx ? -1 : idx"
              class="w-full flex items-center justify-between px-4 py-3 text-left bg-cream-dark hover:bg-cream-darker transition-colors"
            >
              <span class="text-[13px] font-medium text-brown-dark">{{ levelLabels[idx] || '第' + (idx + 1) + '层' }}</span>
              <svg
                class="w-4 h-4 text-brown-muted transition-transform"
                :class="{ 'rotate-180': expandedLevel === idx }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="expandedLevel === idx" class="px-4 py-3 space-y-3">
              <div class="grid grid-cols-2 gap-x-4 gap-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">中文字体</span>
                  <select v-model="level.cn_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
                    <option v-for="f in cnFonts" :key="f" :value="f">{{ f }}</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">英文字体</span>
                  <select v-model="level.en_font" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
                    <option v-for="f in enFonts" :key="f" :value="f">{{ f }}</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">字号</span>
                  <select v-model="level.size_cn" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
                    <option v-for="s in sizeCN" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="level.bold" class="w-4 h-4 rounded border-tan-border text-cinnabar" />
                    <span class="text-[12px] text-brown">粗体</span>
                  </label>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">行距</span>
                  <select v-model="level.line_spacing_mode" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown min-w-[100px]">
                    <option v-for="m in lineSpacingModes" :key="m.value" :value="m.value">{{ m.label }}</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">前导符</span>
                  <select v-model="level.tab_leader" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown">
                    <option v-for="t in tabLeaders" :key="t.value" :value="t.value">{{ t.label }}</option>
                  </select>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[12px] text-brown w-[60px] shrink-0">左缩进</span>
                  <input type="number" step="0.1" v-model.number="level.left_indent_chars" class="flex-1 px-3 py-2 bg-cream border border-tan-border rounded-lg text-[13px] text-brown" />
                  <span class="text-[12px] text-brown-muted">字符</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
