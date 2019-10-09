# Quest
```json
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
}
```

# Character
```json
{
    name: "Levi",
    race: "Kitsune",
    age: 14,
    level: 11,
    class: 'Paladino',
    isMain: true,
    quote: "I wanna dangos... And Chocolate.. And dangos... And Chocolate...",
    picture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a69b0d53-f6bf-40cc-a3e9-928aa7956b78/dapmr3h-605798f4-bf4c-4c84-a758-b517320c3012.png/v1/fill/w_811,h_985,q_70,strp/inuxboku_soushi_miketsukami_child_by_metalsonic612_dapmr3h-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjMzMCIsInBhdGgiOiJcL2ZcL2E2OWIwZDUzLWY2YmYtNDBjYy1hM2U5LTkyOGFhNzk1NmI3OFwvZGFwbXIzaC02MDU3OThmNC1iZjRjLTRjODQtYTc1OC1iNTE3MzIwYzMwMTIucG5nIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.EE1tCiFIcbTk-RpO9pyOImKU4kaTD1fI-07EiHH8QDQ"
}
```

# Profile
```json
{
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
}
```

# Post
```json
{
    author: {{ author.profile }},
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
}
```