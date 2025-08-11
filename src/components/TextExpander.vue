<template>
  <div class="text-expander">
    <!-- 隐藏的checkbox用于控制展开/收起状态 -->
    <input
      type="checkbox"
      :id="checkboxId"
      class="hidden"
      v-model="isExpanded"
    />

    <div
      class="text-wrapper relative overflow-hidden transition-all duration-300"
      :style="wrapperStyle"
      :class="wrapperClass"
    >
      <span class="text-content inline">
        <slot />
      </span>

      <!-- 展开按钮 -->
      <label
        :for="checkboxId"
        class="expand-btn absolute right-0 bottom-0 bg-gradient-to-r from-transparent via-white to-blue-500 pl-10 pr-2 py-1 rounded-r text-white text-xs cursor-pointer hover:bg-blue-600 transition-colors duration-300"
        :class="isExpanded ? 'hidden' : 'inline-block'"
      >
        展开
      </label>

      <!-- 收起按钮 -->
      <label
        :for="checkboxId"
        class="expand-btn static bg-blue-500 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-600 transition-colors duration-300 ml-2"
        :class="isExpanded ? 'inline-block' : 'hidden'"
      >
        收起
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  /** 缩略显示的行数 */
  lines?: number
  /** 行高，用于计算最大高度 */
  lineHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  lines: 3,
  lineHeight: 1.6,
})

// 生成唯一的checkbox ID
const checkboxId = computed(
  () => `expand-${Math.random().toString(36).substr(2, 9)}`,
)

// 展开状态
const isExpanded = ref(false)

// 计算样式
const wrapperStyle = computed(() => {
  if (isExpanded.value) {
    return {}
  }
  return {
    maxHeight: `${props.lineHeight * props.lines}em`,
    display: '-webkit-box',
    WebkitLineClamp: props.lines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  }
})

const wrapperClass = computed(() => {
  if (isExpanded.value) {
    return 'max-h-none block'
  }
  return ''
})
</script>

<style scoped>
/* 确保line-clamp样式正确应用 */
.text-wrapper {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 当展开时，移除line-clamp限制 */
.text-wrapper.max-h-none {
  display: block;
  -webkit-line-clamp: unset;
}

/* 按钮样式优化 */
.expand-btn {
  font-size: 12px;
  line-height: 1.2;
  vertical-align: baseline;
  text-decoration: none;
  border: none;
}

/* 收起状态下的按钮渐变效果 */
.text-wrapper:not(.max-h-none) .expand-btn {
  background: linear-gradient(
    90deg,
    transparent,
    #fff 20%,
    #3b82f6 80%,
    #3b82f6
  );
  padding-left: 40px;
  border-radius: 0 3px 3px 0;
}
</style>
