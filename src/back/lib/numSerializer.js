const JSONAPISerializer = require('jsonapi-serializer').Serializer

var NumSerializer = new JSONAPISerializer('number', {
	attributes: [
		"number",
	]
})

module.exports = NumSerializer
