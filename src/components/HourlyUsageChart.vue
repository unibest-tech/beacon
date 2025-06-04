<template>
  <div class="chart-container">
    <div class="chart-type-toggle">
      <button @click="isLineChart = !isLineChart">
        {{ isLineChart ? '切换为柱状图' : '切换为线条图' }}
      </button>
    </div>
    <div ref="chartRef" class="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface HourlyDataItem {
  hour: number
  count: number
}

const props = defineProps({
  hourlyData: {
    type: Array as () => HourlyDataItem[],
    required: true,
  },
})

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
const isLineChart = ref(true)

// 生成0-23小时的完整数组
const fullHours = Array.from({ length: 24 }, (_, i) => i)

// 处理数据（补全缺失小时）
const processData = () => {
  const dataMap = new Map(props.hourlyData.map(item => [item.hour, item.count]))
  return fullHours.map(hour => dataMap.get(hour) || 0)
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

// 更新图表配置
const updateChart = () => {
  if (!chartInstance) return
  const option: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: fullHours,
      name: '小时',
      boundaryGap: !isLineChart.value,
    },
    yAxis: {
      type: 'value',
      name: '数量',
    },
    series: [
      {
        data: processData(),
        type: isLineChart.value ? 'line' : 'bar',
        smooth: true,
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  }
  chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
})

watch([props.hourlyData, isLineChart], () => {
  updateChart()
})

onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.chart-type-toggle {
  margin-bottom: 16px;
}
.chart-type-toggle button {
  padding: 8px 16px;
  background: #5470c6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.chart-type-toggle button:hover {
  background: #4360b5;
}
</style>
