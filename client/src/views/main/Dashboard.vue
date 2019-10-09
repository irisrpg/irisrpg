<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-md-12">
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
						<button class="btn btn-ghost-success btn-square sendButton"><font-awesome-icon icon="paper-plane"/></button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6" v-for="post in posts" v-bind:key="post.id">
				<Post :post="post"/>
			</div>
		</div>
	</div>
</template>

<script>
	import Post from '@/components/profile/PostItem';
	import './style.scss';

	export default {
		name: 'dashboard',
		components: {
			Post
		},
		data: () => {
			return {
				posts: []
			}
		},
		mounted: function () {
			var self = this;
			this.loadPosts(self);
		},
		methods: {
			loadPosts: (self) => {
				
			}
		}
	}
</script>