<script setup>
import { ref } from 'vue'
import { Download, CheckCircle, XCircle } from 'lucide-vue-next'

const compareMode = ref('side-by-side') // 'side-by-side' | 'overlay'
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col">
    <!-- 对比信息栏 -->
    <div class="px-8 py-4 bg-parchment border-b border-[#E0D5C0] flex items-center justify-between">
      <!-- 文件信息 -->
      <div class="flex items-center gap-3">
        <span class="text-[#5B8C5A] text-[20px]">📄</span>
        <span class="text-[15px] font-semibold text-[#3D2B1F]">2024年度工作报告.docx</span>
        <div class="flex items-center gap-2 px-3 py-1 bg-[#F0E8D5] rounded-full">
          <span class="text-[#C43A31] text-[14px]">✏️</span>
          <span class="text-[12px] font-medium text-[#C43A31]">共 23 处修改</span>
        </div>
      </div>

      <!-- 操作按钮组 -->
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-5 py-2 bg-[#5B8C5A] text-white rounded-lg hover:bg-[#4A7A49] transition-colors text-[14px] font-semibold">
          <CheckCircle :size="18" />
          接受全部修改
        </button>
        <button class="flex items-center gap-2 px-5 py-2 bg-[#C43A31] text-white rounded-lg hover:bg-[#A83028] transition-colors text-[14px] font-semibold">
          <Download :size="18" />
          导出文档
        </button>
      </div>
    </div>

    <!-- 对比主体区 -->
    <div class="flex-1 flex bg-[#EBE5D9]">
      <!-- 修改前区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 标题栏 -->
        <div class="px-6 py-3 bg-[#F5EFE0] flex items-center gap-3">
          <div class="w-[11px] h-[10px] bg-[#8B7355] rounded-[5px]"></div>
          <span class="text-[14px] font-semibold text-[#5C4033]">修改前 · 原始文档</span>
        </div>
        <!-- 预览区 -->
        <div class="flex-1 bg-[#EAE5D9] flex items-start justify-center p-6">
          <div class="w-[560px] h-full bg-white shadow-lg p-[48px_56px] overflow-auto">
            <!-- 文档标题 -->
            <div class="text-center mb-8">
              <h1 class="text-[24px] font-bold text-[#1A1A1A] mb-1">2024年度工作报告</h1>
              <p class="text-[13px] text-[#666666]">XX公司 · 2024年12月</p>
            </div>

            <!-- 段落1 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-11">
              2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>

            <!-- 小标题 -->
            <h2 class="text-[16px] font-bold text-[#1A1A1A] mb-3">一、主要工作回顾</h2>

            <!-- 段落2 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-5">
              本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场拓展、技术研发、团队建设等方面取得了显著成效。
            </p>

            <!-- 差异段落（被标记修改） -->
            <div class="mb-5 border-[2.7px] border-[#C43A31] bg-[#FFF0ED] rounded p-2">
              <p class="text-[14px] text-[#333333] leading-relaxed">
                市场拓展方面，我们新开拓了华东区域市场，新增客户超过150家。
              </p>
            </div>

            <!-- 段落3 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-5">
              技术研发方面，公司全年申请专利45项，获得授权28项。研发团队规模
            </p>
          </div>
        </div>
      </div>

      <!-- 修改后区域 -->
      <div class="flex-1 flex flex-col">
        <!-- 标题栏 -->
        <div class="px-6 py-3 bg-[#F5EFE0] flex items-center gap-3">
          <div class="w-[11px] h-[10px] bg-[#5B8C5A] rounded-[5px]"></div>
          <span class="text-[14px] font-semibold text-[#5C4033]">修改后 · 排版结果</span>
        </div>
        <!-- 预览区 -->
        <div class="flex-1 bg-[#EAE5D9] flex items-start justify-center p-6">
          <div class="w-[560px] h-full bg-white shadow-lg p-[48px_56px] overflow-auto">
            <!-- 文档标题 -->
            <div class="text-center mb-8">
              <h1 class="text-[24px] font-bold text-[#1A1A1A] mb-1">2024年度工作报告</h1>
              <p class="text-[13px] text-[#666666]">XX公司 · 2024年12月</p>
            </div>

            <!-- 段落1 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-11 text-indent-8">
              <span class="inline-block w-6"></span>2024年是公司发展历程中具有里程碑意义的一年。在董事会的正确领导下，全体员工团结一心，攻坚克难，圆满完成了年度各项目标任务。
            </p>

            <!-- 小标题 -->
            <h2 class="text-[16px] font-bold text-[#1A1A1A] mb-3">一、主要工作回顾</h2>

            <!-- 段落2 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-5 text-indent-8">
              <span class="inline-block w-6"></span>本年度，我们紧紧围绕"提质增效、创新发展"的工作主线，在市场拓展、技术研发、团队建设等方面取得了显著成效。
            </p>

            <!-- 差异段落（已修改） -->
            <div class="mb-5 border-l-[4px] border-[#5B8C5A] bg-[#F0FFF4] p-2 pl-4">
              <p class="text-[14px] text-[#333333] leading-relaxed">
                市场拓展方面，我们成功新开拓了华东区域市场，累计新增优质客户超过150家，销售额同比增长35%。
              </p>
            </div>

            <!-- 段落3 -->
            <p class="text-[14px] text-[#333333] leading-relaxed mb-5 text-indent-8">
              <span class="inline-block w-6"></span>技术研发方面，公司全年申请专利45项，获得授权28项。研发团队规模
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
