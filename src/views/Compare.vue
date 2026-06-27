<script setup>
import { ref } from 'vue'
import { RiFileTextLine, RiEditLine, RiCheckLine, RiDownloadLine, RiArrowLeftSLine, RiArrowRightSLine, RiLayout2Line, RiCollageLine, RiQuillPenLine, RiCheckboxCircleLine } from '@remixicon/vue'

const compareMode = ref('side-by-side')
const diffIndex = ref(0)
const totalDiffs = 23

const prevDiff = () => { if (diffIndex.value > 0) diffIndex.value-- }
const nextDiff = () => { if (diffIndex.value < totalDiffs - 1) diffIndex.value++ }
const acceptAll = () => { alert('已接受全部修改') }
const exportDoc = () => { alert('文档导出中...') }
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <div class="bg-parchment border-b border-tan-border">
      <div class="flex items-center justify-between px-8 py-4">
        <div class="flex items-center gap-3">
          <RiFileTextLine size="22" color="#5B8C5A" />
          <span class="text-[15px] font-semibold text-brown-dark">2024年度工作报告.docx</span>
          <div class="flex items-center gap-2 px-3 py-1 bg-cream-darker rounded-full">
            <RiEditLine size="14" color="#C43A31" />
            <span class="text-[12px] font-medium text-cinnabar">共 23 处修改</span>
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
        <RiLayout2Line size="18" color="#5C4033" />
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
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px]"
            :class="compareMode === 'annotation' ? 'bg-white font-semibold text-cinnabar' : 'font-medium text-brown'"
            @click="compareMode = 'annotation'"
          >
            <RiQuillPenLine size="16" :color="compareMode === 'annotation' ? '#C43A31' : '#8B7355'" />
            批注对比
          </button>
        </div>
      </div>
    </div>

    <div v-if="compareMode === 'side-by-side'" class="flex-1 flex bg-warm-gray">
      <div class="flex-1 flex flex-col">
        <div class="px-6 py-3 bg-cream-dark flex items-center gap-3">
          <div class="w-[11px] h-[10px] rounded-full bg-brown-muted"></div>
          <span class="text-[14px] font-semibold text-brown">修改前 · 原始文档</span>
        </div>
        <div class="flex-1 bg-warm-gray flex items-start justify-center p-6">
          <div class="w-[560px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-[48px_56px]">
            <div class="text-center mb-1">
              <div class="text-[24px] font-bold text-brown-dark">2024年度工作报告</div>
            </div>
            <div class="text-[13px] text-brown-muted text-center mb-8">XX公司 · 2024年12月</div>
            <p class="text-[14px] text-brown leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>
            <div class="text-[16px] font-bold text-brown-dark mb-3">一、主要工作回顾</div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场开拓、技术研发、团队建设等方面取得了显著成效。
            </p>
            <div class="border-[2.7px] border-cinnabar bg-diff-red-bg rounded p-2 mb-5">
              <p class="text-[14px] text-brown leading-relaxed">
                市场拓展方面，我们新开拓了华东区域市场，新增客户超过150家。
              </p>
            </div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              技术研发方面，公司全年申请专利45项，获得授权28项。研发团队规模扩大至250人。
            </p>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <div class="px-6 py-3 bg-diff-green-bg flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-[11px] h-[10px] rounded-full bg-jade-light"></div>
            <span class="text-[14px] font-semibold text-brown-dark">修改后 · 排版优化</span>
          </div>
          <div class="px-3 py-1 bg-jade-light text-white rounded-full text-[11px] font-semibold">推荐</div>
        </div>
        <div class="flex-1 bg-warm-gray flex items-start justify-center p-6">
          <div class="w-[560px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-[48px_56px]">
            <div class="text-center mb-1">
              <div class="text-[24px] font-bold text-brown-dark">2024年度工作报告</div>
            </div>
            <div class="text-[13px] text-brown-muted text-center mb-8">XX公司 · 2024年12月</div>
            <p class="text-[14px] text-brown leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>
            <div class="text-[16px] font-bold text-brown-dark mb-3">一、主要工作回顾</div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场开拓、技术研发、团队建设等方面取得了显著成效。
            </p>
            <div class="border-[2.7px] border-jade-light bg-diff-green-bg rounded p-2 mb-5">
              <p class="text-[14px] text-brown leading-relaxed">
                市场拓展方面，我们新开拓了华东、华南两大区域市场，新增客户超过200家，客户满意度达到96.8%。
              </p>
            </div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              技术研发方面，公司全年申请专利56项，获得授权32项，其中发明专利18项。研发团队规模扩大至280人。
            </p>
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
        <div class="flex-1 bg-warm-gray flex items-start justify-center p-6">
          <div class="w-[560px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-[48px_56px]">
            <div class="text-center mb-1">
              <div class="text-[24px] font-bold text-brown-dark">2024年度工作报告</div>
            </div>
            <div class="text-[13px] text-brown-muted text-center mb-8">XX公司 · 2024年12月</div>
            <p class="text-[14px] text-brown leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>
            <div class="text-[16px] font-bold text-brown-dark mb-3">一、主要工作回顾</div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场开拓、技术研发、团队建设等方面取得了显著成效。
            </p>
            <div class="border-[2.7px] border-cinnabar bg-diff-red-bg rounded p-2 mb-5">
              <p class="text-[14px] text-brown leading-relaxed">
                市场拓展方面，我们新开拓了华东区域市场，新增客户超过150家。
              </p>
            </div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              技术研发方面，公司全年申请专利45项，获得授权28项。研发团队规模扩大至250人。
            </p>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
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
        <div class="flex-1 bg-warm-gray/90 flex items-start justify-center p-6">
          <div class="w-[560px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-[48px_56px]">
            <div class="text-center mb-1">
              <div class="text-[24px] font-bold text-brown-dark">2024年度工作报告</div>
            </div>
            <div class="text-[13px] text-brown-muted text-center mb-8">XX公司 · 2024年12月</div>
            <p class="text-[14px] text-brown leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>
            <div class="text-[16px] font-bold text-brown-dark mb-3">一、主要工作回顾</div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场开拓、技术研发、团队建设等方面取得了显著成效。
            </p>
            <div class="border-[2.7px] border-jade-light bg-diff-green-bg rounded p-2 mb-5">
              <p class="text-[14px] text-brown leading-relaxed">
                市场拓展方面，我们新开拓了华东、华南两大区域市场，新增客户超过200家，客户满意度达到96.8%。
              </p>
            </div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              技术研发方面，公司全年申请专利56项，获得授权32项，其中发明专利18项。研发团队规模扩大至280人。
            </p>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 flex bg-warm-gray">
      <div class="flex-1 flex flex-col">
        <div class="px-6 py-3 bg-cream-dark flex items-center gap-3">
          <div class="w-[11px] h-[10px] rounded-full bg-gold"></div>
          <span class="text-[14px] font-semibold text-brown">批注预览</span>
          <span class="text-[12px] text-brown-muted">共 3 条批注</span>
        </div>
        <div class="flex-1 bg-warm-gray flex items-start justify-center p-6">
          <div class="w-[560px] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] p-[48px_56px] relative">
            <div class="text-center mb-1">
              <div class="text-[24px] font-bold text-brown-dark">2024年度工作报告</div>
            </div>
            <div class="text-[13px] text-brown-muted text-center mb-8">XX公司 · 2024年12月</div>
            <p class="text-[14px] text-brown leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>
            <div class="text-[16px] font-bold text-brown-dark mb-3">一、主要工作回顾</div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场开拓、技术研发、团队建设等方面取得了显著成效。
            </p>
            <div class="border-[2.7px] border-gold bg-cream rounded p-2 mb-5 relative">
              <div class="absolute top-2 right-2">
                <RiCheckboxCircleLine size="14" color="#D4AF37" />
              </div>
              <p class="text-[14px] text-brown leading-relaxed">
                市场拓展方面，我们新开拓了华东区域市场，新增客户超过150家。
              </p>
            </div>
            <div class="border-[2.7px] border-jade-light bg-cream rounded p-2 mb-5 relative">
              <div class="absolute top-2 right-2">
                <RiCheckboxCircleLine size="14" color="#5B8C5A" />
              </div>
              <p class="text-[14px] text-brown leading-relaxed">
                技术研发方面，公司全年申请专利45项，获得授权28项。研发团队规模进一步扩大，引进了多名高级工程师。
              </p>
            </div>
            <p class="text-[14px] text-brown leading-relaxed mb-5">
              团队建设方面，我们组织了多次专业培训，提升了全员综合素质。
            </p>
            <div class="text-[11px] text-brown-muted text-center">— 1 —</div>
          </div>
        </div>
      </div>

      <div class="w-px bg-tan-border"></div>

      <div class="w-[340px] flex flex-col bg-cream p-5 gap-4 overflow-y-auto">
        <div class="text-[15px] font-semibold text-brown-dark mb-1">修改建议</div>

        <div class="bg-white rounded-lg shadow-sm border-l-[4px] border-gold p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-gold inline-block"></span>
            <span class="text-[13px] font-semibold text-gold-dark">格式建议</span>
          </div>
          <p class="text-[13px] text-brown leading-relaxed">
            建议首行缩进2字符，符合公文排版规范
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm border-l-[4px] border-jade-light p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-jade-light inline-block"></span>
            <span class="text-[13px] font-semibold text-jade">排版优化</span>
          </div>
          <p class="text-[13px] text-brown leading-relaxed">
            行距已调整为28磅固定值
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm border-l-[4px] border-cloud-blue p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-cloud-blue inline-block"></span>
            <span class="text-[13px] font-semibold text-cloud-blue">字体建议</span>
          </div>
          <p class="text-[13px] text-brown leading-relaxed">
            正文建议使用仿宋_GB2312
          </p>
        </div>
      </div>
    </div>

    <div class="px-8 py-3 bg-parchment border-t border-tan-border flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-[13px] h-[12px] rounded bg-cinnabar"></div>
          <span class="text-[13px] font-medium text-brown">删除内容 8 处</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-[13px] h-[12px] rounded bg-jade-light"></div>
          <span class="text-[13px] font-medium text-brown">新增内容 15 处</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="flex items-center gap-1 px-3 py-2 bg-cream-darker rounded-lg" @click="prevDiff">
          <RiArrowLeftSLine size="16" color="#5C4033" />
          <span class="text-[13px] font-medium text-brown">上一处</span>
        </button>
        <button class="flex items-center gap-1 px-3 py-2 bg-cream-darker rounded-lg" @click="nextDiff">
          <span class="text-[13px] font-medium text-brown">下一处</span>
          <RiArrowRightSLine size="16" color="#5C4033" />
        </button>
      </div>
    </div>
  </div>
</template>
