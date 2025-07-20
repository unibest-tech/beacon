<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <h3 class="text-lg font-medium mb-4">模板使用统计</h3>
    <div ref="chartRef" class="h-[400px] w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { fetchBeaconData } from '@/api/beacon'
import type { BeaconData } from '@/api/beacon'

// 定义支持的模板类型
const TEMPLATE_TYPES = ['main+base', 'base-sard-ui', 'base-uv-ui', 'base-uview-plus', 'i18n', 'demo'] as const

type TemplateType = typeof TEMPLATE_TYPES[number]

// 图表数据格式
interface ChartDataItem {
  template: string
  count: number
}

// 状态定义
const rawData = ref<BeaconData[]>([])
const chartData = ref<ChartDataItem[]>([])
const loading = ref(false)
const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
// 移除分页相关配置，直接获取所有数据用于统计

/**
 * 处理原始数据，统计各模板使用次数
 */
const processChartData = () => {
  // 初始化统计对象
  const templateCount: Record<string, number> = TEMPLATE_TYPES.reduce((acc, type) => {
    acc[type] = 0
    return acc
  }, {} as Record<string, number>)

  // 统计数据
  rawData.value.forEach(item => {
    const template = item.template as TemplateType
    // 将'main'和'base'合并到'main+base'类别
    if (template === 'main' || template === 'base') {
      templateCount['main+base']++
    } else if (TEMPLATE_TYPES.includes(template)) {
      templateCount[template]++
    }
  })

  // 转换为图表所需格式
  chartData.value = Object.entries(templateCount).map(([template, count]) => ({
    template,
    count
  }))
}

/**
 * 从API获取数据
 */
const fetchData = async () => {
  loading.value = true
  try {
    // 直接获取所有数据，不使用分页
    const res = await fetchBeaconData({ page: 1, pageSize: 1000 })
    rawData.value = res.data
    processChartData()
  } catch (error) {
    console.error('获取模板统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 初始化图表
 */
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

/**
 * 更新图表配置
 */
const updateChart = () => {
  if (!chartInstance || !chartData.value.length) return

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.value.map(item => item.template),
      axisLabel: {
        rotate: 45,
        interval: 0
      },
      name: '模板类型'
    },
    yAxis: {
      type: 'value',
      name: '使用次数'
    },
    series: [
      {
        name: '使用次数',
        type: 'bar',
        data: chartData.value.map(item => item.count),
        label: {
          show: true,
          position: 'top'
        },
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

// 监听数据变化更新图表
watch(chartData, () => {
  updateChart()
})

// 处理窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
}

// 组件挂载时获取数据并初始化图表
onMounted(() => {
  fetchData()
  // 等待数据加载后初始化图表
  setTimeout(initChart, 100)
  
  // 窗口大小变化时重绘图表
  window.addEventListener('resize', handleResize)
})

// 组件卸载时销毁图表实例
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>