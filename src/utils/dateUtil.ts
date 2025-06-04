import dayjs from 'dayjs'

// 格式化日期时间
export const formatDateTime = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
}

// 获取时段描述
export const getTimeSlot = (date: string) => {
    const hour = dayjs(date).hour()
    if (hour >= 6 && hour < 9) return '早高峰'
    if (hour >= 11 && hour < 14) return '午高峰'
    if (hour >= 17 && hour < 20) return '晚高峰'
    return '平峰期'
}

// 按日期分组数据
export const groupByDate = (data: any[]) => {
    const groups: { [key: string]: any[] } = {}
    data.forEach(item => {
        const date = dayjs(item.time).format('YYYY-MM-DD')
        if (!groups[date]) {
            groups[date] = []
        }
        groups[date].push(item)
    })
    return groups
}

// 按小时分组数据
export const groupByHour = (data: any[]) => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const result = hours.map(hour => ({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        count: 0
    }))

    data.forEach(item => {
        const hour = dayjs(item.time).hour()
        result[hour].count++
    })

    return result
} 