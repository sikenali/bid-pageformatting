<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { RiArrowLeftSLine, RiSearchLine, RiBookOpenLine, RiFileTextLine, RiBuildingLine, RiBook2Line, RiBarChart2Line, RiCheckLine, RiFileList3Line, RiCalendarLine, RiFilePaper2Line } from '@remixicon/vue'

const router = useRouter()
const activeCategory = ref('all')
const categories = ['all', 'official', 'academic', 'business', 'creative']
const categoryLabels = {
  all: '全部',
  official: '公文',
  academic: '学术',
  business: '商务',
  creative: '创意'
}

const books = [
  {
    id: 1, name: 'GB/T 国标', category: 'official', selected: true,
    spineColor: 'bg-cinnabar', icon: RiFileList3Line, iconBg: 'bg-cream-darker', iconColor: '#C23B22',
    author: '国务院', desc1: 'GB/T 9704-2012', desc2: '党政机关公文标准格式'
  },
  {
    id: 2, name: '政府公文', category: 'official', selected: false,
    spineColor: 'bg-gold-dark', icon: RiBuildingLine, iconBg: 'bg-cream-darker', iconColor: '#C8A45C',
    author: '中共中央', desc1: '行政专用格式', desc2: '适用于政府机关正式公文'
  },
  {
    id: 3, name: '红头文件', category: 'official', selected: false,
    spineColor: 'bg-cinnabar', icon: RiFilePaper2Line, iconBg: 'bg-diff-red-bg', iconColor: '#C23B22',
    author: '党委系统', desc1: '党委专用格式', desc2: '大红色文件头 + 发文字号'
  },
  {
    id: 4, name: '会议纪要', category: 'official', selected: false,
    spineColor: 'bg-cloud-blue', icon: RiCalendarLine, iconBg: 'bg-blue-50', iconColor: '#5B7DB1',
    author: '政务部门', desc1: '政务会议专用', desc2: '标准会议纪要排版格式'
  },
]

const sectionMeta = {
  official: { label: '公文格式', subtitle: '符合国家公文标准', barColor: 'bg-cinnabar' },
  academic: { label: '学术格式', subtitle: '符合学术出版规范', barColor: 'bg-jade-light' },
  business: { label: '商务格式', subtitle: '商务文档标准', barColor: 'bg-gold-dark' },
  creative: { label: '创意格式', subtitle: '创意类文档排版', barColor: 'bg-cloud-blue' }
}

const displayedCategories = computed(() => {
  const cats = activeCategory.value === 'all'
    ? ['official', 'academic', 'business', 'creative']
    : [activeCategory.value]
  return cats.filter(cat => books.some(b => b.category === cat))
})

const toggleBook = (book) => {
  book.selected = !book.selected
}

const currentTemplate = computed(() => {
  const selected = books.filter(b => b.selected)
  return selected.length ? { name: selected[0].name, count: selected.length } : null
})
</script>

<template>
  <div class="min-h-screen bg-parchment pt-20 px-8 pb-8">
    <div class="max-w-[1376px] mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <button @click="router.back()" class="w-10 h-10 flex items-center justify-center bg-cream-dark border border-tan-border rounded-lg">
            <RiArrowLeftSLine size="20" color="#5C4033" />
          </button>
          <div>
            <h1 class="text-[28px] font-bold text-brown-dark">模板书架</h1>
            <p class="text-[14px] text-brown-muted">选择一套排版模板，一键应用到您的文档</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center bg-cream-darker rounded-lg p-1">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              class="px-4 py-2 rounded-md text-[13px] transition-colors"
              :class="activeCategory === cat ? 'bg-white text-cinnabar font-semibold' : 'text-brown font-medium hover:bg-cream-dark'"
            >
              {{ categoryLabels[cat] }}
            </button>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-cream border border-tan-border rounded-lg">
            <RiSearchLine size="16" color="#8B7355" />
            <span class="text-[13px] text-brown-muted">搜索模板...</span>
          </div>
        </div>
      </div>

      <div v-if="currentTemplate" class="flex items-center gap-3 px-5 py-3 bg-cream border border-tan-light rounded-xl mb-8">
        <RiBookOpenLine size="22" color="#C8A45C" />
        <span class="text-[14px] font-medium text-brown">当前应用模板：</span>
        <span class="px-3 py-1 bg-cinnabar text-white rounded-full text-[13px] font-semibold">{{ currentTemplate.name }}</span>
        <span class="text-[13px] text-brown-muted">· 已勾选 {{ currentTemplate.count }} 个模板</span>
      </div>

      <div class="space-y-8">
        <div v-for="cat in displayedCategories" :key="cat">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-[5px] h-[22px] rounded" :class="sectionMeta[cat].barColor"></div>
            <h2 class="text-[18px] font-bold text-brown-dark">{{ sectionMeta[cat].label }}</h2>
            <span class="text-[13px] text-brown-muted">{{ sectionMeta[cat].subtitle }}</span>
          </div>
          <div class="bg-cream-dark border border-tan-light rounded-2xl p-6">
            <div class="w-full h-[6px] bg-tan-dark rounded-[3px] mb-4"></div>
            <div class="flex gap-6 overflow-x-auto pb-4">
              <div
                v-for="book in books.filter(b => b.category === cat)"
                :key="book.id"
                class="w-[180px] flex-shrink-0 cursor-pointer"
                @click="toggleBook(book)"
              >
                <div
                  class="w-full h-[240px] rounded-lg overflow-hidden transition-all"
                  :class="book.selected
                    ? 'ring-[2.7px] ring-cinnabar shadow-[0_6px_20px_rgba(196,58,49,0.25)]'
                    : 'border-[0.7px] border-tan-border shadow-[0_4px_16px_rgba(0,0,0,0.08)]'"
                >
                  <div class="h-2" :class="book.spineColor"></div>
                  <div class="bg-white h-[224px] flex flex-col items-center justify-center px-6">
                    <div class="w-14 h-14 rounded-full flex items-center justify-center" :class="book.iconBg">
                      <component :is="book.icon" size="28" :color="book.iconColor" />
                    </div>
                    <div class="mt-4 text-center">
                      <div class="text-[16px] font-bold text-brown-dark">{{ book.name }}</div>
                      <div class="h-1"></div>
                      <div class="text-[11px] text-brown-muted">{{ book.desc1 }}</div>
                      <div class="h-2"></div>
                      <div class="text-[12px] text-brown leading-relaxed">{{ book.desc2 }}</div>
                    </div>
                  </div>
                  <div class="h-2" :class="book.spineColor"></div>
                </div>
                <div class="h-3"></div>
                <div v-if="book.selected" class="flex items-center justify-center gap-2">
                  <div class="w-5 h-5 rounded bg-cinnabar flex items-center justify-center">
                    <RiCheckLine size="14" color="white" />
                  </div>
                  <span class="text-[13px] font-semibold text-cinnabar">已选择</span>
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                  <div class="w-[21px] h-5 rounded border-[0.7px] border-tan-dark bg-cream-darker"></div>
                  <span class="text-[13px] font-medium text-brown-muted">选择</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
