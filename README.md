# Unibest Beacon 数据看板

基于 Vue 3 + TypeScript + Ant Design Vue 的数据可视化项目，用于展示和分析 Unibest 项目创建数据。

## 技术栈

- Vue 3 + TypeScript
- Ant Design Vue
- ECharts
- UnoCSS
- Vue Router
- Dayjs

## 功能特性

- 数据表格展示
  - 分页查询
  - 系统平台筛选
  - 自适应布局
- 数据可视化
  - 系统分布饼图
  - 时段使用量柱状图
- 响应式设计
  - 支持桌面端和移动端

## 开发环境

```bash
# Node.js 版本要求
node >= 16.0.0

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
project/
├── src/
│   ├── api/                  # 接口请求
│   ├── components/           # 组件
│   ├── layouts/             # 布局
│   ├── router/              # 路由
│   ├── utils/               # 工具函数
│   ├── views/               # 页面
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── index.html              # HTML 模板
├── unocss.config.ts        # UnoCSS 配置
├── vite.config.ts          # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## API 接口

- 基础 URL: `https://ukw0y1.laf.run`
- 数据查询接口: `/create-unibest/getBeacon`
  - 参数:
    - page: 页码
    - pageSize: 每页数量
    - os: 系统平台过滤
