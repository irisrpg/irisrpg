// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Sub-Routes
const Acting = require('./pages/acting').default;
const Quest = require('./pages/quest').default;

export default {
    path: '/acting',
    redirect: '/',
    name: 'Encenação',
    component: DefaultContainer,
    children: [
        Acting,
        Quest
    ]
}