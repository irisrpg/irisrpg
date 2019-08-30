// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Sub-Routes
const Friends = require('./pages/friends').default;
const Profile = require('./pages/profile').default;

export default {
    path: '/user',
    redirect: '/',
    name: 'Perfil',
    component: DefaultContainer,
    children: [
        Friends,
        Profile
    ]
}