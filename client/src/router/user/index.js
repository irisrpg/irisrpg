// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Sub-Routes
const Characters = require('./pages/characters').default;
const Friends = require('./pages/friends').default;
const Profile = require('./pages/profile').default;
const Quests = require('./pages/quests').default;

export default {
    path: '/user',
    redirect: '/',
    name: 'Perfil',
    component: DefaultContainer,
    children: [
        Characters,
        Friends,
        Profile,
        Quests
    ]
}