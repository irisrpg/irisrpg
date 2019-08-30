<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="quest in quests">
                <div class="card b-1">
                    <div class="card-header">
                        <font-awesome-icon v-if="quest.status == 'Completed'" icon="check" class="text-success"/>
                        <font-awesome-icon v-if="quest.status != 'Completed'" icon="ellipsis-h" class="text-primary"/>
                        {{ quest.name }}
                        - Nível {{ quest.levelRage[0] }} / {{ quest.levelRage[1] }}
                    </div>
                    <div class="card-body">
                        <span>{{ quest.description }}</span>
                    </div>
                    <div class="card-footer p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-5">
                                        Personagem
                                    </div>
                                    <div class="col">
                                        {{ quest.character }}
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-md-5">
                                        Experiência
                                    </div>
                                    <div class="col">
                                        {{ quest.exp }} EXP
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item p-0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        Recompensas
                                    </li>
                                    <li class="list-group-item" v-for="reward in quest.rewards">
                                        <div v-if="reward.quantity" class="row">
                                            <div class="col-md-5">
                                                <font-awesome-icon :icon="reward.icon" class="text-success"/>
                                                {{ reward.type }}
                                            </div>
                                            <div class="col">
                                                {{ reward.quantity }}
                                            </div>
                                        </div>
                                        <div v-if="!reward.quantity" class="row">
                                            <div class="col-md-5">
                                                <font-awesome-icon icon="suitcase" class="text-primary"/>
                                                {{ reward.type }}
                                            </div>
                                            <div class="col">
                                                {{ reward.item }}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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
    name: 'QuestsGrid',
    props: ['quests'],
}
</script>

<style>
    @import url('./style.scss');
</style>