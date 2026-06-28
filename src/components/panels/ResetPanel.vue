<script setup>
import { RiCheckLine } from '@remixicon/vue'

const props = defineProps({
  textCleanup: { type: Object, required: true },
  styleCleanup: { type: Object, required: true },
  objectStructure: { type: Object, required: true },
  captionDetection: { type: Object, required: true },
  globalSwitches: { type: Object, required: true },
})

defineEmits(['reset'])

const sections = [
  {
    title: '文本清理',
    dot: 'bg-cinnabar',
    fields: [
      { key: 'add_space_between_cn_en', label: '中英文间加空格' },
      { key: 'punctuation_clean', label: '标点清理' },
      { key: 'clear_superscript', label: '清除上标' },
      { key: 'soft_enter_to_hard', label: '软回车转硬回车' },
      { key: 'remove_extra_blank_lines', label: '删除多余空行' },
    ],
  },
  {
    title: '样式清理',
    dot: 'bg-gold',
    fields: [
      { key: 'clear_all_styles', label: '清除所有样式' },
      { key: 'clear_paragraph_indent', label: '清除段落缩进' },
      { key: 'clear_align_grid', label: '清除对齐网格' },
      { key: 'clean_after_formatting', label: '格式化后清理残留样式' },
    ],
  },
  {
    title: '对象与结构处理',
    dot: 'bg-cloud-blue',
    fields: [
      { key: 'object_wrapping', label: '对象环绕方式' },
      { key: 'collapse_sdt_tags', label: '折叠SDT标签' },
    ],
    hasInput: true,
    inputKey: 'tab_stop_mode',
    inputLabel: '制表符模式',
  },
  {
    title: '图题/表题检测',
    dot: 'bg-jade',
    fields: [
      { key: 'fig_detection_enabled', label: '图题检测' },
    ],
    hasFigInput: true,
    figInputKey: 'fig_detection_spacing',
    figInputLabel: '图题检测间距',
    tblFields: [
      { key: 'tbl_detection_enabled', label: '表题检测' },
    ],
    tblInputKey: 'tbl_detection_spacing',
    tblInputLabel: '表题检测间距',
  },
  {
    title: '全局应用开关',
    dot: 'bg-cinnabar',
    isGrid: true,
    fields: [
      { key: 'apply_page', label: '应用页面设置' },
      { key: 'apply_body', label: '应用正文格式' },
      { key: 'apply_headings', label: '应用标题格式' },
      { key: 'apply_figtbl', label: '应用图题表题格式' },
      { key: 'apply_toc', label: '应用目录格式' },
      { key: 'apply_header_footer', label: '应用页眉页脚格式' },
      { key: 'auto_refresh_fields', label: '自动刷新域代码' },
      { key: 'close_word_after_refresh', label: '刷新后关闭Word' },
    ],
  },
]

function getData(section) {
  if (section.title === '文本清理') return props.textCleanup
  if (section.title === '样式清理') return props.styleCleanup
  if (section.title === '对象与结构处理') return props.objectStructure
  if (section.title === '图题/表题检测') return props.captionDetection
  if (section.title === '全局应用开关') return props.globalSwitches
  return {}
}

function toggle(key, section) {
  getData(section)[key] = !getData(section)[key]
}

function globalToggle(key) {
  props.globalSwitches[key] = !props.globalSwitches[key]
}

function onInput(section, key, e) {
  getData(section)[key] = e.target.value
}
</script>

<template>
  <div class="bg-cream px-6 py-4 border-b border-tan-border space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
    <div
      v-for="(section, si) in sections"
      :key="si"
      class="bg-cream-dark border border-tan-border rounded-xl p-6 space-y-4"
    >
      <div class="w-full h-[6px] bg-tan-dark rounded"></div>

      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="section.dot"></span>
        <span class="text-[15px] font-bold text-brown-dark" style="font-family: 'Source Han Sans SC'">{{ section.title }}</span>
      </div>

      <!-- Grid layout for global switches -->
      <div v-if="section.isGrid" class="grid grid-cols-2 gap-x-6 gap-y-3">
        <div
          v-for="field in section.fields"
          :key="field.key"
          class="flex items-center gap-2.5 cursor-pointer"
          @click="globalToggle(field.key)"
        >
          <div
            class="w-[18px] h-[18px] rounded flex items-center justify-center shrink-0"
            :class="globalSwitches[field.key] ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'"
          >
            <RiCheckLine v-if="globalSwitches[field.key]" size="14" color="white" />
          </div>
          <span class="text-[13px] font-medium text-brown" style="font-family: 'Source Han Sans SC'">{{ field.label }}</span>
        </div>
      </div>

      <!-- Normal fields -->
      <template v-else>
        <div
          v-for="field in section.fields"
          :key="field.key"
          class="flex items-center gap-2.5 cursor-pointer"
          @click="toggle(field.key, section)"
        >
          <div
            class="w-[18px] h-[18px] rounded flex items-center justify-center shrink-0"
            :class="getData(section)[field.key] ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'"
          >
            <RiCheckLine v-if="getData(section)[field.key]" size="14" color="white" />
          </div>
          <span class="text-[13px] font-medium text-brown" style="font-family: 'Source Han Sans SC'">{{ field.label }}</span>
        </div>

        <!-- Tab stop mode input -->
        <div v-if="section.hasInput" class="flex items-center gap-3 pl-[26px]">
          <span class="text-[13px] font-medium text-brown shrink-0" style="font-family: 'Source Han Sans SC'">{{ section.inputLabel }}</span>
          <input
            :value="getData(section)[section.inputKey]"
            @input="onInput(section, section.inputKey, $event)"
            class="flex-1 max-w-[80px] bg-white border border-tan-border rounded-lg px-4 py-2 text-[13px] text-brown-dark outline-none"
            style="font-family: 'Source Han Sans SC'"
          />
        </div>

        <!-- Fig caption input -->
        <div v-if="section.hasFigInput" class="flex items-center gap-3 pl-[26px]">
          <span class="text-[13px] font-medium text-brown shrink-0" style="font-family: 'Source Han Sans SC'">{{ section.figInputLabel }}</span>
          <input
            :value="getData(section)[section.figInputKey]"
            @input="onInput(section, section.figInputKey, $event)"
            class="w-[80px] bg-white border border-tan-border rounded-lg px-4 py-2 text-[13px] text-brown-dark outline-none"
            style="font-family: 'Source Han Sans SC'"
          />
        </div>

        <!-- Tbl caption checkbox + input -->
        <div
          v-for="tblField in (section.tblFields || [])"
          :key="tblField.key"
          class="flex items-center gap-2.5 cursor-pointer"
          @click="toggle(tblField.key, section)"
        >
          <div
            class="w-[18px] h-[18px] rounded flex items-center justify-center shrink-0"
            :class="getData(section)[tblField.key] ? 'bg-cinnabar' : 'bg-cream-darker border border-tan-border'"
          >
            <RiCheckLine v-if="getData(section)[tblField.key]" size="14" color="white" />
          </div>
          <span class="text-[13px] font-medium text-brown" style="font-family: 'Source Han Sans SC'">{{ tblField.label }}</span>
          <span v-if="section.tblInputLabel" class="text-[13px] font-medium text-brown ml-2 shrink-0" style="font-family: 'Source Han Sans SC'">{{ section.tblInputLabel }}</span>
          <input
            v-if="section.tblInputKey"
            :value="getData(section)[section.tblInputKey]"
            @input="onInput(section, section.tblInputKey, $event)"
            class="w-[80px] bg-white border border-tan-border rounded-lg px-4 py-2 text-[13px] text-brown-dark outline-none"
            style="font-family: 'Source Han Sans SC'"
          />
        </div>
      </template>
    </div>

    <div class="flex justify-center pt-2 pb-4">
      <button
        class="flex items-center gap-2 px-8 py-3 bg-jade-light text-white rounded-xl text-[14px] font-semibold hover:bg-jade transition-colors"
        @click="$emit('reset')"
      >
        <span>重置所有排版参数</span>
      </button>
    </div>
  </div>
</template>
