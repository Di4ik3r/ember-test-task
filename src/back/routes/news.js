const express = require('express')
const router = express.Router()

const { getPost, getPostsInfo, getCategoryChildren } = require('../lib/db')

router.get('/', (req, res) => {
	getPostsInfo(res, "news")
})

router.get("/design", (req, res) => {
	getPostsInfo(res, "news", "design")
})

router.get("/culture", (req, res) => {
	getPostsInfo(res, "news", "culture")
})

router.get("/business", (req, res) => {
	getPostsInfo(res, "news", "business")
})

router.get("/:category/:id", (req, res) => {
	getPost(req, res)
})


module.exports = router
