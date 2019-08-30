<template>
    <b-tabs>
        <b-tab>
            <template slot="title">
                <i class='icon-speech'></i>
            </template>
            <div class="p-3">
                <h6>Chats</h6>
				<div v-for="chat in chats">
					<div class="message">
						<div class="py-1 pb-3 mr-3 float-left">
							<div class="avatar">
								<img :src="chat.profile.media.profilePicture" class="img-avatar">
								<b-badge variant="success" class="avatar-status"></b-badge>
							</div>
						</div>
						<div>
							<small class="text-muted">{{ chat.profile.name }} ({{ chat.profile.nickname }})</small>
							<small class="text-muted float-right mt-1">{{ chat.timestamp }}</small>
						</div>
						<div :class="['text-truncate', (!chat.isRead ? 'font-weight-bold' : '')]">{{ chat.lastMessage }}</div>
					</div>
					<hr>
				</div>
            </div>
        </b-tab>
        <b-tab>
            <template slot="title">
                <i class='icon-settings'></i>
            </template>
            <div class="p-3">
                <h6>Opções</h6>
                <div class="aside-options">
                    <div class="clearfix mt-4">
                        <small><b>Não perturbe</b></small>
                        <c-switch color="success" label variant="pill" size="sm" class="float-right" />
                    </div>
                    <div>
                        <small class="text-muted">Ativando este modo, você não receberá nenhuma notificação. Ainda estará online independentemente</small>
                    </div>
                </div>
                <div class="aside-options">
                    <div class="clearfix mt-3">
                        <small><b>Notificações No Desktop</b></small>
                        <c-switch color="success" label variant="pill" size="sm" class="float-right" checked/>
                    </div>
                    <div>
                        <small class="text-muted">Ativando esta opção, você receberá as notificações em seu desktop. Caso não esteja ativado, será usado o sistema interno de notificações.</small>
                    </div>
                </div>
                <div class="aside-options">
                    <div class="clearfix mt-3">
                        <small><b>Ativar Depurador</b></small>
                        <c-switch color="success" label variant="pill" size="sm" class="float-right" checked />
                    </div>
                </div>
                <hr>
                <h6>Uso do sistema</h6>
                <div class="text-uppercase mb-1 mt-4">
                    <small><b>Uso Da CPI</b></small>
                </div>
                <b-progress height={} class="progress-xs" variant="info" :value="25"></b-progress>
                <small class="text-muted">15 Processos, 1 núcleo em uso.</small>
                <div class="text-uppercase mb-1 mt-2">
                    <small><b>Uso De Memória</b></small>
                </div>
                <b-progress height={} class="progress-xs" variant="success" :value="10"></b-progress>
                <small class="text-muted">384 MB de 4 GB em uso.</small>
                <div class="text-uppercase mb-1 mt-2">
                    <small><b>Uso De HD - SSD A</b></small>
                </div>
                <b-progress height={} class="progress-xs" variant="danger" :value="95"></b-progress>
                <small class="text-muted">243 GB / 256 GB</small>
                <div class="text-uppercase mb-1 mt-2">
                    <small><b>Uso De HD - SSD B</b></small>
                </div>
                <b-progress height={} class="progress-xs" variant="success" :value="10"></b-progress>
                <small class="text-muted">25GB / 256GB</small>
            </div>
        </b-tab>
    </b-tabs>
</template>

<script>
	import { Switch as cSwitch } from '@coreui/vue'
	export default {
		name: 'DefaultAside',
		components: {
			cSwitch
		},
		data() {
			var tenryuu = {
				name: "Tenryuu",
				nickname: "天龍",
				level: 20,
				isLeader: true,
				isCurator: false,
				isDev: true,
				titles: [{
						name: "Mago Das Sombras",
						class: "purple"
					},
					{
						name: "Mestre Das Lâminas",
						class: "red"
					}
				],
				media: {
					profilePicture: 'https://avatarfiles.alphacoders.com/159/159260.jpg',
					profileBackground: 'https://c4.wallpaperflare.com/wallpaper/130/834/476/anime-kantai-collection-tenryuu-kancolle-wallpaper-thumb.jpg'
				}
			};

			var kongou = {
				name: "Kongou",
				nickname: "金剛",
				level: 20,
				isLeader: true,
				isCurator: false,
				isDev: true,
				titles: [{
						name: "Mago Da Luz",
						class: "yellow"
					},
					{
						name: "Mestre Das Armas",
						class: "red"
					}
				],
				media: {
					profilePicture: 'http://s3.amazonaws.com/cdn.roosterteeth.com/uploads/images/c129da3b-eada-40af-966d-6b662904e960/md/Kongou553c0b6940651.jpg',
					profileBackground: 'https://www.wallpapermaiden.com/wallpaper/8095/download/2560x1440/kantai-collection-kongou-profile-view-brown-hair-japanese-traditional-clothes.jpg'
				}
			};

			return {
				chats: [
					{
						profile: tenryuu,
						lastMessage: "Hey! Thank you so much for the follow!",
						timestamp: '4:10 PM',
						isRead: false
					},
					{
						profile: kongou,
						lastMessage: "But this way i won't be able to defend! She'll be all attack based!",
						timestamp: '4:13 PM',
						isRead: true
					}
				]
			}
		}
	}
</script>