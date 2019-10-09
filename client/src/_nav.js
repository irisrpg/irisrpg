const page = (name, url, icon) => {
    return {
        "name": name,
        "url": url,
        "icon": "fa fa-"+icon
    };
}

const group = (name) => {
    return {
        "title": true,
        "name": name
    };
}

export default [
    // home page
    page("Inicio", "/dashboard", "dashboard"),

    // profile group
    group("Perfil"),
    page("Meu Perfil", "/user/profile", "user"),
    page("Meus Amigos", "/user/friends", "users"),

    // world group
    group("O Mundo"),
    page("Loja De Items", "/world/items", "archive"),
    page("Mapa", "/world/map", "map"),
    page("Quests Disponíveis", "/world/quests", "list-alt"),
    page("Ranking", "/world/ranking", "star"),
    page("O Oráculo", "/world/wikia", "wikipedia-w"),
    page("Chats", "/world/chat", "comments"),

    // acting group
    group("Encenação"),
    page("Encenação Livre", "/acting/openworld", "comments-o"),
    page("Encenação De Quest", "/acting/quest", "commenting"),
];