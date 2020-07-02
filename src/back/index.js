


(async() => {

  const express = require('express')
  const cors = require('cors')
  const bodyParser = require('body-parser')


  const app = express()

  const { Pool } = require('pg')

  const pool = new Pool({
		user: "user1",
		password: "pass1",
		host: "localhost",
		database: "testdb",
		port: 5432,
	})
  
  module.exports = pool;

  pool.connect(async(err, client, done) => {
      
    
    const mainRouter = require('./routes/main')
    const blogsRouter = require('./routes/blogs')
    const forumsRouter = require('./routes/forums')
    const newsRouter = require('./routes/news')
    
    
    app.use(cors())
    app.use(bodyParser.json())
  
    app.use('/', mainRouter)
    app.use('/blogs', blogsRouter)
    app.use('/forums', forumsRouter)
    app.use('/news', newsRouter)
    
    app.listen(3001, console.log('Listening on port 3001...'))
  })

})()
