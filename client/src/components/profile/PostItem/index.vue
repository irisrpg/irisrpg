<template>
    <div id="PostItem" class="post card">
        <div class="card-header post-card-header">
            <div class="rounded-circle profile-picture" :style="'background: url(\''+post.author.media.profilePicture+'\'\)'"></div>
            <div class="post-info">
                <span class="author">
                    {{ post.author.nickname }}
                    <span class="profile_titles">
                        <span v-if="post.author.isLeader" class="badge badge-pill bg-green">Líder</span>
                        <span v-if="post.author.isCurator" class="badge badge-pill bg-green">Curador</span>
                        <span v-if="post.author.isDev" class="badge badge-pill bg-dark">Desenvolvedor</span>
                        <span v-for="title in post.author.titles" v-bind:key="title.id" :class="['badge','badge-pill','text-white','bg-'+title.class]">{{ title.name }}</span>
                    </span>
                </span>
                <span class="title">{{ post.title }}</span>
            </div>
        </div>
        <div class="card-body post-card-body">
            <div v-if="post.content" class="post-content">
                {{ post.content }}
            </div>
            <div v-if="post.media" class="post-media">
                <img :src="post.media.url" v-if="post.media.type == 'image'" class="img-fluid">
            </div>
        </div>
        <div class="card-footer post-card-footer">
            <div class="footer-actions">
                <div class="text-left">
                    <button type="button" class="btn btn-ghost-info btn-square">
                        <font-awesome-icon icon="thumbs-up"/> {{ post.counts.likes }}
                    </button>
                    <button type="button" class="btn btn-ghost-warning btn-square">
                        <font-awesome-icon icon="comments"/> {{ post.counts.comments }}
                    </button>
                    <button type="button" class="btn btn-ghost-success btn-square">
                        <font-awesome-icon icon="share-square"/> {{ post.counts.shares }}
                    </button>
                </div>
                <div class="text-right">
                    <button type="button" class="btn btn-ghost-secondary text-dark btn-square">
                        <font-awesome-icon icon="ellipsis-v"/>
                    </button>
                </div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item commentLine" v-for="comment in post.lastComments" v-bind:key="comment.id">
                    <Comment :comment="comment"/>
                </li>
                <li class="list-group-item p-0">
                    <button class="btn btn-ghost-primary btn-square"><font-awesome-icon icon="plus-square"/> See More</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Comment from './Comment';

export default {
    name: 'PostItem',
    components: {
        Comment
    },
    props: ['post'],
}
</script>

<style>
    @import url('./style.scss');
</style>