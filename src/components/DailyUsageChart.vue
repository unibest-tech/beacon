<template>
  <div class="my-chart-container">
    <h3 class="text-lg font-medium mb-4">每天分布</h3>
    <div class="chart-type-toggle">
      <button @click="isLineChart = !isLineChart">
        {{ isLineChart ? '切换为柱状图' : '切换为线条图' }}
      </button>
      <span class="ml-2">总创建数：{{ total }}</span>
    </div>
    <div ref="chartRef" class="chart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface DailyDataItem {
  dayOfWeek: string
  date: string
  count: number
}

const props = defineProps({
  dailyData: {
    type: Array as () => DailyDataItem[],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
const isLineChart = ref(true)

// 生成日期+星期的组合标签数组
const getXAxisData = () => props.dailyData.map(item => `${item.dayOfWeek}`)
// props.dailyData.map(item => `${item.date}`)

// 处理数据（直接使用接口返回的count数组）
const processData = () => props.dailyData.map(item => item.count)

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
}

// 更新图表配置
const updateChart = () => {
  if (!chartInstance) return
  const option: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: getXAxisData(),
      name: '日期',
      boundaryGap: !isLineChart.value,
      axisLabel: {
        // rotate: 30, // 防止标签重叠
        align: 'right',
        // padding: [10, 0, 0, 0], // 增加顶部内边距
      },
    },
    yAxis: {
      type: 'value',
      name: '数量',
    },
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '30%', // 增加底部空间确保标签显示
    //   containLabel: true,
    // },
    series: [
      {
        data: processData(),
        type: isLineChart.value ? 'bar' : 'line',
        smooth: true,
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const index = params[0].dataIndex
        const item = props.dailyData[index]
        return `${item.date} ${item.dayOfWeek}<br/>数量: ${params[0].value}`
      },
    },
  }
  chartInstance.setOption(option)
}

onMounted(async () => {
  initChart()
  // 初始数据加载后手动触发一次更新
  updateChart()
})

watch(
  () => [props.dailyData, isLineChart],
  () => {
    updateChart()
  },
  { deep: true, immediate: true },
)

onUnmounted(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.my-chart-container {
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
