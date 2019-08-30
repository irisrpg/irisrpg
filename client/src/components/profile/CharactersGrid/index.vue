<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="char in characters">
                <div class="card b-1">
                    <div class="card-header">
                        <font-awesome-icon icon="user"/>
                        {{ char.name }}
                        <font-awesome-icon v-if="char.isMain" icon="star" class="text-warning"/>
                        - Nível {{ char.level }}
                    </div>
                    <div class="card-body p-0 char-img" :style="'background: url(\''+char.picture+'\'\)'">
                        <div class="overlay">
                            <span>{{ char.quote }}</span>
                        </div>
                    </div>
                    <div class="card-footer p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-4">
                                        Raça
                                    </div>
                                    <div class="col">
                                        {{ char.race }}
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-4">
                                        Idade
                                    </div>
                                    <div class="col">
                                        {{ char.age }} Anos
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-4">
                                        Classe
                                    </div>
                                    <div class="col">
                                        {{ char.class }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CharactersGrid',
    props: ['characters'],
}
</script>

<style>
    @import url('./style.scss');
</style>