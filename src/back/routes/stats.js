const express = require('express')
const router = express.Router()

const { findAll, findById, findByLessonId, getRandomRecord } = require('../lib/db')

router.get('/', (req, res) => {
	const { random, filter } = req.query

	if(random) {
		getRandomRecord(res)
	} else if (!filter) {
		findAll(res)
	} else {
		findByLessonId(filter.lesson_id, res)
	}
})

router.get('/:id', (req, res) => {
	findById(req, res)
})

module.exports = router
