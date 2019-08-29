// Views
const Page = () => import('@/views/pages/user/profile/index')

export default {
    path: '/user/profile',
    name: 'Meu Perfil',
    component: Page,
    meta: {
        page_id: 'usr_profile',
        requiresAuth: true
    }
};