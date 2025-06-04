<template>
  <div class="space-y-3">
    <div class="flex items-center space-x-3">
      <!-- 每天使用量图表 -->
      <DailyUsageChart :daily-data="dailyData" :total="hourlyDataTotal" />
      <!-- 小时使用量图表 -->
      <HourlyUsageChart :hourly-data="hourlyData" :total="hourlyDataTotal" />
    </div>
    <DataTable />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DailyUsageChart from '@/components/DailyUsageChart.vue'
import HourlyUsageChart from '@/components/HourlyUsageChart.vue'
import ChartPanel from '@/components/ChartPanel.vue'
import DataTable from '@/components/DataTable.vue'
import type { BeaconData } from '@/api/beacon'
import { fetchBeaconHourlyData, fetchBeaconDailyData } from '@/api/beacon'

const hourlyData = ref<Array<{ hour: number; count: number }>>([])
const hourlyDataTotal = ref<number>(0)
const dailyData = ref<Array<{ hour: number; count: number }>>([])
const dailyDataTotal = ref<number>(0)

const fetchDailyData = async () => {
  try {
    const res = await fetchBeaconDailyData()
    dailyData.value = res.dailyData
    dailyDataTotal.value = res.total
    console.log('Dashboard received hourly data:', hourlyData.value)
  } catch (error) {
    console.error('Fetch hourly data failed:', error)
  }
}
const fetchHourlyData = async () => {
  try {
    const res = await fetchBeaconHourlyData()
    hourlyData.value = res.hourlyData
    hourlyDataTotal.value = res.total
    console.log('Dashboard received hourly data:', hourlyData.value)
  } catch (error) {
    console.error('Fetch hourly data failed:', error)
  }
}
fetchDailyData()
fetchHourlyData()
</script>
