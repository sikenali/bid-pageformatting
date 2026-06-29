<script setup>
import { ref, onMounted, nextTick } from 'vue'
import {
  RiPagesLine,
  RiTextSnippet,
  RiHeading,
  RiBarChart2Line,
  RiListCheck2,
  RiLayoutTop2Line,
  RiRefreshLine,
  RiCheckLine,
} from '@remixicon/vue'

const emit = defineEmits(['tab-change', 'cancel', 'apply'])
const activeTab = ref('page')
const props = defineProps({
})

const tabs = [
  { id: 'page', label: '页面', sublabel: 'Page Layout', icon: RiPagesLine },
  { id: 'heading', label: '标题', sublabel: 'Headings', icon: RiHeading },
  { id: 'body', label: '正文', sublabel: 'Body Text', icon: RiTextSnippet },
  { id: 'toc', label: '目录', sublabel: 'Table of Contents', icon: RiListCheck2 },
  { id: 'chart', label: '图表', sublabel: 'Charts & Tables', icon: RiBarChart2Line },
  { id: 'header', label: '页眉页脚', sublabel: 'Header & Footer', icon: RiLayoutTop2Line },
]

const selectTab = (tabId) => {
  activeTab.value = tabId
  emit('tab-change', tabId)
  nextTick(positionIndicator)
}

const tabContainerRef = ref(null)
const indicatorStyle = ref({ top: '0px', height: '0px' })
const isInitialized = ref(false) // 首次加载完成后标记

function positionIndicator() {
  const container = tabContainerRef.value
  if (!container) return
  const btns = container.querySelectorAll('button')
  const targetId = activeTab.value === 'reset' ? 'reset' : activeTab.value
  let targetBtn = null
  for (const btn of btns) {
    if (btn.dataset.tabId === targetId) {
      targetBtn = btn
      break
    }
  }
  if (!targetBtn) return
  const containerRect = container.getBoundingClientRect()
  const btnRect = targetBtn.getBoundingClientRect()
  indicatorStyle.value = {
    top: `${btnRect.top - containerRect.top}px`,
    height: `${btnRect.height}px`,
  }
}

onMounted(() => {
  // 延迟确保 DOM 完全渲染
  setTimeout(() => {
    positionIndicator()
    // 首次加载完成后启用动效
    isInitialized.value = true
  }, 100)
})
</script>

<template>
  <aside class="w-[280px] bg-cream border-r border-tan-border flex flex-col shrink-0">
    <div class="px-6 pt-5 pb-4">
      <h3 class="text-[16px] font-semibold text-brown-dark">文档排版标签</h3>
      <div class="w-full h-[2px] bg-tan-border mt-1"></div>
      <p class="text-[12px] text-brown-muted mt-2">选择需要识别的排版元素</p>
    </div>

    <div ref="tabContainerRef" class="flex-1 overflow-y-auto px-4 pb-3 space-y-2 relative bg-cream-darker rounded-xl mx-4">
      <div class="absolute left-4 right-4 rounded-xl shadow-sm pointer-events-none z-0"
        :class="[activeTab === 'reset' ? 'bg-[#C8A45C]' : 'bg-cinnabar', isInitialized ? 'transition-all duration-300 ease-out' : '']"
        :style="indicatorStyle">
      </div>
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :data-tab-id="tab.id"
        @click="selectTab(tab.id)"
        class="relative z-10 w-full rounded-xl py-3 px-4 flex items-center gap-3 transition-colors text-left"
        :class="activeTab === tab.id
          ? 'text-white'
          : 'text-brown-dark hover:text-brown-dark'"
      >
        <component :is="tab.icon" :size="20" :color="activeTab === tab.id ? 'white' : '#5C4033'" />
        <div class="flex-1">
          <div
            class="text-[15px]"
            :class="activeTab === tab.id ? 'font-semibold' : 'font-medium'"
          >
            {{ tab.label }}
          </div>
          <div
            class="text-[11px]"
            :class="activeTab === tab.id ? 'text-white/75' : 'text-brown-muted'"
          >
            {{ tab.sublabel }}
          </div>
        </div>
      </button>

      <div class="w-full h-[1px] bg-tan-border my-[14px]"></div>

      <button
        data-tab-id="reset"
        @click="selectTab('reset')"
        class="relative z-10 w-full rounded-xl py-3 px-4 flex items-center gap-3 transition-colors text-left"
        :class="activeTab === 'reset'
          ? 'text-white'
          : 'text-brown-dark hover:text-brown-dark'"
      >
        <RiRefreshLine :size="20" :color="activeTab === 'reset' ? 'white' : '#5C4033'" />
        <div class="flex-1">
          <div
            class="text-[15px]"
            :class="activeTab === 'reset' ? 'font-semibold' : 'font-medium'"
          >
            初始化
          </div>
          <div
            class="text-[11px]"
            :class="activeTab === 'reset' ? 'text-white/75' : 'text-brown-muted'"
          >
            Initialize
          </div>
        </div>
      </button>
    </div>

    <div class="px-4 py-4 space-y-3 border-t border-tan-border">
      <button
        @click="emit('cancel')"
        class="w-full flex items-center justify-center py-3 bg-cream-dark border border-tan-border rounded-xl text-[14px] font-medium text-brown transition-colors hover:bg-cream-darker"
      >
        取消
      </button>
      <button
        @click="emit('apply')"
        class="w-full flex items-center justify-center gap-2 py-3 bg-cinnabar text-white rounded-xl text-[14px] font-semibold transition-colors hover:bg-cinnabar-dark"
      >
        <RiCheckLine size="18" />
        <span>应用设置</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
