<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSettings } from '../composables/useSettings'
import { RiPaletteLine, RiBookmark3Line, RiEyeLine, RiCheckLine, RiSaveLine, RiMagicLine, RiFileTextLine, RiBuildingLine, RiBook2Line, RiBarChart2Line, RiFileEditLine, RiSettings3Line } from '@remixicon/vue'

const router = useRouter()
const { theme: currentTheme, template: currentTemplate, annotationEnabled, highlightEnabled, setTheme, setTemplate, toggleAnnotation, toggleHighlight } = useSettings()

const activeSection = ref('theme')

const themes = [
  { id: 'light', name: '浅色主题', desc: '经典羊皮纸底色', previewBg: '#FDF6E3' },
  { id: 'dark', name: '深色主题', desc: '深色护眼模式', previewBg: '#2C2416' },
  { id: 'paper', name: '纯白纸', desc: '清爽干净', previewBg: '#FFFFFF' },
]

const templates = [
  { id: 'gb', name: 'GB/T 国家标准', sub: 'GB/T 7714', desc: '符合国家公文标准格式', icon: RiFileTextLine, iconColor: '#C8A45C' },
  { id: 'government', name: '政府公文', sub: 'GB/T 9704', desc: '党政机关公文格式标准', icon: RiBuildingLine, iconColor: '#C43A31' },
  { id: 'academic', name: '学术论文', sub: 'GB/T 7714', desc: '学术论文排版规范', icon: RiBook2Line, iconColor: '#6B8CAE' },
  { id: 'business', name: '商务报告', sub: 'ISO 50001', desc: '国际商务文档模板', icon: RiBarChart2Line, iconColor: '#5B8C5A' },
]

const displayOptions = [
  { id: 'annotation', name: '以批注形式展示修改', desc: '开启后，排版修改将以批注气泡形式显示在文档右侧' },
  { id: 'highlight', name: '高亮修改处', desc: '开启后，页面中将高亮标记所有被修改的内容' },
]
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex">
    <div class="w-[280px] bg-cream border-r border-tan-border flex flex-col">
      <div class="px-6 pt-5 pb-5">
        <h3 class="text-base font-semibold text-brown-dark">排版设置</h3>
        <div class="w-full h-[1px] bg-tan-border mt-[2px]"></div>
        <p class="text-xs text-brown-muted mt-2">配置主题、模板与显示方式</p>
      </div>

      <div class="flex-1 px-4 pb-4 space-y-2">
        <button
          @click="activeSection = 'theme'"
          class="w-full rounded-xl p-3 transition-all text-left"
          :class="activeSection === 'theme' ? 'bg-cinnabar text-white' : 'bg-cream-dark hover:bg-cream-darker'"
        >
          <div class="flex items-center gap-3">
            <RiPaletteLine size="20" :color="activeSection === 'theme' ? 'white' : '#5C4033'" />
            <div class="flex-1">
              <div class="text-[15px] font-semibold" :class="activeSection === 'theme' ? 'text-white' : 'text-brown-dark'">主题设置</div>
              <div class="text-[11px]" :class="activeSection === 'theme' ? 'text-white/75' : 'text-brown-muted'">Theme</div>
            </div>
            <div v-if="activeSection === 'theme'" class="w-[9px] h-[8px] bg-white rounded-[4px]"></div>
          </div>
        </button>

        <button
          @click="activeSection = 'template'"
          class="w-full rounded-xl p-3 transition-all text-left"
          :class="activeSection === 'template' ? 'bg-gold-dark text-white' : 'bg-cream-dark hover:bg-cream-darker'"
        >
          <div class="flex items-center gap-3">
            <RiBookmark3Line size="20" :color="activeSection === 'template' ? 'white' : '#5C4033'" />
            <div class="flex-1">
              <div class="text-[15px] font-semibold" :class="activeSection === 'template' ? 'text-white' : 'text-brown-dark'">内置模板</div>
              <div class="text-[11px]" :class="activeSection === 'template' ? 'text-white/75' : 'text-brown-muted'">Templates</div>
            </div>
            <div v-if="activeSection === 'template'" class="w-[9px] h-[8px] bg-white rounded-[4px]"></div>
          </div>
        </button>

        <button
          @click="activeSection = 'display'"
          class="w-full rounded-xl p-3 transition-all text-left"
          :class="activeSection === 'display' ? 'bg-jade-light text-white' : 'bg-cream-dark hover:bg-cream-darker'"
        >
          <div class="flex items-center gap-3">
            <RiEyeLine size="20" :color="activeSection === 'display' ? 'white' : '#5C4033'" />
            <div class="flex-1">
              <div class="text-[15px] font-semibold" :class="activeSection === 'display' ? 'text-white' : 'text-brown-dark'">显示模式</div>
              <div class="text-[11px]" :class="activeSection === 'display' ? 'text-white/75' : 'text-brown-muted'">Display</div>
            </div>
            <div v-if="activeSection === 'display'" class="w-[9px] h-[8px] bg-white rounded-[4px]"></div>
          </div>
        </button>
      </div>

      <div class="px-4 py-5 space-y-3">
        <button class="w-full flex items-center justify-center gap-2 py-3 bg-cream-dark border border-gold-dark/50 rounded-xl text-brown font-semibold text-[14px]">
          <RiSaveLine size="18" color="#C8A45C" />
          保存到模板
        </button>
        <button class="w-full flex items-center justify-center gap-2 py-3 bg-cinnabar text-white rounded-xl font-semibold text-[14px]" @click="router.push('/compare')">
          <RiMagicLine size="18" color="white" />
          一键修改
        </button>
      </div>
    </div>

    <div class="flex-1 bg-warm-gray flex flex-col">
      <div class="px-8 py-5 bg-parchment flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center"
          :class="activeSection === 'theme' ? 'bg-cinnabar' : activeSection === 'template' ? 'bg-gold-dark' : 'bg-jade-light'"
        >
          <RiPaletteLine v-if="activeSection === 'theme'" size="20" color="white" />
          <RiBookmark3Line v-else-if="activeSection === 'template'" size="20" color="white" />
          <RiEyeLine v-else size="20" color="white" />
        </div>
        <div>
          <h2 class="text-[18px] font-bold text-brown-dark">
            {{ activeSection === 'theme' ? '主题设置' : activeSection === 'template' ? '内置模板' : '显示模式' }}
          </h2>
          <p class="text-[12px] text-brown-muted">
            {{ activeSection === 'theme' ? '选择界面配色方案' : activeSection === 'template' ? '选择文档排版标准模板' : '控制修改建议的展示方式' }}
          </p>
        </div>
      </div>

      <div class="flex-1 p-8 overflow-y-auto">
        <div class="bg-cream-dark border border-tan-light rounded-2xl p-8">
          <div class="w-full h-[6px] bg-tan-dark rounded-[3px] mb-6"></div>

          <div v-if="activeSection === 'theme'" class="grid grid-cols-3 gap-4">
            <div
              v-for="theme in themes"
              :key="theme.id"
              @click="setTheme(theme.id)"
              class="bg-white rounded-xl p-8 text-center transition-all cursor-pointer"
              :class="currentTheme === theme.id ? 'ring-2 ring-cinnabar shadow-lg shadow-cinnabar/18' : 'hover:shadow-md'"
            >
              <div
                class="w-[150px] h-[100px] rounded-lg border border-[#E0D5C0] mx-auto mb-4"
                :style="{ backgroundColor: theme.previewBg }"
              ></div>
              <h4
                class="text-[16px] font-bold mb-1"
              :class="currentTheme === theme.id ? 'text-cinnabar' : 'text-brown-dark'"
            >{{ theme.name }}</h4>
            <p class="text-[12px] text-brown-muted mb-3">{{ theme.desc }}</p>
            <div
              class="w-[26px] h-[26px] rounded-full mx-auto flex items-center justify-center"
              :class="currentTheme === theme.id ? 'bg-cinnabar' : 'bg-tan-dark'"
            >
              <RiCheckLine v-if="currentTheme === theme.id" size="14" color="white" />
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'template'" class="grid grid-cols-4 gap-4">
            <div
              v-for="tpl in templates"
              :key="tpl.id"
              @click="setTemplate(tpl.id)"
              class="bg-white rounded-xl p-6 text-center transition-all cursor-pointer"
              :class="currentTemplate === tpl.id ? 'ring-2 ring-gold-dark shadow-lg shadow-gold-dark/18' : 'hover:shadow-md'"
            >
              <div
                class="w-[56px] h-[56px] rounded-full mx-auto mb-3 flex items-center justify-center"
                :class="currentTemplate === tpl.id ? 'bg-gold-dark/10' : 'bg-cream-darker'"
              >
                <component :is="tpl.icon" size="28" :color="tpl.iconColor" />
              </div>
              <h4 class="text-[15px] font-semibold text-brown-dark mb-1">{{ tpl.name }}</h4>
              <p class="text-[11px] text-brown-muted">{{ tpl.sub }}</p>
              <p class="text-[12px] text-brown-muted mt-1">{{ tpl.desc }}</p>
              <div
                class="w-[26px] h-[26px] rounded-full mx-auto mt-3 flex items-center justify-center"
                :class="currentTemplate === tpl.id ? 'bg-gold-dark' : 'bg-tan-dark'"
              >
                <RiCheckLine v-if="currentTemplate === tpl.id" size="14" color="white" />
              </div>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="option in displayOptions"
              :key="option.id"
              class="flex items-center justify-between bg-white rounded-xl p-6"
            >
              <div class="flex items-center gap-4">
                <div class="w-[48px] h-[48px] rounded-lg bg-diff-green-bg flex items-center justify-center">
                  <RiFileEditLine v-if="option.id === 'annotation'" size="24" color="#5B8C5A" />
                  <RiSettings3Line v-else size="24" color="#5B8C5A" />
                </div>
                <div>
                  <h4 class="text-[16px] font-semibold text-brown-dark">{{ option.name }}</h4>
                  <p class="text-[13px] text-brown-muted">{{ option.desc }}</p>
                </div>
              </div>
              <button
              @click="option.id === 'annotation' ? toggleAnnotation() : toggleHighlight()"
              class="w-[56px] h-[30px] rounded-full relative transition-colors"
              :class="(option.id === 'annotation' ? annotationEnabled : highlightEnabled) ? 'bg-jade-light' : 'bg-tan-dark'"
              >
                <div
                  class="absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] bg-white rounded-full shadow flex items-center justify-center transition-all duration-200"
                  :class="(option.id === 'annotation' ? annotationEnabled : highlightEnabled) ? 'right-0.5' : 'left-0.5'"
                >
                  <RiCheckLine v-if="option.id === 'annotation' ? annotationEnabled : highlightEnabled" size="14" color="#5B8C5A" />
                </div>
              </button>
            </div>

            <div class="bg-white rounded-xl border border-tan-light overflow-hidden">
              <div class="flex h-[140px]">
                <div class="flex-1 p-5 space-y-3">
                  <div class="h-3 w-3/4 bg-cream-dark rounded"></div>
                  <div class="h-3 w-full bg-cream-dark rounded"></div>
                  <div class="h-3 w-5/6 bg-cream-dark rounded"></div>
                  <div class="h-3 w-2/3 bg-cream-dark rounded"></div>
                </div>
                <div class="w-12 bg-parchment border-l border-tan-light flex flex-col items-center justify-center gap-3">
                  <div class="w-2 h-6 rounded-full bg-gold-dark"></div>
                  <div class="w-2 h-6 rounded-full bg-jade-light"></div>
                  <div class="w-2 h-6 rounded-full bg-cinnabar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-8 py-5 bg-parchment border-t border-tan-border flex items-center justify-end gap-3">
        <button class="px-6 py-3 bg-cream-dark border border-tan-border rounded-xl text-[14px] font-medium text-brown">取消</button>
        <button
          class="flex items-center gap-2 px-6 py-3 bg-cinnabar text-white rounded-xl text-[14px] font-semibold"
          @click="router.push('/editor')"
        >
          <RiCheckLine size="16" color="white" />
          <span>应用设置</span>
        </button>
      </div>
    </div>
  </div>
</template>
