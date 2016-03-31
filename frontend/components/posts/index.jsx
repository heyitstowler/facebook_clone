var React = require('react');
var PostUtil = require('../../util/postUtil.js');
var PostStore = require('../../stores/postStore');
var PostIndexItem = require('./indexItem');

var PostIndex = React.createClass({
	getInitialState: function () {
		return({ posts: [] });
	},

	componentDidMount: function () {
		this.postListener = PostStore.addListener(this._onChange);
		PostUtil.fetchAllPosts();
	},

	_onChange: function () {
		this.setState({ posts: PostStore.all() });
	},

	render: function () {
		return(
		 <ul>
			 {this.state.posts.map(function (post) {
				 return <PostIndexItem key={post.id} post={post} />;
			 })}
		 </ul>
	 );
	}
});

module.exports = PostIndex;