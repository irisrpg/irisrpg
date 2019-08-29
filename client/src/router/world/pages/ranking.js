// Views
const Page = () => import('@/views/pages/world/ranking/index')

export default {
    path: '/world/ranking',
    name: 'Ranking',
    component: Page,
    meta: {
        page_id: 'wrd_rank',
        requiresAuth: true
    }
};