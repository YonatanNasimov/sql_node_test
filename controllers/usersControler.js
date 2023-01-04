const { db } = require("../db/connectDB")

exports.userCtrl = {
    getAll: (req, res) => {
        const q = "SELECT * FROM users;"
        db.query(q, (err, data) => {
            if (err) {
                return res.status(500).json("err: ", err)
            } else {
                return res.status(200).json(data)
            }
        })
    },
};