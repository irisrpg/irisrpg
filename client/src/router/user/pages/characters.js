// Views
const Page = () => import('@/views/pages/user/characters/index')

export default {
    path: '/user/characters',
    name: 'Meus Personagens',
    component: Page,
    meta: {
        page_id: 'usr_characters',
        requiresAuth: true
    }
};