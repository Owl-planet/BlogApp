const express = require("express"),
    passport = require("passport"),
    User = require("../models/userModel"),
    router = express.Router();

let adminActions = [
    {
        actionId: 1,
        actionName: "changeHomeImage",
        displayName: "Change Home Image"
    },
    {
        actionId: 2,
        actionName: "changeAboutImage",
        displayName: "Change About Image"
    },
    {
        actionId: 3,
        actionName: "changeAboutText",
        displayName: "Change About Text"
    },
    {
        actionId: 4,
        actionName: "addNewBlog",
        displayName: "Add new blog"
    },
    {
        actionId: 5,
        actionName: "listAllBlogs",
        displayName: "List all blogs"
    }
];

router.get("/admin", isLoggedIn, (req, res) => {
    res.render("admin/admin", { adminActions: adminActions });
});
router.get("/signin", (request, response) => {
    response.render("admin/signin");
});

router.post("/signin", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect:"/signin"
    }), (req, res) => {});

router.get("/signup", isLoggedIn, (request, response) => {
    response.render("admin/signup");
});

router.post("/signup", isLoggedIn, (req, res) => {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/");
        });
    });
});

router.get("/signout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/signin");
    }
}

module.exports = router;