const express = require("express");
const router = express.Router();
const { User } = require("../models/model");
const bcrypt = require("bcrypt")

const AuthController = require("../controllers/auth.controller")

router.get("/register", AuthController.register )

router.post("/register", async (req, res) => {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (user) {
        res.redirect("/auth/login")
    } else {
        const register = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/auth/login")
    }
})


router.get("/login", (req,res)=>{
    res.render("auth/login")
})

router.post("/login", async (req,res)=>{
    const user = await User.findOne({
        where: {email: req.body.email}
    })
    if(!user){
        res.render("auth/login")
    } else {
        const pass = await bcrypt.compare(req.body.password, user.password)
        // res.cookie("isAuth", 1)
        req.session.isAuth = true;
        req.session.username = user.username;
        res.redirect("/")
    }
})

module.exports = router;