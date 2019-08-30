<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-body p-0">
						<textarea class="form-control" placeholder="Here starts a brand new post" rows="3"></textarea>
					</div>
					<div class="card-footer p-0 newPostFooter">
						<div class="btn-group">
							<button class="btn btn-ghost-primary btn-square"><font-awesome-icon icon="camera"/></button>
							<button class="btn btn-ghost-warning btn-square"><font-awesome-icon icon="video"/></button>
							<button class="btn btn-ghost-danger btn-square"><font-awesome-icon icon="link"/></button>
						</div>
						<button class="btn btn-ghost-success btn-square justify-content-right"><font-awesome-icon icon="paper-plane"/></button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6" v-for="post in posts">
				<Post :post="post"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Post from '@/components/profile/PostItem';

	export default {
		name: 'dashboard',
		components: {
			Post
		},
		data: () => {
			return {
				profile: {
					name: "Akatsuki Levi",
					nickname: "レヴィ",
					level: 20,
					isLeader: true,
					isCurator: false,
					isDev: true,
					bio: `❞                                          
Looking up high, found a steel tower
Wondering how I would feel if I fall down
Was it a dream? I saw deep red
Chasing for what's far ahead, always yearning
Don't know why but the beauty I really want
May seem to be awkward to someone's eyes
Looking down below from top of the tower
Fear takes over my heart and my knees won't stop shaking
Then I realize I'm falling down
										❞
━━⋅⋅ ❀ ⋅⋅━━
約
━━⋅⋅ ❀ ⋅⋅━━
名
Levi
意味
Levi Means Attached, Joined in Hebrew
年齢
Between 16 And 21
性別
Male
━━⋅⋅ ❀ ⋅⋅━━
その他の情報
━━⋅⋅ ❀ ⋅⋅━━
性的 標定
Something between none and none
お誕生日
In march, but not giving day
十二宮
Pisces
❞                                          
Why do the things I have loved always breaking?
Don't know why but the beauty I really want
May seem to be ugly to someone's eyes
Chasing for what's far ahead, always yearning
Don't know why but the beauty I really want
May seem to be little crazy in sight
And now I'd be flying high to the sky
Lifting me to the yonder
Something brought me here
So far from home, but I'm not cold at all
											❞`,
					titles: [
						{
							name: "Mago Das Sombras",
							class: "purple"
						},
						{
							name: "Arqueiro",
							class: "red"
						}
					],
					media: {
						profilePicture: 'https://images-cdn.9gag.com/photo/aE2AGbp_700b.jpg',
						profileBackground: 'https://www.wallpapermaiden.com/wallpaper/18266/download/2560x1600/anime-landscape-sea-ships-colorful-clouds-scenic-tree-horizon.jpg'
					}
				},
				posts: []
			}
		},
		mounted: function () {
			var self = this;
			this.loadPosts(self);
		},
		methods: {
			loadPosts: (self) => {
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

				self.posts.push({
					author: self.profile,
					title: "IJN Tenryuu - No.28 天龍(Tenryuu Class Light Cruiser)",
					content: "Named after Tenryu River in Shizuoka Prefecture; her name literally means \"Heavenly Dragon\". A Training Support Ship, JS Tenryu (ATS-4203) is in service with the modern JMSDF. Despite being launched in 1918, she was capable of sinking the USS Quincy with two torpedoes, an impressive feat considering that the New Orleans-class heavy cruisers were at least 16 years newer than herself.",
					media: {
						url: 'https://images2.alphacoders.com/553/thumb-1920-553930.jpg',
						type: 'image'
					},
					counts: {
						likes: 25,
						comments: 12,
						shares: 7
					},
					lastComments: [{
							author: tenryuu,
							comment: "Hey! Look! It's me!",
							likes: 8
						},
						{
							author: kongou,
							comment: "You look so kawaii!!",
							likes: 7
						},
						{
							author: tenryuu,
							comment: "Thank you!",
							likes: 9
						}
					]
				});
				self.posts.push({
					author: self.profile,
					title: "IJN Kongou - No.21 金剛(Kongou Class Fast Battleship)",
					content: "She's named after Mount Kongou, located between Nara and Osaka prefectures, and literally means \"Indestructible\" or \"Diamond\". She and her sister-ships start at 3 slots, a reference to their start as \"Battlecruisers\". Received her Kai Ni on November 1, 2013. Her name is currently listed in the JMSDF as JDS Kongou, as is Kirishima's. Launched on 18 May 1912 and commissioned on 16 August 1913, she used to be the oldest ship in Kantai Collection until Gangut (launched on 20 October 1911 and commissioned on 11 January 1915) broke this record.",
					media: {
						url: 'https://images3.alphacoders.com/749/thumb-1920-749981.png',
						type: 'image'
					},
					counts: {
						likes: 25,
						comments: 12,
						shares: 7
					},
					lastComments: [{
							author: tenryuu,
							comment: "Kongou! You got one too!",
							likes: 8
						},
						{
							author: kongou,
							comment: "I'm so happy!!",
							likes: 7
						},
						{
							author: tenryuu,
							comment: "The admiral also allowed you to use your gear to the photo!!",
							likes: 9
						}
					]
				});
			}
		}
	}
</script>