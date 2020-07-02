const express = require('express')
const router = express.Router()

const { getPost, getPostsInfo, getCategoryChildren } = require('../lib/db')

router.get('/', (req, res) => {
	getPostsInfo(res, "blogs")
})

router.get("/social", (req, res) => {
	getPostsInfo(res, "blogs", "social")
})

router.get("/startups", (req, res) => {
	getPostsInfo(res, "blogs", "startups")
})

router.get("/:category/:id", (req, res) => {
	getPost(req, res)
})


module.exports = router
