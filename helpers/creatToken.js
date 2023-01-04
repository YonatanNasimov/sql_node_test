const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = (id) => {
    let token = jwt.sign({id},process.env.token,{expiresIn:"29d"});
    return token
  }
  