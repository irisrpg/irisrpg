// Views
const Page = () => import('@/views/pages/world/map/index')

export default {
    path: '/world/map',
    name: 'Mapa',
    component: Page,
    meta: {
        page_id: 'wrd_map',
        requiresAuth: true
    }
};