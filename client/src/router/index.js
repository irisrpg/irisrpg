import Vue from 'vue';
import Router from 'vue-router';

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const Dashboard = () => import('@/views/main/Dashboard');

// Error Pages
const Page401 = () => import('@/views/error_pages/Page401');
const Page404 = () => import('@/views/error_pages/Page404');
const Page500 = () => import('@/views/error_pages/Page500');

// System Pages
const Login = () => import('@/views/system/Login');
const Register = () => import('@/views/system/Register');

// Routes
const Acting = require('./acting/index').default;
const User = require('./user/index').default;
const World = require('./world/index').default;

Vue.use(Router);

let router = new Router({
	mode: 'hash',
	linkActiveClass: 'open active',
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [
		{
			path: '/',
			redirect: '/dashboard',
			component: DefaultContainer,
			children: [
				{
					path: 'dashboard',
					name: 'Página Principal',
					component: Dashboard,
					meta: {
						requiresAuth: true
					}
				}
			]
		},

		// routes
		Acting,
		User,
		World,

		// system pages
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				guest: true
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				guest: true
			}
		},

		// error pages
		{
			path: '/denied',
			name: 'Acesso Negado',
			component: Page401,
			meta: {
				guest: true
			}
		},
		{
			path: '*',
			name: 'Página Não Encontrada',
			component: Page404,
			meta: {
				guest: true
			}
		},
		{
			path: '/error',
			name: 'Erro',
			component: Page500,
			meta: {
				guest: true
			}
		},
	]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/login',
				params: {
					nextUrl: to.fullPath
				}
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.guest)) {
		if (localStorage.getItem('jwt') == null) {
			next()
		} else {
			next({
				name: 'Dashboard'
			})
		}
	} else {
		next()
	}
});

export default router;
