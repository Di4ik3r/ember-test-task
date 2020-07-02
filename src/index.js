const fs = require('fs')

const categoriesData = JSON.parse(fs.readFileSync('../data/categories.json'))
const blogsData = JSON.parse(fs.readFileSync('../data/blogs.json'))
const forumsData = JSON.parse(fs.readFileSync('../data/forums.json'))
const newsData = JSON.parse(fs.readFileSync('../data/news.json'))

const { Pool, Client } = require('pg')




async function initTables(pool) {
	// ************************************************************************************
	// *********************************** CATEGORIES ***********************************
	await pool.query(`CREATE TABLE IF NOT EXISTS categories(
		id SERIAL NOT NULL PRIMARY KEY,
		name VARCHAR(40) NOT NULL,
		alias VARCHAR(40) NOT NULL,
		type INTEGER NOT NULL
	)`)

	await pool.query(`CREATE TABLE IF NOT EXISTS category_children(
		id SERIAL NOT NULL PRIMARY KEY,
		category_id INTEGER NOT NULL,
		name VARCHAR(40) NOT NULL,
		alias VARCHAR(40) NOT NULL,
		ord INTEGER,
		FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
	)`)

	// ************************************************************************************
	// *********************************** BLOGS ***********************************
	// await pool.query(`CREATE TABLE IF NOT EXISTS blogs(
	// 	id SERIAL NOT NULL PRIMARY KEY,
	// 	title VARCHAR(60) NOT NULL,
	// 	body TEXT NOT NULL,
	// 	category INTEGER NOT NULL,
	// 	FOREIGN KEY (category) REFERENCES category_children (id) ON DELETE CASCADE
	// )`)

	// ************************************************************************************
	// *********************************** FORUMS ***********************************
	// await pool.query(`CREATE TABLE IF NOT EXISTS forums(
	// 	id SERIAL NOT NULL PRIMARY KEY,
	// 	title VARCHAR(60) NOT NULL,
	// 	body TEXT NOT NULL,
	// 	category INTEGER NOT NULL,
	// 	FOREIGN KEY (category) REFERENCES category_children (id) ON DELETE CASCADE
	// )`)

	// ************************************************************************************
	// *********************************** POSTS ***********************************
	await pool.query(`CREATE TABLE IF NOT EXISTS posts(
		id SERIAL NOT NULL PRIMARY KEY,
		category INTEGER NOT NULL,
		category_child INTEGER NOT NULL,
		title VARCHAR(100) NOT NULL,
		body TEXT NOT NULL,
		date DATE NOT NULL,
		FOREIGN KEY (category_child) REFERENCES category_children (id) ON DELETE CASCADE,
		FOREIGN KEY (category) REFERENCES categories (id) ON DELETE CASCADE
	)`)
	
	await pool.query("DELETE FROM categories")
	await pool.query("DELETE FROM category_children")
	await pool.query("DELETE FROM posts")
}


async function fillData(pool) {
	// ************************************************************************************
	// *********************************** CATEGORIES ***********************************
	for(let obj of categoriesData) {
		const query = `INSERT INTO categories(name, alias, type) VALUES('${obj.name}', '${obj.alias}', ${obj.type})`
		await pool.query(query)
		
		const id = (await pool.query(`SELECT id from categories WHERE name = '${obj.name}' AND type = ${obj.type}`)).rows[0].id
		for (let child of obj.children) {
			await pool.query(`INSERT INTO category_children(category_id, name, alias, ord) VALUES(${id}, '${child.name}', '${child.alias}', ${child.ord})`)
		}
	}
	
	await insertPosts(pool, blogsData, "blogs")
	await insertPosts(pool, newsData, "news")
	await insertPosts(pool, forumsData, "forums")


	// ************************************************************************************
	// *********************************** BLOGS ***********************************
	// for(let obj of blogsData) {
	// 	const category = (await pool.query(`SELECT id FROM categories WHERE alias = 'blogs'`)).rows[0].id
	// 	const categoryChild = (await pool.query(`SELECT id FROM category_children WHERE category_id = ${category} AND alias = '${obj.category}'`)).rows[0].id
	// 	await pool.query(`INSERT INTO posts(category, category_child, title, body) VALUES(${category}, ${categoryChild}, '${obj.title}', '${obj.body}')`)
	// }

	// ************************************************************************************
	// *********************************** NEWS ***********************************
	// for(let obj of newsData) {
	// 	const news = (await pool.query(`SELECT id FROM categories WHERE alias = 'news'`)).rows[0].id
	// 	const newsChild = (await pool.query(`SELECT id FROM category_children WHERE category_id = ${news} AND alias = '${obj.category}'`)).rows[0].id
	// 	console.log(news, newsChild, obj.category)
	// 	await pool.query(`INSERT INTO posts(category, category_child, title, body) VALUES(${news}, ${newsChild}, '${obj.title}', '${obj.body}')`)
	// }
}


async function writeData() {
	const pool = new Pool({
		user: "user1",
		password: "pass1",
		host: "localhost",
		database: "testdb",
		port: 5432,
	})

	await initTables(pool)
	await fillData(pool)

	await pool.end()
}


writeData()


async function insertPosts(pool, data, alias) {
	for(let obj of data) {
		const id = (await pool.query(`SELECT id FROM categories WHERE alias = '${alias}'`)).rows[0].id
		const idChild = (await pool.query(`SELECT id FROM category_children WHERE category_id = ${id} AND alias = '${obj.category}'`)).rows[0].id
		// randomDate()
		await pool.query(`INSERT INTO posts(category, category_child, title, body, date) VALUES(${id}, ${idChild}, '${obj.title}', '${obj.body}', to_timestamp(${randomDate()} / 1000.0))`)
	}
}

function randomInteger(min, max) {
	let rand = min + Math.random() * (max - min);
	const result = Math.floor(rand)
  return result;
}

function randomDate() {
	const date = (new Date()).getTime()
	const offseted = date + randomInteger(-999999999999, 1)
	console.log(offseted, new Date(offseted))
	return offseted
}