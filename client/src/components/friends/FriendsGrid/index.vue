<template>
    <div>
        <div class="row">
            <div class="col-md-4" v-for="friend in friends">
                <div class="card b-1">
                    <div class="card-body p-0 char-img" :style="'background: url(\''+friend.media.profileBackground+'\'\)'">
                            <div class="btnDiv">
                                <button class="btn btn-ghost-danger rounded-circle font-weight-bold"><font-awesome-icon icon="times"/></button>
                            </div>
                            <div class="overlay">
                            <div class="d-inline-flex">
                                <div class="rounded-circle profile-picture" :style="'background: url(\''+friend.media.profilePicture+'\'\)'"></div>
                                <div>
                                    <div>
                                        {{ friend.name }} ({{ friend.nickname }}) - Nível {{ friend.level }}
                                    </div>
                                    <div>
                                        <span class="profile_titles">
                                            <span v-if="friend.isLeader" class="badge badge-pill bg-green">Líder</span>
                                            <span v-if="friend.isCurator" class="badge badge-pill bg-green">Curador</span>
                                            <span v-if="friend.isDev" class="badge badge-pill bg-dark">Develoer</span>
                                            <span v-for="title in friend.titles" :class="['badge','badge-pill','bg-'+title.class,'text-white']">{{ title.name }}</span>
                                        </span>
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
    name: 'FriendsGrid',
    props: ['friends'],
}
</script>

<style>
    @import url('./style.scss');
</style>