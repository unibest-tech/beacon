<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Unibest Beacon 数据看板</h1>
    <!-- 小时使用量图表 -->
    <HourlyUsageChart :hourly-data="hourlyData" :total="hourlyDataTotal" />
    <!-- 每天使用量图表 -->
    <DailyUsageChart :hourly-data="hourlyData" :total="hourlyDataTotal" />
    <ChartPanel :data="tableData" />
    <div class="mt-6">
      <DataTable @update:data="handleDataUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HourlyUsageChart from '@/components/HourlyUsageChart.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DataTable from '@/components/DataTable.vue'
import type { BeaconData } from '@/api/beacon'
import { fetchBeaconHourlyData } from '@/api/beacon'

const tableData = ref<BeaconData[]>([])
const hourlyData = ref<Array<{ hour: number; count: number }>>([])
const hourlyDataTotal = ref<number>(0)

onMounted(async () => {
  try {
    const res = await fetchBeaconHourlyData()
    hourlyData.value = res.hourlyData
    hourlyDataTotal.value = res.total
    console.log('Dashboard received hourly data:', hourlyData.value)
  } catch (error) {
    console.error('Fetch hourly data failed:', error)
  }
})

const handleDataUpdate = (data: BeaconData[]) => {
  console.log('Dashboard received data:', data.length)
  tableData.value = data
}
</script>
