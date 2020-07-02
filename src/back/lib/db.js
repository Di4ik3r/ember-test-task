// const StatSerializer = require('../lib/serializer')

const pool = require('../index')
const { idPool } = require("../index")



const getPost = async(req, res) => {
  const { id, category } = req.params

  pool.connect(async(err, client, done) => {
    const check = (await client.query(`SELECT id FROM category_children WHERE alias = '${category}'`)).rows
    if (check.length == 0) {
      res.send({})
      done()
      return
    }
    const post = (await client.query(`SELECT * FROM posts WHERE id = ${id} and category_child = ${check[0].id}`)).rows[0]
    if(!post)  {
      res.send({})
      done()
      return
    }
    const categoryChild = (await client.query(`SELECT alias FROM category_children WHERE id = ${post.category_child}`)).rows[0].alias
    post.categoryChild = categoryChild
    res.send(post)
    done()
    
  })
}

const getPostsInfo = async(res, alias, child = "") => {
  pool.connect(async(err, client, done) => {
    var result = []
    const categoryId = (await client.query(`SELECT id FROM categories WHERE alias = '${alias}'`)).rows[0].id
    let categoryChildId = -1
    if (child != "") {
      categoryChildId = (await client.query(`SELECT id FROM category_children WHERE category_id = ${categoryId} AND alias = '${child}'`)).rows[0].id
    }
    
    let query = `SELECT * FROM posts WHERE category = ${categoryId}` 
    if(categoryChildId != -1) {
      query += ` AND category_child = ${categoryChildId}`
    }

    client.query(query)
    .then(async(posts) => {
      for (let post of posts.rows) {
        const categoryChild = (await client.query(`SELECT alias FROM category_children WHERE id = ${post.category_child}`)).rows[0].alias
        post.categoryChild = categoryChild
        result.push({post})
      }
      res.send(result)
      done()
    })
    .catch(e => console.error(e.stack))
    
  })
}


const getCategoriesInfo = async(res) => {
  pool.connect(async(err, client, done) => {
    var result = []
    client.query(`SELECT * FROM categories`)
    .then(async(categories) => {
      for (let category of categories.rows) {
        const children = (await client.query(`select * from category_children where category_id = ${category.id}`)).rows
        result.push({
          category,
          children,
        })
      }
      
      res.send(result)
      done()
    })
    
    // .then((result) => {
    //   // console.log(result)

    //   res.send(result.rows)
    //   done()
    // })
    // .catch(e => console.error(e.stack))
  })
}

const getCategoryChildren = async(res, categoryId) => {
  pool.connect((err, client, done) => {
    client.query(`select * from category_children where category_id = ${categoryId}`)
    .then((result) => {
      // console.log(result)
      res.send(result.rows)
      done()
    })
    .catch(e => console.error(e.stack))
  })
}





// asdkjasdklas;ldk lkadjaskljd askldjkla sjdakls jdklasjd asd 3ilu d23od uias ukl4e8djni

const findAll = (res) => {
  pool.connect((err, client, done) => {
    client
      .query('select * from lesson_statistics limit 1000;')
      .then((result) => {
        var stats = StatSerializer.serialize(result.rows)
        res.send(stats)
        //res.send(config.get('all-data'))
        done()
      })
      .catch((e) => console.error(e.stack))

    if (err) {
      return console.error('Error running query', err)
    }
  })
}

const findById = (req, res) => {
  const { id } = req.params

  pool.connect((err, client, done) => {
    client
      .query(`select * from lesson_statistics where id = ${id}`)
      .then((result) => {
        var stats = StatSerializer.serialize(result.rows)
        const obj = {
          data: stats.data[0],
        }
        res.send(obj)
        //res.send(config.get('single-data'))
        done()
      })
      .catch((e) => console.error(e.stack))

    if (err) {
      return console.error('Error running query', err)
    }
  })
}

const findByLessonId = (lesson_id, res) => {
  //   res.send({
  //     data: config.get('all-data').data.filter((item) => {
  //       return item.attributes['lesson-id'] == lesson_id
  //     }),
  //   })
  pool.connect((err, client, done) => {
    client
      .query(`select * from lesson_statistics where lesson_id = ${lesson_id}`)
      .then((result) => {
        var stats = StatSerializer.serialize(result.rows)
        res.send(stats)
        done()
      })
      .catch((e) => console.error(e.stack))

    if (err) {
      return console.error('Error running query', err)
    }
  })
}

const getRandomRecord = (res) => {
  pool.connect((err, client, done) => {
    client
      .query('select * from lesson_statistics limit 1000;')
      .then((result) => {
        let randomId = idPool[randomInteger(0, idPool.length-1)]
        // console.log(idPool.length)
        findByLessonId(randomId, res)
        // res.send(lesson)
        // var stats = StatSerializer.serialize(result.rows)
        // res.send(stats)
        //res.send(config.get('all-data'))
        done()
      })
      .catch((e) => console.error(e.stack))

    if (err) {
      return console.error('Error running query', err)
    }
  })
}


function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

module.exports = { getPost, getPostsInfo, getCategoriesInfo, getCategoryChildren }
