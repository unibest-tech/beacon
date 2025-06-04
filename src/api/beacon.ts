import request from './request'

// 接口返回类型定义
export interface BeaconData {
  _id: string
  template: string
  duration: number // 单位：秒
  time: string // 格式：YYYY-MM-DD HH:mm:ss
  osPlatform?: string // 系统平台（win32/darwin/linux）
  nodeVersion?: string
  cpuModel?: string
}

export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
  page: number
  limit: number
  total: number
}

export interface QueryParams {
  page?: number
  pageSize?: number
  os?: string
}

// 分页查询接口
export async function fetchBeaconData(
  params: QueryParams,
): Promise<ApiResponse<BeaconData[]>> {
  const response = await request.get<any, ApiResponse<BeaconData[]>>(
    '/create-unibest/getBeacon',
    {
      params,
    },
  )
  return response
}

interface HourlyDataItem {
  hour: number
  count: number
}

export async function fetchBeaconHourlyData(): Promise<
  ApiResponse<{ total: number; hourlyData: HourlyDataItem[] }>
> {
  const response = await request.get<
    any,
    ApiResponse<{ total: number; hourlyData: HourlyDataItem[] }>
  >('/create-unibest/getBeaconByHour')
  return response
}
export async function fetchBeaconDailyData(): Promise<
  ApiResponse<{ total: number; dailyData: HourlyDataItem[] }>
> {
  const response = await request.get<
    any,
    ApiResponse<{ total: number; dailyData: HourlyDataItem[] }>
  >('/create-unibest/getBeaconByDay')
  return response
}
