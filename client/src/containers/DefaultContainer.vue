<template>
	<div class="app">
		<AppHeader fixed>
			<SidebarToggler class="d-lg-none" display="md" mobile />
			<b-link class="navbar-brand" to="#">
				<div class="navbar-brand-full">
					<img src="img/logo-symbol.png" width="30" height="30">
					IrisRPG
				</div>
				<img class="navbar-brand-minimized" src="img/logo-symbol.png" width="30" height="30">
			</b-link>
			<SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
			<b-navbar-nav class="d-md-down-none">
				<b-nav-item class="px-3" to="/inicio">Inicio</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav class="ml-auto">
				<UserBar/>
			</b-navbar-nav>
		</AppHeader>
		<div class="app-body">
			<AppSidebar fixed>
				<SidebarHeader/>
				<SidebarForm/>
				<SidebarNav :navItems="nav"></SidebarNav>
				<SidebarFooter/>
				<SidebarMinimizer/>
			</AppSidebar>
			<main class="main">
				<Breadcrumb :list="list"/>
				<div class="container-fluid">
					<router-view></router-view>
				</div>
			</main>
		</div>
		<TheFooter>
			<!--footer-->
			<div>
				<a href="https://github.com/irisrpg/irisrpg">Powered with <i class="fa fa-heart text-danger"></i> by IrisRPG</a>
			</div>
		</TheFooter>
	</div>
</template>

<script>
	import _nav from '@/_nav';
	import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
	import UserBar from './UserBar';

	export default {
		name: 'DefaultContainer',
		components: {
			AsideToggler,
			AppHeader,
			AppSidebar,
			AppAside,
			TheFooter,
			Breadcrumb,
			SidebarForm,
			SidebarFooter,
			SidebarToggler,
			SidebarHeader,
			SidebarNav,
			SidebarMinimizer,
			UserBar
		},
		data () {
			return {
				nav: _nav
			}
		},
		computed: {
			name () {
				return this.$route.name
			},
			list () {
				return this.$route.matched.filter((route) => route.name || route.meta.label )
			}
		}
	}
</script>
