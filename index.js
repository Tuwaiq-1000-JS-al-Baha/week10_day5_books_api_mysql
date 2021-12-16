const express = require("express")
const mysql = require("mysql2/promise")

const app = express()

app.use(express.json())

app.post("/api/authors", async (req, res) => {
  const { firstName, lastName, photo } = req.body
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "booksDB",
  })
  const [rows, fields] = await connection.query(
    `INSERT INTO Authors (first_name, last_name, photo)
     VALUES ("${firstName}", "${lastName}", "${photo}")`
  )
  console.log(fields)
  console.log(rows)
  res.json("author added")
})

app.get("/api/authors", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "booksDB",
  })
  const [rows, fields] = await connection.query(`SELECT * FROM Authors`)
  console.log(fields)
  console.log(rows)
  res.json(rows)
})

app.post("/api/books", async (req, res) => {
  const { title, description, photo, authorId } = req.body
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "booksDB",
  })
  const [rows, fields] = await connection.query(
    `INSERT INTO Books (title, description, photo, author_id)
       VALUES (?, ?, ?, ?)`,
    [title, description, photo, authorId]
  )
  console.log(fields)
  console.log(rows)
  res.json("book added")
})

app.get("/api/books", async (req, res) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "booksDB",
  })
  const [rows, fields] = await connection.query(
    `SELECT title, description, first_name AS author_name FROM Books JOIN Authors ON Authors.id = Books.author_id`
  )
  console.log(fields)
  console.log(rows)
  res.json(rows)
})

app.listen(5000, () => console.log("server listening on port 5000"))
