const express = require('express')
const mysql = require('mysql')
const colors = require('colors')
const cors = require('cors')


port = 8082
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

// connection to Mysql.

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "testeur"
})


app.get('/', (req, res) => {
    res.json({ message: 'welcome to our API REST' })
})

app.get('/api/v1/books', (req, res) => {
    const books = "SELECT * FROM books"
    db.query(books, (err, data) => {
        // if(err) return res.json(err)
        // return res.json(data)
        if (err) throw err
        return res.json(data)

    })
} )

// POST => Enregistrer des livres dans la BDD.
app.post('/api/v1/books', (req, res) => {
    const sql = 'INSERT INTO books(`title`,`description`,`cover`)VALUES(?)';
    const values = [req.body.title,
                    req.body.description,
                    req.body.cover]

    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// DELETE => Supprimer un livre dans la BDD.
app.delete('/api/v1/book/:id',(req,res)=>{
    const bookId=req.params.id;
    const sql="DELETE FROM books WHERE id=?"

    db.query(sql, [bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})



// Put => Modifier un livre dans la BDD.
app.put("/api/v1/book/:id",(req,res)=>{
    const bookId=req.params.id;
    const sql="UPDATE books SET `title`=?, `description`=?, `cover`=? WHERE id=?";

    const values=[
        req.body.title,
        req.body.description,
        req.body.cover
    ]

    db.query(sql, [...values, bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})



app.listen(port, () => {
    console.log(`Serveur lancer sur le port:${port}`.underline.cyan)
})
