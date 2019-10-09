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
                    <Post v-for="post in posts" v-bind:key="post.id" :post="post"/>
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
        <b-modal
        size="xl"
        scrollable
        centered
        :hide-footer="true"
        :hide-header-close="true"
        :busy="true"
        :cancel-disabled="true"
        :ok-disabled="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        variant="primary"
        id="new-profile"
        title="Novo Perfil"
        @hide="resetNewProfileModal('hide')">
            <template slot="default" slot-scope="{ hide }">
                <NewProfileDialog
                    @hide="hide()"
                    v-on:success="resetNewProfileModal('success')"
                    v-on:error="resetNewProfileModal('error')"/>
            </template>
        </b-modal>
    </div>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader';
import Post from '@/components/profile/PostItem';
import CharactersGrid from '@/components/profile/CharactersGrid';
import QuestsGrid from '@/components/profile/QuestsGrid';

import NewProfileDialog from './components/newProfileDialog';

export default {
    name: 'Perfil',
    data: () => {
        return {
            quests: [],
            characters: [],
            profile: {
                name: null,
                nickname: null,
                level: 1,
                isLeader: false,
                isCurator: false,
                isDev: false,
                bio: null,
                titles: [],
                media: {
                    profilePicture: null,
                    profileBackground: null
                }
            },
            posts: []
        }
    },
    components: {
        ProfileHeader,
        Post,
        CharactersGrid,
        QuestsGrid,

        NewProfileDialog
    },
    mounted: function () {
        this.loadProfile();
        this.loadPosts();
    },
    methods: {
        resetNewProfileModal: function (event) {
            if (event === 'success') {
                this.$bvToast.toast('Perfil criado com sucesso!', {
                    title: `Sucesso!`,
                    variant: 'success',
                    solid: true
                });
                this.loadProfile();
            } else if (event === 'error') {
                this.$bvToast.toast('Um erro ocorreu e não foi possível completar a solicitação.', {
                    title: `Erro!`,
                    variant: 'danger',
                    solid: true
                });
            }
        },
        loadProfile: function () {
            var self = this;
            this.$http.get("/profile").then(function (response) {
                self.profile = response.data.profile;
            }).catch(function (error) {
                if (error.response.status === 404) {
                    self.$bvModal.show("new-profile");
                } else {
                    if (error.response) {
                        self.$bvToast.toast(error.response.data.message, {
                            title: `Erro!`,
                            variant: 'danger',
                            solid: true
                        });
                    } else {
                        self.$bvToast.toast(error.toString(), {
                            title: `Erro!`,
                            variant: 'danger',
                            solid: true
                        });
                    }
                }
            });
        },
        loadPosts: function () {
            var self = this;
            this.$http.get("/posts").then(function (response) {
                self.posts = response.data;
            }).catch(function (error) {
                if (error.response) {
                    self.$bvToast.toast(error.response.data.message, {
                        title: `Erro!`,
                        variant: 'danger',
                        solid: true
                    });
                } else {
                    self.$bvToast.toast(error.toString(), {
                        title: `Erro!`,
                        variant: 'danger',
                        solid: true
                    });
                }
            });
        }
    }
}
</script>

<style>
    @import url('./style.scss');
</style>