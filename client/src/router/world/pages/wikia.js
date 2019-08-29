// Views
const Page = () => import('@/views/pages/world/wikia/index')

export default {
    path: '/world/wikia',
    name: 'O Oráculo',
    component: Page,
    meta: {
        page_id: 'wrd_wikia',
        requiresAuth: true
    }
};