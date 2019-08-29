<template>
	<AppHeaderDropdown right no-caret>
		<template slot="header">
			<img src="img/avatar.png" class="img-avatar" />
		</template>\
		<template slot="dropdown">
			<b-dropdown-header tag="div" class="text-center">
				<strong>Configurações</strong>
			</b-dropdown-header>
				<b-dropdown-item><i class="fa fa-user" /> Meu Perfil</b-dropdown-item>
			</b-dropdown-item>
			<b-dropdown-divider />
			<b-dropdown-item @click="doLogout">
				<i class="fa fa-lock" /> Logout
			</b-dropdown-item>
		</template>
	</AppHeaderDropdown>
</template>

<script>
	import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
	export default {
		name: 'UserBar',
		components: {
			AppHeaderDropdown
		},
		methods: {
			doLogout: function() {
				this.$bvModal.msgBoxConfirm('Tem certeza que deseja desconectar?', {
					title: 'Sair',
					size: 'sm',
					buttonSize: 'sm',
					okVariant: 'danger',
					okTitle: 'SIM',
					cancelTitle: 'NÃO',
					footerClass: 'p-2',
					hideHeaderClose: false,
					centered: true
				}).then(value => {
					if(value) {
						var vueCMP = this;
						this.$http({
							"method": "GET",
							"url": "http://api.sigamecar.com.br/auth/logout",
						}).then(function(response) {
							localStorage.removeItem('user');
							localStorage.removeItem('jwt');
							vueCMP.$emit('loggedOut');
							vueCMP.$router.go();
						});						
					}
				});
			}
		}
	}
</script>