const express = require("express");
const router = express.Router();
const { Blog, Contact, Category } = require("../models/model")
const multer = require("multer");
const imageUpload = require("../helpers/image-upload");
const upload = multer({ dest: 'uploads/' })

router.get("/", (req, res) => {
    res.render("admin/home_admin")
})


router.get("/contact", async (req, res) => {
    const contacts = await Contact.findAll();
    res.render("admin/contact", {
        contact: contacts
    })
});

router.get("/contact/:contactId", async (req, res) => {
    const id = req.params.contactId;
    const contact = await Contact.findByPk(id)
    res.render("admin/contact_single", {
        contact: contact
    })
})




router.get("/contact/delete/:contactId", async (req, res) => {
    const contact = await Contact.findByPk(req.params.contactId)
    res.render("admin/contact_delete", {
        contact: contact
    })
})

router.post("/contact/delete/:contactId", async (req, res) => {
    const contact = await Contact.findByPk(req.params.contactId);
    if (contact) {
        contact.destroy();
        res.redirect("/admin/contact")
    } else {
        console.log("Message tapylmady")
    }
})


router.get("/blog", async (req, res) => {
    const blogs = await Blog.findAll({ include: Category });
    res.render("admin/blogs", {
        bloglar: blogs
    })
})

router.get("/blog-add", async (req, res) => {
    const category = await Category.findAll();
    res.render("admin/blog-add", {
        categories: category
    })
})

router.post("/blog-add", imageUpload.upload.single("blog_img"), async (req, res) => {
    try {
        const blog = await Blog.create({
            title: req.body.title,
            description: req.body.description,
            categoryId: req.body.categoryId,
            blog_img: req.file.filename
        })
        res.redirect("/admin/blog");
    } catch (err) {
        console.log(err)
    }
})

router.get("/blog/:blogId", async (req, res) => {
    const id = req.params.blogId;
    const blog = await Blog.findByPk(id)
    res.render("admin/blog-single", {
        blog: blog
    })
})

router.post("/blog/edit/:blogId", async (req, res) => {
    const blog = await Blog.findByPk(req.params.blogId);
    if (blog) {
        blog.title = req.body.title,
            blog.description = req.body.description,
            blog.categoryId = req.body.categoryId,
            blog.save()

        res.redirect("/admin/blog")
    }
})

router.get("/blog/edit/:blogId", async (req, res) => {
    const id = req.params.blogId;
    const blog = await Blog.findOne({ 
        include: Category,
        where: { id: id }
     })
    const categories = await Category.findAll();
    res.render("admin/blog-edit", {
        blog: blog,
        categories: categories
    })
})

router.get("/blog/delete/:blogId", async (req, res) => {
    const blog = await Blog.findByPk(req.params.blogId)
    res.render("admin/blog_delete", {
        blog: blog
    })
})

router.post("/blog/delete/:blogId", async (req, res) => {
    const blog = await Blog.findByPk(req.params.blogId);
    if (blog) {
        blog.destroy();
        res.redirect("/admin/blog")
    } else {
        console.log("Blog tapylmady")
    }
})



router.get("/category", async (req, res) => {
    const category = await Category.findAll();
    res.render("admin/categories", {
        category: category
    })
});


router.get("/category-add", (req, res) => {
    res.render("admin/category-add")
})

router.post("/category-add", async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name
        })
        res.redirect("/admin/category");
    } catch (err) {
        console.log(err)
    }
})

router.get("/category/:categoryId", async (req, res) => {
    const id = req.params.categoryId;
    const category = await Category.findByPk(id)
    res.render("admin/category_single", {
        category: category
    })
})

router.get("/category/delete/:categoryId", async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId)
    res.render("admin/category_delete", {
        category: category
    })
})

router.post("/category/delete/:categoryId", async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId);
    if (category) {
        category.destroy();
        res.redirect("/admin/category")
    } else {
        console.log("Category tapylmady")
    }
})


module.exports = router;