// install express, ejs, mongoose, dotenv ('npm i express ejs mongoose dotenv' in the terminal)
// create .gitignore and .env

//import dotenv
const dotenv = require('dotenv');
dotenv.config();

//import express
const express = require('express');


//import mongoose
const mongoose = require('mongoose');

const app = express();

//import morgan and method-override so we can use their middleware, so we can DELETE
const methodOverride = require("method-override");
const morgan = require("morgan");

// get port from .env file, if doesn't exist use 3000
const PORT = process.env.PORT || 3000;

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB, and the name of the database is ${mongoose.connection.name}.`);
});

// import model from blogmodel.js to get 'Blogdata' ('Blogdata' is exported in blogmodels.js)
const Blogdata = require("./models/blogmodel");

//middleware to use .body (always with .use)
app.use(express.urlencoded({ extended: false }));
//middleware for deleting
app.use(methodOverride("_method"));
// app.use(morgan("dev"));


// build route to index.ejs (it will search automatically in the 'views' folder)
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

// READ - Show the new blog form
app.get("/blogs/new", (req, res) => {
    res.render("blogs/new.ejs");
  });
  
// CREATE a new blog (POST)
app.post("/", async (req, res) => {
    console.log(req.body);

    await Blogdata.create(req.body);
    res.redirect("/blogs"); //go to the blog list page ('/blogs')after submited
  });

// READ - show all of the posted blogs
app.get('/blogs', async (req, res) => {
    const allBlogs = await Blogdata.find()
    res.render('blogs/blogs.ejs',{allBlogs: allBlogs});
  });

// READ - show the selected blog 
app.get("/blogs/:blogId", async (req, res) => {
    const blog = await Blogdata.findById(req.params.blogId)
    res.render("blogs/show.ejs", {blog: blog})
  });

//DELETE - delete the selected blog
app.delete("/blogs/:blogId", async (req, res) => {
    console.log(req.params.blogId);
    await Blogdata.findByIdAndDelete(req.params.blogId);
    // res.send("The blog is deleted");
    res.redirect("/blogs");
  });

// READ - show the selected blog to get ready for UPDATE
app.get("/blogs/:blogId/edit", async (req, res) => {
    const foundBlog = await Blogdata.findById(req.params.blogId);
    res.render("blogs/edit.ejs", {
      blog: foundBlog,
    });
  });
  
//UPDATE
app.put("/blogs/:blogId", async (req, res) => {
    // Update the blog in the database
    await Blogdata.findByIdAndUpdate(req.params.blogId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/blogs/${req.params.blogId}`);
  });
  

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
