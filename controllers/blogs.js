const Blog = require('../models/blog')

module.exports = {
	getAllPosts,
	getOnePost,
	createPost,
	deletePost
}

function deletePost(req, res) {
	Blog.findByIdAndRemove(req.params.id)
		.then(function(blog) {
			res.status(200).json(blog)
		})
		.catch(error => console.error(error))
}

//changed this to a put and added edit functionality
function getOnePost(req, res) {
	const { post, author, title } = req.body
	Blog.findById(req.params.id)
		.then(oldPost => {
			oldPost.post = post
			oldPost.title = title
			oldPost.author = author
			oldPost.save()
			return oldPost
		})
		.then(newPost => {
			res.status(200).json(newPost)
		})
		.catch(error => console.error(error))
}

function createPost(req, res) {
	Blog.create(req.body)
		.then(function(post) {
			res.status(201).json(post)
		})
		.catch(error => console.error(error))
}

function getAllPosts(req, res) {
	Blog.find({})
		.then(function(posts) {
			res.status(200).json(posts)
		})
		.catch(error => console.error(error))
}
