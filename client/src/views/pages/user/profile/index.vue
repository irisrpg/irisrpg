<template>
    <div class="animated fadeIn">
        <ProfileHeader :profile="profile"/>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade p-0 show active" id="nav-posts" role="tabpanel" aria-labelledby="nav-posts-tab">
                <div class="card-header">
                    <strong><font-awesome-icon icon="blog"/> Posts</strong>
                </div>
                <div class="card-body">
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
                    <Post v-for="post in posts" :post="post"/>
                </div>
            </div>
            <div class="tab-pane fade p-0" id="nav-chars" role="tabpanel" aria-labelledby="nav-chars-tab">
                <div class="card-header">
                    <strong><font-awesome-icon icon="users"/> Personagens</strong>
                </div>
                <div class="card-body">
                    <CharactersGrid :characters="characters"/>
                </div>
            </div>
            <div class="tab-pane fade p-0" id="nav-quests" role="tabpanel" aria-labelledby="nav-quests-tab">
                <div class="card-header">
                    <strong><font-awesome-icon icon="tasks"/> Quests Completas</strong>
                </div>
                <div class="card-body">
                    <QuestsGrid :quests="quests"/>
                </div>
            </div>
            <div class="tab-pane fade p-0" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                <div class="card-header">
                    <strong><font-awesome-icon icon="id-card"/> Sobre</strong>
                </div>
                <pre class="card-body text-center">{{ profile.bio }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader';
import Post from '@/components/profile/PostItem';
import CharactersGrid from '@/components/profile/CharactersGrid';
import QuestsGrid from '@/components/profile/QuestsGrid';

export default {
    name: 'Perfil',
    data: () => {
        return {
            quests: [
                {
                    name: "Escape from the void",
                    levelRage: [1, 5],
                    description: "You woke up at the void, now you have to escape.",
                    character: "Kai'sa",
                    status: "Completed",
                    exp: 100,
                    rewards: [
                        {
                            icon: "dollar-sign",
                            type: "Money",
                            quantity: 250
                        },
                        {
                            type: "Item",
                            item: "2nd Skin"
                        }
                    ]
                },
                {
                    name: "Become Human",
                    levelRage: [1, 5],
                    description: "The call for the magic world awaits you. Will you take it?",
                    character: "Ahri",
                    status: "Completed",
                    exp: 100,
                    rewards: [
                        {
                            icon: "dollar-sign",
                            type: "Money",
                            quantity: 250
                        },
                        {
                            type: "Item",
                            item: "Soul Essence"
                        }
                    ]
                },
                {
                    name: "The soul medley",
                    levelRage: [1, 5],
                    description: "A single instrument, seems to unfold a journey who will change your life.",
                    character: "Sona",
                    status: "Completed",
                    exp: 100,
                    rewards: [
                        {
                            icon: "dollar-sign",
                            type: "Money",
                            quantity: 250
                        },
                        {
                            type: "Item",
                            item: "Etwahl"
                        }
                    ]
                },
                {
                    name: "Starchild",
                    levelRage: [1, 5],
                    description: "Born from a star, awakened by the gods. Will you awaken and unfold the truth?",
                    character: "Levi",
                    status: "Completed",
                    exp: 100,
                    rewards: [
                        {
                            icon: "dollar-sign",
                            type: "Money",
                            quantity: 250
                        },
                        {
                            type: "Item",
                            item: "Aura"
                        }
                    ]
                }
            ],
            characters: [
                {
                    name: "Levi",
                    race: "Kitsune",
                    age: 14,
                    level: 11,
                    class: 'Paladino',
                    isMain: true,
                    quote: "I wanna dangos... And Chocolate.. And dangos... And Chocolate...",
                    picture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a69b0d53-f6bf-40cc-a3e9-928aa7956b78/dapmr3h-605798f4-bf4c-4c84-a758-b517320c3012.png/v1/fill/w_811,h_985,q_70,strp/inuxboku_soushi_miketsukami_child_by_metalsonic612_dapmr3h-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjMzMCIsInBhdGgiOiJcL2ZcL2E2OWIwZDUzLWY2YmYtNDBjYy1hM2U5LTkyOGFhNzk1NmI3OFwvZGFwbXIzaC02MDU3OThmNC1iZjRjLTRjODQtYTc1OC1iNTE3MzIwYzMwMTIucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EE1tCiFIcbTk-RpO9pyOImKU4kaTD1fI-07EiHH8QDQ"
                },
                {
                    name: "Kai'sa",
                    race: "Human",
                    age: 203,
                    level: 40,
                    class: 'Criatura Do Vazio',
                    isMain: false,
                    quote: "Are you the prey? Or the predator?",
                    picture: "https://avatarfiles.alphacoders.com/144/144057.jpg"
                },
                {
                    name: "Ahri",
                    race: "Devian",
                    age: 3147,
                    level: 39,
                    class: 'Maga das almas',
                    isMain: false,
                    quote: "Don't you trust me?",
                    picture: "https://vignette.wikia.nocookie.net/leagueoflegends/images/f/f1/Ahri_OriginalCentered.jpg/revision/latest/scale-to-width-down/1215?cb=20180414201908"
                },
                {
                    name: "Sona",
                    race: "Human",
                    age: 37,
                    level: 41,
                    class: 'Maga',
                    isMain: false,
                    quote: "Only you can hear me summoner, what medleys should we play today?",
                    picture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61a5bf18-09b0-4cb9-9cd0-7a791870f17e/d5x3tir-4089bf91-a1d2-4931-8e07-84bc9e7c61b3.jpg/v1/fill/w_1164,h_687,q_70,strp/sona_by_shilin_d5x3tir-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE3IiwicGF0aCI6IlwvZlwvNjFhNWJmMTgtMDliMC00Y2I5LTljZDAtN2E3OTE4NzBmMTdlXC9kNXgzdGlyLTQwODliZjkxLWExZDItNDkzMS04ZTA3LTg0YmM5ZTdjNjFiMy5qcGciLCJ3aWR0aCI6Ijw9MTIxNSJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.piVGnjiHLX37ytmilE8orsdmTt-Fx44gei-bBo-InwA"
                }
            ],
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
    components: {
        ProfileHeader,
        Post,
        CharactersGrid,
        QuestsGrid
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
            };

            var kongou = {
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
                lastComments: [
                    {
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
                lastComments: [
                    {
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

<style>
    @import url('./style.scss');
</style>