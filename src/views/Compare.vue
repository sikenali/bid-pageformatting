<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDocument } from '../composables/useDocument'
import { useFormatState } from '../composables/useFormatState'
import { useDocumentExport } from '../composables/useDocumentExport'
import { RiFileTextLine, RiEditLine, RiCheckLine, RiDownloadLine, RiArrowLeftSLine, RiArrowRightSLine, RiLayout2Line, RiCollageLine } from '@remixicon/vue'

const router = useRouter()
const { getFile } = useDocument()
const { beforeSnapshot, afterSnapshot, diffs, formatParams } = useFormatState()
const { exportFormattedDoc } = useDocumentExport()
const currentFile = getFile()

const compareMode = ref('side-by-side')
const diffIndex = ref(0)

const totalDiffs = computed(() => diffs.value.length)

const currentDiff = computed(() => diffs.value[diffIndex.value] || null)

const prevDiff = () => { if (diffIndex.value > 0) diffIndex.value-- }
const nextDiff = () => { if (diffIndex.value < totalDiffs.value - 1) diffIndex.value++ }
const acceptAll = () => {
  if (confirm('确认接受全部修改？')) {
    alert('已接受全部修改')
  }
}
const exportDoc = async () => {
  const file = getFile()
  if (!file) {
    alert('未找到原始文档，请先上传')
    return
  }
  try {
    await exportFormattedDoc(file, formatParams)
  } catch (e) {
    console.error('导出失败:', e)
    alert('文档导出失败，请重试')
  }
}
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <div class="bg-parchment border-b border-tan-border">
      <div class="flex items-center justify-between px-8 py-4">
        <div class="flex items-center gap-3">
          <RiFileTextLine size="22" color="#5B8C5A" />
          <span class="text-[15px] font-semibold text-brown-dark">{{ currentFile?.name || '未命名文档' }}</span>
          <div class="flex items-center gap-2 px-3 py-1 bg-cream-darker rounded-full">
            <RiEditLine size="14" color="#C43A31" />
            <span class="text-[12px] font-medium text-cinnabar">共 {{ totalDiffs }} 处修改</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 px-5 py-2 bg-jade-light text-white rounded-lg text-[14px] font-semibold"
            @click="acceptAll"
          >
            <RiCheckLine size="18" color="white" />
            接受全部修改
          </button>
          <button
            class="flex items-center gap-2 px-5 py-2 bg-cinnabar text-white rounded-lg text-[14px] font-semibold"
            @click="exportDoc"
          >
            <RiDownloadLine size="18" color="white" />
            导出文档
          </button>
        </div>
      </div>
    </div>

    <div class="px-8 py-3 bg-parchment border-b border-tan-border flex items-center justify-between">
      <div class="flex items-center gap-3">
        <RiLayout2Line size="18" class="text-brown" />
        <span class="text-[13px] font-semibold text-brown-dark">对比模式</span>
        <div class="flex bg-cream-darker rounded-lg p-1">
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px]"
            :class="compareMode === 'side-by-side' ? 'bg-white font-semibold text-cinnabar' : 'font-medium text-brown'"
            @click="compareMode = 'side-by-side'"
          >
            <RiLayout2Line size="16" :color="compareMode === 'side-by-side' ? '#C43A31' : '#8B7355'" />
            并排对比
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px]"
            :class="compareMode === 'overlay' ? 'bg-white font-semibold text-cinnabar' : 'font-medium text-brown'"
            @click="compareMode = 'overlay'"
          >
            <RiCollageLine size="16" :color="compareMode === 'overlay' ? '#C43A31' : '#8B7355'" />
            叠加对比
          </button>
        </div>
      </div>
    </div>

    <div v-if="compareMode === 'side-by-side'" class="flex-1 flex bg-warm-gray overflow-hidden">
      <div class="flex-1 flex flex-col min-w-0">
        <div class="px-6 py-3 bg-cream-dark flex items-center gap-3 shrink-0">
          <div class="w-[11px] h-[10px] rounded-full bg-brown-muted shrink-0"></div>
          <span class="text-[14px] font-semibold text-brown">修改前 · 原始文档</span>
        </div>
        <div class="flex-1 bg-warm-gray overflow-y-auto py-6">
          <div class="w-[560px] mx-auto bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] rounded-xl px-14 py-12 space-y-0">
            <div class="text-center">
              <div class="text-[24px] font-bold text-brown-dark leading-tight">2024年度工作报告</div>
              <div class="h-[6px]"></div>
              <div class="text-[13px] text-brown-muted">XX公司 · 2024年12月</div>
            </div>
            <div class="h-8"></div>
            <div class="text-[14px] text-brown leading-relaxed">2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。</div>
            <div class="h-11"></div>
            <div class="text-[16px] font-bold text-brown-dark">一、主要工作回顾</div>
            <div class="h-3"></div>
            <div class="text-[14px] text-brown leading-relaxed">本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场拓展、技术研发、团队建设等方面取得了显著成效。</div>
            <div class="h-5"></div>

            <div v-if="currentDiff" class="border-2.7 border-cinnabar bg-diff-red-bg rounded-lg p-3">
              <div class="text-[12px] text-brown-muted font-medium">{{ currentDiff.category }}</div>
              <div class="text-[14px] text-brown-dark font-medium mt-0.5">{{ currentDiff.label }}：<span class="line-through text-brown-muted">{{ currentDiff.before }}</span></div>
              <div v-if="currentDiff.annotation" class="text-[12px] text-brown mt-1">{{ currentDiff.annotation }}</div>
            </div>
            <div v-else class="text-[14px] text-brown leading-relaxed">暂无差异数据</div>

            <div class="h-5"></div>
            <div class="text-[14px] text-brown leading-relaxed">技术研发方面，公司全年申请专利56项，获得授权32项，其中发明专利18项。研发团队规模扩大至280人，引进了多位行业顶尖人才，为公司的持续创新奠定了坚实基础。</div>
            <div class="h-[60px]"></div>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col min-w-0">
        <div class="px-6 py-3 bg-diff-green-bg flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-[11px] h-[10px] rounded-full bg-jade-light shrink-0"></div>
            <span class="text-[14px] font-semibold text-brown-dark">修改后 · 排版优化</span>
          </div>
          <div class="px-3 py-1 bg-jade-light text-white rounded-full text-[11px] font-semibold">推荐</div>
        </div>
        <div class="flex-1 bg-warm-gray overflow-y-auto py-6">
          <div class="w-[560px] mx-auto bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] rounded-xl px-14 py-12 space-y-0">
            <div class="text-center">
              <div class="text-[24px] font-bold text-brown-dark leading-tight">2024年度工作报告</div>
              <div class="h-[6px]"></div>
              <div class="text-[13px] text-brown-muted">XX公司 · 2024年12月</div>
            </div>
            <div class="h-8"></div>
            <div class="text-[14px] text-brown leading-relaxed">2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。</div>
            <div class="h-11"></div>
            <div class="text-[16px] font-bold text-brown-dark">一、主要工作回顾</div>
            <div class="h-3"></div>
            <div class="text-[14px] text-brown leading-relaxed">本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场拓展、技术研发、团队建设等方面取得了显著成效。</div>
            <div class="h-5"></div>

            <div v-if="currentDiff" class="border-2.7 border-jade-light bg-diff-green-bg rounded-lg p-3">
              <div class="text-[12px] text-brown-muted font-medium">{{ currentDiff.category }}</div>
              <div class="text-[14px] text-brown-dark font-medium mt-0.5">{{ currentDiff.label }}：<span class="font-semibold text-jade-light">{{ currentDiff.after }}</span></div>
              <div v-if="currentDiff.annotation" class="text-[12px] text-brown mt-1">{{ currentDiff.annotation }}</div>
            </div>
            <div v-else class="text-[14px] text-brown leading-relaxed">暂无差异数据</div>

            <div class="h-5"></div>
            <div class="text-[14px] text-brown leading-relaxed">技术研发方面，公司全年申请专利56项，获得授权32项，其中发明专利18项。研发团队规模扩大至280人，引进了多位行业顶尖人才，为公司的持续创新奠定了坚实基础。</div>
            <div class="h-[60px]"></div>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="compareMode === 'overlay'" class="flex-1 flex bg-warm-gray relative">
      <div class="flex-1 flex flex-col">
        <div class="px-6 py-3 bg-cream-dark flex items-center gap-3">
          <div class="w-[11px] h-[10px] rounded-full bg-brown-muted"></div>
          <span class="text-[14px] font-semibold text-brown">修改前 · 原始文档</span>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <div class="bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] rounded-xl p-6 space-y-4">
            <div v-for="diff in diffs" :key="diff.id" class="flex items-center justify-between py-2 border-b border-tan-border/50 last:border-b-0">
              <div>
                <span class="text-[11px] text-brown-muted font-medium">{{ diff.category }}</span>
                <p class="text-[14px] text-brown-dark font-medium">{{ diff.label }}</p>
              </div>
              <div class="text-right">
                <span class="text-[13px] text-brown-muted line-through">{{ diff.before }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col absolute inset-0 left-1/2 bg-white/80">
        <div class="px-6 py-3 bg-diff-green-bg/90 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-[11px] h-[10px] rounded-full bg-jade-light"></div>
            <span class="text-[14px] font-semibold text-brown-dark">修改后 · 排版优化</span>
          </div>
          <div class="px-3 py-1 bg-jade-light text-white rounded-full text-[11px] font-semibold">推荐</div>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <div class="bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] rounded-xl p-6 space-y-4">
            <div v-for="diff in diffs" :key="diff.id" class="flex items-center justify-between py-2 border-b border-tan-border/50 last:border-b-0">
              <div>
                <span class="text-[11px] text-brown-muted font-medium">{{ diff.category }}</span>
                <p class="text-[14px] text-brown-dark font-medium">{{ diff.label }}</p>
              </div>
              <div class="text-right">
                <span class="text-[13px] text-jade-light font-semibold">{{ diff.after }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-8 py-3 bg-parchment border-t border-tan-border flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-[13px] h-[12px] rounded bg-cinnabar shrink-0"></div>
          <span class="text-[13px] font-medium text-brown">参数变更 {{ totalDiffs }} 处</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="flex items-center gap-1 px-3 py-2 bg-cream-darker rounded-lg" @click="prevDiff">
          <RiArrowLeftSLine size="16" class="text-brown" />
          <span class="text-[13px] font-medium text-brown">上一处</span>
        </button>
        <span class="text-[13px] text-brown-muted w-16 text-center">{{ totalDiffs > 0 ? diffIndex + 1 : 0 }} / {{ totalDiffs }}</span>
        <button class="flex items-center gap-1 px-3 py-2 bg-cream-darker rounded-lg" @click="nextDiff">
          <span class="text-[13px] font-medium text-brown">下一处</span>
          <RiArrowRightSLine size="16" class="text-brown" />
        </button>
      </div>
    </div>
  </div>
</template>
