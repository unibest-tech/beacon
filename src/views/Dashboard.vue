<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Unibest Beacon 数据看板</h1>
    <ChartPanel :data="tableData" />
    <div class="mt-6">
      <DataTable @update:data="handleDataUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChartPanel from '@/components/ChartPanel.vue';
import DataTable from '@/components/DataTable.vue';
import type { BeaconData } from '@/api/beacon';

const tableData = ref<BeaconData[]>([]);

const handleDataUpdate = (data: BeaconData[]) => {
  console.log('Dashboard received data:', data.length);
  tableData.value = data;
};
</script>
