// Views
const Page = () => import('@/views/pages/acting/openworld/index')

export default {
    path: '/acting/openworld',
    name: 'Encenação Livre',
    component: Page,
    meta: {
        page_id: 'act_openworld',
        requiresAuth: true
    }
};