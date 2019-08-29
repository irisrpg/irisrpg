// Views
const Page = () => import('@/views/pages/user/friends/index')

export default {
    path: '/user/friends',
    name: 'Meus Amigos',
    component: Page,
    meta: {
        page_id: 'usr_friends',
        requiresAuth: true
    }
};