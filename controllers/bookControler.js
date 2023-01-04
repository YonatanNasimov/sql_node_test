const { db } = require("../db/connectDB")

exports.bookCtrl = {
    getAllBooks: (req, res) => {
        const q = req.body.cat
            ? "SELECT * FROM books WHERE cat = ?;"
            : "SELECT * FROM books "
        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    getBookById: (req, res) => {
        const q = "SELECT * FROM books WHERE id = ?;"
        db.query(q,[req.params.id], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    createNewBook: (req, res) => {
        const q = "INSERT INTO `books` (`title`, `desc`, `cat`) VALUES (?); ";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.cat,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json(data)
        })
    },
    deleteBook: (req, res) => {
        const q = "DELETE FROM books WHERE id = ?;"
        db.query(q,[req.params.id], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
    updateBook: (req, res) => {
        const postId =  req.params.id;
        const q = "UPDATE `test`.`books` SET `title` = ?, `desc` = ?, `cat` = ? WHERE (`id` = ?);";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.cat,
        ];
        db.query(q, [...values, postId], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    },
};