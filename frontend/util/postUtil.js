var ApiUtil = require('./apiUtil');
var PostActions = require('../actions/postActions');

console.log("Loaded PostUtil!");

var PostUtil = {
	// getCurrentUser: function () {
	//
	// },
	fetchAllPosts: function() {
		ApiUtil.ajax({
			url: "/api/posts",
			method: "GET",
			success: function (posts) { AuthActions.receiveAllPosts(posts); },
			error: function (response) { console.log("FAILURE\n" + response); },
		});
	},

	tryCreatePost: function (formData) {
		ApiUtil.ajax({
			url: "/api/posts",
			method: "POST",
			form: true,
			data: formData,
			contentType: false,
			processData: false,
			success: function (post) { AuthActions.receiveSinglePost(post); },
			error: function (response) { console.log("FAILURE\n" + response); },
		});
	},

	deletePost: function (id) {
		ApiUtil.ajax({
			url: "/api/posts/" + id,
			method: "DELETE",
			success: function (post) { PostActions.postDeleted(_obj); },
			error: function (response) { console.log("FAILURE\n" + response); },
		});
	}
};

module.exports = PostUtil;