// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Sub-Routes
const Chat = require('./pages/chat').default;
const Items = require('./pages/items').default;
const WorldMap = require('./pages/map').default;
const Quests = require('./pages/quests').default;
const Ranking = require('./pages/ranking').default;
const Wikia = require('./pages/wikia').default;

export default {
    path: '/world',
    redirect: '/',
    name: 'O Mundo',
    component: DefaultContainer,
    children: [
        Chat,
        Items,
        WorldMap,
        Quests,
        Ranking,
        Wikia
    ]
}