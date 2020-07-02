


(async() => {

  const express = require('express')
  const cors = require('cors')
  const bodyParser = require('body-parser')



  const app = express()

  // const config = require('config')
  const { Pool } = require('pg')
  // const connectionString = config.get('connectionString')

  const pool = new Pool({
		user: "user1",
		password: "pass1",
		host: "localhost",
		database: "testdb",
		port: 5432,
	})
  
  module.exports = pool;

  // const NumSerializer = require('./lib/numSerializer')
  pool.connect(async(err, client, done) => {
    // let promise = client
      // .query(`select lesson_id as "number" from lesson_statistics where stats is not null group by lesson_id limit 1000`)
      // .then(async(result) => {
        // let buff = NumSerializer.serialize(result.rows)
        
        // let arr = []
        // for(let name of buff.data) {
        //   arr.push(name.attributes.number)
        // }
        // idPool = arr
        // console.log(idPool.length)

        // done()
        // return idPool
      // })
      // .catch((e) => console.error(e.stack))

    // if (err) {
    //   return console.error('Error running query', err)
    // }


      // module.exports.idPool = await generateRandomPool(pool)
    // module.exports.idPool = await promise
      
    
    // const statsRoute = require('./routes/stats')
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

    // app.get('/', (req, res) => {
    //   res.send('Home page')
    // })
    
    app.listen(3001, console.log('Listening on port 3001...'))
  })

  // let idPool = [490024, 536360, 733237, 666361, 439741, 674291, 347631]
  
  

})()
