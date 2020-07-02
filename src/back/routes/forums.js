const express = require('express')
const router = express.Router()

const { getPost, getPostsInfo, getCategoryChildren } = require('../lib/db')

router.get('/', (req, res) => {
	getPostsInfo(res, "forums")
})

router.get("/ideas", (req, res) => {
	getPostsInfo(res, "forums", "ideas")
})

router.get("/startups", (req, res) => {
	getPostsInfo(res, "forums", "startups")
})

router.get("/technologies", (req, res) => {
	getPostsInfo(res, "forums", "technologies")
})

router.get("/:category/:id", (req, res) => {
	getPost(req, res)
})


module.exports = router
