const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

require('dotenv').config()

const booksRouter = require('./routes/booksRouter')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log('Server is running...')
})