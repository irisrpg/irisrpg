<template>
    <div class="animated fadeIn">
        <div id="loader" v-if="this.loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: white; z-index: 9999; padding-top: 50%;" class="d-flex justify-content-center">
            <b-spinner style="margin-top: -10%"></b-spinner>
        </div>
        <div class="title">
            <span>Seu perfil ainda não foi configurado, portanto é preciso que você configure o mesmo antes de começar a usar o Iris!</span>
        </div>
        <hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row>
                <b-col md="6">
                    <b-form-group invalid-feedback="Este campo é necessário" label="Nome:">
                        <b-form-input id="name" :value="this.form.name" v-model="form.name" required :state="this.states.name"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group invalid-feedback="Este campo é necessário" label="Apelido:">
                        <b-form-input id="nickname" :value="this.form.nickname" v-model="form.nickname" required :state="this.states.nickname"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group invalid-feedback="Este campo é necessário" label="Foto De Perfil:">
                        <b-button @click="uploadAvatar()" block variant="primary">Alterar Avatar</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-if="preview.profilePicture">
                <b-col md="12" class="text-center avatar-preview">
                    <img :src="preview.profilePicture">
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group invalid-feedback="Este campo é necessário" label="Cover:">
                        <b-button @click="uploadCover()" block variant="primary">Alterar Cover</b-button>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row v-if="preview.profileBackground">
                <b-col md="12" class="text-center cover-preview" :style="'background: url(\''+preview.profileBackground+'\')'"></b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <b-form-group invalid-feedback="Este campo é necessário" label="Biografia:">
                        <b-form-textarea id="bio" :value="this.form.bio" v-html="this.form.bio" v-model="form.bio" required :state="this.states.bio"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" class="text-center">
                    <b-button type="submit" variant="success"><i class="fa fa-save"></i> Salvar</b-button>
                </b-col>
                <b-col md="6" class="text-center">
                    <b-button type="reset" variant="warning"><i class="fa fa-arrow-down"></i> Reiniciar</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>

    export default {
        name: 'newProfileDialog',
        data () {
            return {
                loading: false,
                preview: {
                    profileBackground: null,
                    profilePicture: null
                },
                form: {
                    media: {
                        profileBackground: '',
                        profilePicture: ''
                    },
                    name: '',
                    nickname: '',
                    bio: ''
                },
                states: {
                    media: {
                        profileBackground: null,
                        profilePicture: null
                    },
                    name: null,
                    nickname: null
                },
                show: true
            }
        },
        created () {
            this.loading = true;
            this.form = {
                media: {
                    profileBackground: '',
                    profilePicture: ''
                },
                name: '',
                nickname: '',
                bio: ''
            };
            this.loading = false;
        },
        methods: {
            uploadAvatar () {
               window.cloudinary.openUploadWidget({
                    cloud_name: 'irisrpg',
                    upload_preset: 'euhody54',
                    tags: ['avatar'],
                    sources: [
                        'local',
                        'url',
                    ]
                }, (error, result) => {
                    if(error) {
                        console.log(error)
                    } else {
                        var file = result[0];
                        this.form.media.profilePicture = file.public_id;
                        this.preview.profilePicture = file.secure_url;
                    }
                }); 
            },
            uploadCover () {
               window.cloudinary.openUploadWidget({
                    cloud_name: 'irisrpg',
                    upload_preset: 'euhody54',
                    tags: ['cover'],
                    sources: [
                        'local',
                        'url',
                    ]
                }, (error, result) => {
                    if(error) {
                        console.log(error)
                    } else {
                        var file = result[0];
                        this.form.media.profileBackground = file.public_id;
                        this.preview.profileBackground = file.secure_url;
                    }
                }); 
            },

            checkFormValidity () {
                var vueCMP = this;

                this.states.media.profileBackground = (this.form.media.profileBackground ? true : false);
                this.states.media.profilePicture = (this.form.media.profilePicture ? true : false);

                this.states.name = (this.form.name ? true : false);
                this.states.nickname = (this.form.nickname ? true : false);
                this.states.bio = (this.form.bio ? true : false);

                return (Object.values(this.states).indexOf(false) == -1);
            },
            onSubmit (evt) {
                evt.preventDefault();
                var vueCMP = this;
                if(!this.checkFormValidity()) {
                    return false;
                }
                this.loading = true;
                this.$http({
                    method: 'POST',
                    url: '/profile',
                    data: this.form
                }).then(function (response) {
                    vueCMP.loading = false;
                    if(!response.data.error) {
                        vueCMP.$emit('success', true);
                        vueCMP.$emit('hide', true);
                    } else {
                        vueCMP.$emit('error', true);
                        vueCMP.$emit('hide', true);
                    }
                }).catch(function (error) {
                    vueCMP.$emit('error', true);
                    console.error(error);
                });
            },
            onReset (evt) {
                evt.preventDefault();
                // Reset our form values
                this.form = {
                    media: {
                        profileBackground: '',
                        profilePicture: ''
                    },
                    name: '',
                    nickname: '',
                    bio: ''
                };
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                })
            }
        }
    }
</script>

<style lang="scss">
    .avatar-preview {
        img {
            height: 10rem;
            border-radius: 50%;
        }
    }
    .cover-preview {
        height: 25rem;
        background-size: cover!important;
        background-position: center!important;
        margin-bottom: 10px;
    }
</style>