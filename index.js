const express = require("express")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const ejs = require("ejs")
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.son())
app.use(express.urlencoded())

const sequelize = require("./data/db")

const HomeRouter = require("./routes/home.router")
const AdminRouter = require("./routes/admin.router")


app.use("/", HomeRouter)
app.use("/admin", AdminRouter)


app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})