// Views
const Page = () => import('@/views/pages/world/quests/index')

export default {
    path: '/world/quests',
    name: 'Quests Disponíveis',
    component: Page,
    meta: {
        page_id: 'wrd_quests',
        requiresAuth: true
    }
};