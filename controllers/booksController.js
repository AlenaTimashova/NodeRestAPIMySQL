const pool = require('../database/database')

const booksController = {

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query('select * from books')
            res.json({data: rows})
        } catch (error) {
            console.log(error)
            res.json({status: error})
        }
    },

    getById: async (req, res) => {
        try {
            const {id} = req.params
            const [rows, fields] = await pool.query('select * from books where id = ?', [id])
            res.json({
                data: rows
            })

        } catch (error) {
            console.log(error)
            res.json({status: error})
        }
    },

    create: async (req, res) => {
        try {
            const {title, author} = req.body
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            let createdAtDate = `${year}-${month}-${day}`;
            const sql = `insert into books (title, author, added_at) values (?, ?, '${createdAtDate}')`
            const [rows, fields] = await pool.query(sql, [title, author, createdAtDate])
            res.json({data: rows})

        } catch (error) {
            console.log(error)
            res.json({status: error})
        }
    },

    update: async (req, res) => {
        try {
            const {title, author} = req.body
            const {id} = req.params
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let createdAtDate = `${year}-${month}-${day}`;

            const sql = `update books set title = ?, author = ?, added_at = '${createdAtDate}' where id = ?`
            const [rows, fields] = await pool.query(sql, [title, author, id])
            res.json({data: rows})

        } catch (error) {
            console.log(error)
            res.json({status: error})
        }
    },

    delete: async (req, res) => {
        try {
            const {id} = req.params;
            const [rows, fields] = await  pool.query('delete from books where id = ?', [id])
            res.json({data: rows})

        } catch (error) {
            console.log(error);
            res.json({status: error});
        }
    }
}

module.exports = booksController;