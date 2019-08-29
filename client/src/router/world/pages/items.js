// Views
const Page = () => import('@/views/pages/world/items/index')

export default {
    path: '/world/items',
    name: 'Loja De Items',
    component: Page,
    meta: {
        page_id: 'wrd_items',
        requiresAuth: true
    }
};