<template>
    <div class="animated fadeIn">
        <FriendsGrid :friends="friends"/>
    </div>
</template>

<script>
    import FriendsGrid from '@/components/friends/FriendsGrid';
    
    export default {
        name: 'FriendsList',
        components: {
            FriendsGrid
        },
        data() {
            return {
                friends: [
                    {
                        name: "Tenryuu",
                        nickname: "天龍",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
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
                    },
                    {
                        name: "Tatsuta",
                        nickname: "天龍",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
                                name: "Mago Das Sombras",
                                class: "purple"
                            },
                            {
                                name: "Mestre Das Lâminas",
                                class: "red"
                            }
                        ],
                        media: {
                            profilePicture: 'https://images-cdn.9gag.com/photo/a9Ajq96_700b.jpg',
                            profileBackground: 'https://images3.alphacoders.com/855/thumb-1920-855457.png'
                        }
                    },
                    {
                        name: "Kongou",
                        nickname: "金剛",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
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
                    },
                    {
                        name: "Yamato",
                        nickname: "大和?",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
                                name: "Hotel",
                                class: "info"
                            },
                            {
                                name: "Suporte",
                                class: "success"
                            }
                        ],
                        media: {
                            profilePicture: 'https://www.wallpaperup.com/uploads/wallpapers/2014/08/17/423211/891630255e16a1b641badad1c7e60636-700.jpg',
                            profileBackground: 'https://images.alphacoders.com/573/thumb-1920-573331.jpg'
                        }
                    },
                    {
                        name: "Shimakaze",
                        nickname: "島風",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
                                name: "Criança",
                                class: "primary"
                            },
                            {
                                name: "Aspecto da liberdade",
                                class: "yellow"
                            }
                        ],
                        media: {
                            profilePicture: 'http://41.media.tumblr.com/9583aafeb5cacd0d0252c9a72f0cf4e6/tumblr_nkpbdtpJAT1rrr564o1_500.jpg',
                            profileBackground: 'https://images6.alphacoders.com/453/thumb-1920-453889.jpg'
                        }
                    },
                    {
                        name: "Yuudachi",
                        nickname: "夕立",
                        level: 20,
                        isLeader: false,
                        isCurator: false,
                        isDev: false,
                        titles: [
                            {
                                name: "POI",
                                class: "yellow"
                            },
                            {
                                name: "Mestre Das Armas",
                                class: "red"
                            }
                        ],
                        media: {
                            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNtwScS_STTLIdg1_tTQm5-CGrUxXXIb9eLCLM9urFHC9wJDjC',
                            profileBackground: 'https://i.ytimg.com/vi/TIe1lleCXmc/maxresdefault.jpg'
                        }
                    }
                ]
            }
        }
    }
</script>