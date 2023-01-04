const indexR = require("./indexs")
const usersR = require("./users")
const booksR = require("./books")
const authR = require("./auth")


exports.routesInit = (app) => {
    app.use("/", indexR)
    app.use("/users", usersR)
    app.use("/books", booksR)
    app.use("/auth", authR)
}

