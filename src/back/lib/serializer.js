const JSONAPISerializer = require('jsonapi-serializer').Serializer

var StatSerializer = new JSONAPISerializer('statistic', {
	attributes: [
		'lesson_id',
		'event_type',
		'note',
		'user_agent',
		'stats',
		'created_at',
		'updated_at',
	],
})

module.exports = StatSerializer
