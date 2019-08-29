// Views
const Page = () => import('@/views/pages/world/chat/index')

export default {
    path: '/world/chat',
    name: 'Chats',
    component: Page,
    meta: {
        page_id: 'wrd_chat',
        requiresAuth: true
    }
};