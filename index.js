const express = require("express")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const ejs = require("ejs")
const cookiee = require("cookie-parser")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookiee());

const sequelize = require("./data/db")

const HomeRouter = require("./routes/home.router")
const AdminRouter = require("./routes/admin.router")
const AuthRouter = require("./routes/auth.router");
const cookieParser = require("cookie-parser");


app.use("/", HomeRouter)
app.use("/admin", AdminRouter)
app.use("/auth", AuthRouter)


app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})