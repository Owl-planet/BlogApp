const express = require("express"),
    Blog = require("../models/blogModel");
    router = express.Router();

/* let data = [
    {
        postTitle: "Israel History",
        postSubTitle: "History of Israel",
        image: "https://cdn.pixabay.com/photo/2018/08/21/11/42/tel-aviv-3621085_960_720.jpg"
    },
    {
        postTitle: "America History",
        postSubTitle: "History of America",
        image: "https://cdn.pixabay.com/photo/2015/03/26/10/04/buildings-690868_960_720.jpg"
    },
    {
        postTitle: "Italy History",
        postSubTitle: "History of Italy",
        image: "https://cdn.pixabay.com/photo/2016/12/25/22/32/gladiator-1931077_960_720.jpg"
    }
]; */

router.get("/", (request, response) => {
    Blog.find({}, (err, foundBlogs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundBlogs);
            response.render("home", {foundBlogs:foundBlogs});
        }
    });
});

router.get("/about", (request, response) => {
    response.render("about");
});

router.get("/contact", (request, response) => {
    response.render("contact");
});

router.get("/resume", (request, response) => {
    response.render("resume");
});



module.exports = router;