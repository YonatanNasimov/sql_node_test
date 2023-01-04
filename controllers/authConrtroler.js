const { db } = require("../db/connectDB");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/creatToken");

exports.authCtrl = {
    signup: (req, res) => {
        // first check if the email and usernsme are uniq
        const q = "SELECT * FROM `test`.`users` WHERE email = ? OR username = ?";

        db.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.json(err);
            if (data.length) return res.status(409).json({ msg: "user alredy exists." });

            // hash the password and create user
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const q = "INSERT INTO `test`.`users` (`username`, `email`, `password`) VALUES (?);";
            const values = [req.body.username, req.body.email, hash];

            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.json(200).json("user has been created.");
            });
        })
    },
    login: (req, res) => {
        // check user
        const q = "SELECT * FROM `test`.`users` WHERE username = ?"
        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.json(err);
            if (data.length === 0) return res.status(404).json("User not found");

            // chech password
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

            const token = createToken(data[0].id);
            const { password, ...other } = data[0];

            // res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({...other,token});
        })
    },
    logout: (req, res) => {
        res.clearCookie("access_token", {
            sameSite:"none",
            secure:true
        }).status(200).json("User has been Logged Out")
    },
};