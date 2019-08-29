// Views
const Page = () => import('@/views/pages/acting/quest/index')

export default {
    path: '/acting/quest',
    name: 'Encenação De Quest',
    component: Page,
    meta: {
        page_id: 'act_quest',
        requiresAuth: true
    }
};