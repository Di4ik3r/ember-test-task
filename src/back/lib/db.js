// const StatSerializer = require('../lib/serializer')

const pool = require('../index')



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
  })
}

const getCategoryChildren = async(res, categoryId) => {
  pool.connect((err, client, done) => {
    client.query(`select * from category_children where category_id = ${categoryId}`)
    .then((result) => {
      res.send(result.rows)
      done()
    })
    .catch(e => console.error(e.stack))
  })
}


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

module.exports = { getPost, getPostsInfo, getCategoriesInfo, getCategoryChildren }
