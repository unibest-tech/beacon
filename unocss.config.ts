import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
    ],
    rules: [
        ['chart-container', { 'width': '100%', 'height': '16rem', '@md': { 'height': '20rem' } }],
        ['chart-panel', { 'display': 'grid', 'grid-template-columns': 'repeat(1, minmax(0, 1fr))', '@md': { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' }, 'gap': '1.5rem', 'padding': '1rem' }],
        ['chart-item', { 'background-color': 'white', 'border-radius': '0.5rem', 'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)', 'padding': '1rem' }],
        ['data-table-container', { 'background-color': 'white', 'border-radius': '0.5rem', 'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)', 'overflow': 'hidden' }],
    ],
    theme: {
        colors: {
            primary: '#1890ff',
        },
    },
}) 