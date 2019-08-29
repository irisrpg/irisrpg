// Views
const Page = () => import('@/views/pages/user/quests/index')

export default {
    path: '/user/quests',
    name: 'Minhas Quests',
    component: Page,
    meta: {
        page_id: 'usr_quests',
        requiresAuth: true
    }
};