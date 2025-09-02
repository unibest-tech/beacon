<template>
  <div class="space-y-3">
    <div class="flex items-center space-x-3">
      <!-- 每天使用量图表 -->
      <DailyUsageChart
        :daily-data="dailyData"
        :total="dailyDataTotal"
        class="flex-1"
      />
    </div>
    <template-stats-chart />
    <DataTable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DailyUsageChart from '@/components/DailyUsageChart.vue'
import DataTable from '@/components/DataTable.vue'
import TemplateStatsChart from '@/components/TemplateStatsChart.vue'
import { fetchBeaconDailyData, DailyDataItem } from '@/api/beacon'

const dailyData = ref<Array<DailyDataItem>>([])
const dailyDataTotal = ref<number>(0)

const fetchDailyData = async () => {
  try {
    const res = await fetchBeaconDailyData()
    dailyData.value = (res as any).dailyData.reverse()
    dailyDataTotal.value = (res as any).total
    console.log('Dashboard received daily data:', dailyData.value)
  } catch (error) {
    console.error('Fetch daily data failed:', error)
  }
}

fetchDailyData()
</script>
