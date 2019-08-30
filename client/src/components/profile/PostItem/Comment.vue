<template>
    <div>
        <div class="post-card-header">
            <div class="rounded-circle profile-picture" :style="'background: url(\''+comment.author.media.profilePicture+'\'\)'"></div>
            <div class="post-info">
                <span class="author">
                    {{ comment.author.nickname }}
                    <span class="profile_titles">
                        <span v-if="comment.author.isLeader" class="badge badge-pill bg-green">Líder</span>
                        <span v-if="comment.author.isCurator" class="badge badge-pill bg-green">Curador</span>
                        <span v-if="comment.author.isDev" class="badge badge-pill bg-dark">Desenvolvedor</span>
                        <span v-for="title in comment.author.titles" :class="['badge','badge-pill','bg-'+title.class,'text-white']">{{ title.name }}</span>
                    </span>
                </span>
                <span class="comment">{{ comment.comment }}</span>
            </div>
        </div>
        <div class="footer-actions">
            <div class="text-left">
                <button type="button" class="btn btn-ghost-info btn-square">
                    <font-awesome-icon icon="thumbs-up"/> {{ comment.likes }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comment',
    props: ['comment'],
}
</script>

<style>
    @import url('./style.comment.scss');
</style>