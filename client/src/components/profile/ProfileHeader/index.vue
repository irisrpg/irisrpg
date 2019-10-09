<template>
    <div class="profile_header" :style="'background: url(\''+profile.media.profileBackground+'\'\)'">
        <div class="overlay">
            <div class="container">
                <div class="profile_header_info">
                    <div>
                        <div class="rounded-circle profile_header_picture" :style="'background: url(\''+profile.media.profilePicture+'\'\)'"></div>
                        <div class="profile_header_info_names">
                            <span class="profile_name">{{ profile.name }}<small>({{ profile.nickname }})</small></span>
                            <span class="profile_header_level"><font-awesome-icon icon="star"/> Nível {{ profile.level }}</span>
                            <span class="profile_header_titles">
                                <span v-if="profile.isLeader" class="badge badge-pill bg-green">Líder</span>
                                <span v-if="profile.isCurator" class="badge badge-pill bg-green">Curador</span>
                                <span v-if="profile.isDev" class="badge badge-pill bg-dark">Desenvolvedor</span>
                                <span v-for="title in profile.titles" v-bind:key="title.name" :class="['badge','badge-pill','bg-'+title.class]">{{ title.name }}</span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="profile_header_counters">
                            <ul class="nav nav-tabs" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-posts-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="nav-posts" aria-selected="true" @click="showTab('nav-posts')"><font-awesome-icon icon="blog"/> Posts</a>
                                <a class="nav-item nav-link" id="nav-chars-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="nav-chars" aria-selected="false" @click="showTab('nav-chars')"><font-awesome-icon icon="users"/> Personagens</a>
                                <a class="nav-item nav-link" id="nav-quests-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="nav-quests" aria-selected="false" @click="showTab('nav-quests')"><font-awesome-icon icon="tasks"/> Quests Completas</a>
                                <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="nav-about" aria-selected="false" @click="showTab('nav-about')"><font-awesome-icon icon="id-card"/> Sobre</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlay-buttons">
                <button type="button" class="btn rounded-circle btn-primary edit-button btn-lg">
                    <font-awesome-icon icon="edit"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile_header',
    props: ['profile'],
    created() {
        if(this.profile.media.profileBackground) {
            if (this.profile.media.profileBackground.substring(0, 5) !== 'https') {
                this.profile.media.profileBackground = window.cloudinary + this.profile.media.profileBackground;
            }
        }

        if(this.profile.media.profilePicture) {
            if (this.profile.media.profilePicture.substring(0, 5) !== 'https') {
                this.profile.media.profilePicture = window.cloudinary + this.profile.media.profilePicture;
            }
        }
        
    },
    updated() {
        if(this.profile.media.profileBackground) {
            if (this.profile.media.profileBackground.substring(0, 5) !== 'https') {
                this.profile.media.profileBackground = window.cloudinary + this.profile.media.profileBackground;
            }
        }

        if(this.profile.media.profilePicture) {
            if (this.profile.media.profilePicture.substring(0, 5) !== 'https') {
                this.profile.media.profilePicture = window.cloudinary + this.profile.media.profilePicture;
            }
        }
    },
    methods: {
        resetTabs: function() {
            document.getElementById("nav-posts").classList.remove("show");
            document.getElementById("nav-chars").classList.remove("show");
            document.getElementById("nav-quests").classList.remove("show");
            document.getElementById("nav-about").classList.remove("show");

            document.getElementById("nav-posts").classList.remove("active");
            document.getElementById("nav-chars").classList.remove("active");
            document.getElementById("nav-quests").classList.remove("active");
            document.getElementById("nav-about").classList.remove("active");

            document.getElementById("nav-posts-tab").classList.remove("active");
            document.getElementById("nav-chars-tab").classList.remove("active");
            document.getElementById("nav-quests-tab").classList.remove("active");
            document.getElementById("nav-about-tab").classList.remove("active");
        },
        showTab: function(tab) {
            this.resetTabs();
            document.getElementById(tab).classList.add("show");
            document.getElementById(tab).classList.add("active");
            document.getElementById(tab+"-tab").classList.add("active");
        }
    }
}
</script>

<style>
    @import url('./style.scss');
</style>