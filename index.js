const mongoose = require("mongoose"),
    express = require("express"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    User = require("./models/userModel"),
    bodyParser = require("body-parser"),
    app = express();

// Routes

const indexRoutes = require("./routes/indexRoutes"),
    adminRoutes = require("./routes/adminRoutes"),
    blogRoutes = require("./routes/blogRoutes");

// App Config
mongoose.connect("mongodb://localhost/BlogApp", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Config
app.use(require("express-session")({
    secret: "bu bizim guvenlik cumlemizdir",
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Shara current user info within all routes

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes Using

app.use(indexRoutes);
app.use(adminRoutes);
app.use(blogRoutes);

// Server

const server = app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("App started on http://localhost:3000/ :)");
    }
});