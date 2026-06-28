<script setup>
import { RiRefreshLine, RiArrowGoBackLine } from '@remixicon/vue'

defineEmits(['reset'])

const categories = [
  { key: 'apply_page', label: '页面设置', desc: '纸张大小、页边距、分栏' },
  { key: 'apply_body', label: '正文设置', desc: '字体、行距、缩进、对齐' },
  { key: 'apply_headings', label: '标题设置', desc: '4 级标题样式 + 编号规则' },
  { key: 'apply_figtbl', label: '图表设置', desc: '图题、表题、表格格式' },
  { key: 'apply_toc', label: '目录设置', desc: '目录标题 + 4 层样式' },
  { key: 'apply_header_footer', label: '页眉页脚设置', desc: '页眉/页脚内容与样式' },
]
</script>

<template>
  <div class="bg-cream px-6 py-4 border-b border-tan-border space-y-5 max-h-[calc(100vh-16rem)] overflow-y-auto">
    <div class="flex items-center gap-3 p-4 bg-cream-dark rounded-xl border border-tan-border">
      <div class="w-10 h-10 rounded-xl bg-jade-light/20 flex items-center justify-center shrink-0">
        <RiRefreshLine size="20" class="text-jade-light" />
      </div>
      <div>
        <p class="text-[13px] font-semibold text-brown-dark">恢复排版参数</p>
        <p class="text-[12px] text-brown-muted mt-0.5">
          将所有排版参数恢复为国标默认值，点击下方"重置"按钮确认
        </p>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div>
      <h4 class="text-[13px] font-semibold text-brown-dark mb-3">将重置以下分类</h4>
      <div class="space-y-2">
        <div
          v-for="cat in categories" :key="cat.key"
          class="flex items-center gap-3 px-3 py-2.5 bg-cream-dark rounded-lg border border-tan-border"
        >
          <RiArrowGoBackLine size="14" class="text-brown-muted shrink-0" />
          <div>
            <span class="text-[13px] font-medium text-brown-dark">{{ cat.label }}</span>
            <span class="text-[11px] text-brown-muted ml-2">{{ cat.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[1px] bg-tan-border"></div>

    <div class="flex justify-center pt-2 pb-4">
      <button
        class="flex items-center gap-2 px-8 py-3 bg-jade-light text-white rounded-xl text-[14px] font-semibold hover:bg-jade transition-colors"
        @click="$emit('reset')"
      >
        <RiRefreshLine size="16" color="white" />
        <span>重置所有排版参数</span>
      </button>
    </div>
  </div>
</template>
