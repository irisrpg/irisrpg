<template>
    <div class="row">
        <div class="col-md-3">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header"><strong>Categoria</strong></div>
                        <div class="card-body p-0">
                            <div class="list-group rounded-0">
                                <button type="button" class="list-group-item rounded-0 list-group-item-action active">
                                    Em Destaque
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Armas
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Poções
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Vestimentas
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Ferramentas
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Outros
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header"><strong>Meu carrinho</strong><span class="float-right">$ 125</span></div>
                        <div class="card-body p-0">
                            <div class="list-group rounded-0">
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Grevas Do Berseker ($ 50)
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Adaga De Metal ($ 50)
                                </button>
                                <button type="button" class="list-group-item rounded-0 list-group-item-action">
                                    Poção De Vida Pequena ($ 25)
                                </button>
                            </div>
                        </div>
                        <div class="card-footer p-0">
                            <button class="btn btn-ghost-success btn-square btn-block"><font-awesome-icon icon="check" class="mr-1"/>Confirmar Compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header"><strong>Em Destaque</strong></div>
                <div class="card-body">
                        <div class="card" v-for="category in categories">
                            <div class="card-header">{{ category.name }}</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4" v-for="item in category.items">
                                        <div class="card">
                                            <div class="card-body item-image" :style="'background: url(\''+item.image+'\'\)'"></div>
                                            <div class="card-footer p-0">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3 p-0">Nome</div>
                                                            <div class="col p-0">{{ item.name }}</div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-md-3 p-0">Preço</div>
                                                            <div class="col p-0">$ {{ item.price }}</div>
                                                        </div>
                                                    </li>
                                                    <li class="list-group-item p-2">{{ item.description }}</li>
                                                    <li class="list-group-item p-0">
                                                        <button class="btn btn-ghost-success btn-square btn-block"><font-awesome-icon icon="plus"/> Adicionar Ao Carrinho</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ItemStore',
        data() {
            return {
                categories: [
                    {
                        name: 'Poções',
                        items: [
                            {
                                name: 'Poção De Vida Pequena',
                                price: 250,
                                image: 'https://cdnb.artstation.com/p/assets/images/images/006/740/775/large/alexandru-bulmaga-hp-potion.jpg?1500923339',
                                description: 'Poção pequena, recupera 50 de HP'
                            },
                            {
                                name: 'Poção De Mana Pequena',
                                price: 250,
                                image: 'https://t00.deviantart.net/KA-ghOfTv23kId2Vf3XjqklMa3E=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/6827/th/pre/i/2016/155/9/5/mana_potion_by_servalt-da4ydrl.jpg',
                                description: 'Poção pequena, recupera 50 de Mana'
                            },
                            {
                                name: 'Poção De Stamina',
                                price: 250,
                                image: 'https://i.pinimg.com/originals/06/32/b4/0632b49098a1800a62ad3be77312b4ec.jpg',
                                description: 'Recupera 10 de stamina por turno'
                            },
                            {
                                name: 'Poção De Fogo',
                                price: 250,
                                image: 'https://cdna.artstation.com/p/assets/images/images/014/060/642/large/rockspro-art-potion-icons-01.jpg?1542284244',
                                description: 'Concede resistência ao fogo por 10 turnos'
                            },
                            {
                                name: 'Poção De Gelo',
                                price: 250,
                                image: 'https://i.pinimg.com/originals/46/f2/1b/46f21b7579b016675d2b784c78594cb0.png',
                                description: 'Concede resistência ao gelo por 10 turnos'
                            },
                            {
                                name: 'Poção Elemental',
                                price: 250,
                                image: 'https://i.pinimg.com/originals/1a/06/ef/1a06ef4dc3314531d031e3250e9ae90b.jpg',
                                description: 'Aumenta o dano causado por ataques elementais'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style>
    @import url('./style.scss');
</style>