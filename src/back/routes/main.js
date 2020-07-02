const express = require('express')
const router = express.Router()

const { getPostsInfo, getCategoriesInfo, getCategoryChildren } = require('../lib/db')

router.get('/', (req, res) => {
	getCategoriesInfo(res)
})

module.exports = router
