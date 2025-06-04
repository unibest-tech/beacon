<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">系统设置</h2>
    <a-card>
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="自动刷新">
          <a-switch v-model:checked="formState.autoRefresh" />
        </a-form-item>
        <a-form-item label="刷新间隔">
          <a-input-number
            v-model:value="formState.refreshInterval"
            :min="1"
            :max="60"
            addon-after="分钟"
          />
        </a-form-item>
        <a-form-item label="数据展示">
          <a-checkbox-group v-model:value="formState.displayFields">
            <a-checkbox value="template">模板类型</a-checkbox>
            <a-checkbox value="osPlatform">系统平台</a-checkbox>
            <a-checkbox value="nodeVersion">Node版本</a-checkbox>
            <a-checkbox value="duration">耗时</a-checkbox>
            <a-checkbox value="time">时间</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="主题色">
          <a-radio-group v-model:value="formState.theme">
            <a-radio value="light">浅色</a-radio>
            <a-radio value="dark">深色</a-radio>
            <a-radio value="system">跟随系统</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-button type="primary" @click="handleSave">保存设置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { message } from 'ant-design-vue';

interface FormState {
  autoRefresh: boolean;
  refreshInterval: number;
  displayFields: string[];
  theme: 'light' | 'dark' | 'system';
}

const formState = reactive<FormState>({
  autoRefresh: true,
  refreshInterval: 5,
  displayFields: ['template', 'osPlatform', 'nodeVersion', 'duration', 'time'],
  theme: 'light',
});

const handleSave = () => {
  // 这里可以添加保存到本地存储或发送到服务器的逻辑
  message.success('设置已保存');
};
</script>
