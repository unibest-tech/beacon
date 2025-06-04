<template>
  <a-layout class="min-h-screen">
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="bg-white">
      <div class="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 class="text-lg font-bold text-primary" v-if="!collapsed">Unibest Beacon</h1>
        <h1 class="text-lg font-bold text-primary" v-else>UB</h1>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="border-r-0">
        <a-menu-item key="dashboard">
          <template #icon>
            <dashboard-outlined />
          </template>
          <router-link to="/">数据看板</router-link>
        </a-menu-item>
        <a-menu-item key="analysis">
          <template #icon>
            <bar-chart-outlined />
          </template>
          <router-link to="/analysis">数据分析</router-link>
        </a-menu-item>
        <a-menu-item key="settings">
          <template #icon>
            <setting-outlined />
          </template>
          <router-link to="/settings">系统设置</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="bg-white px-4 flex items-center justify-between border-b border-gray-200"
      >
        <a-button type="text" class="mr-4" @click="collapsed = !collapsed">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </a-button>
        <div class="flex-1" />
        <a-dropdown>
          <a-button type="text">
            <template #icon>
              <user-outlined />
            </template>
            管理员
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <user-outlined />
                个人信息
              </a-menu-item>
              <a-menu-item key="logout">
                <logout-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content class="p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';

const route = useRoute();
const collapsed = ref(false);
const selectedKeys = ref<string[]>(['dashboard']);

// 根据路由更新选中的菜单项
watch(
  () => route.path,
  (path) => {
    const key = path === '/' ? 'dashboard' : path.slice(1);
    selectedKeys.value = [key];
  },
  { immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.ant-layout-header) {
  height: 64px;
  line-height: 64px;
  background: #fff;
  padding: 0 24px;
}

:deep(.ant-layout-sider) {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
