const mongoose = require('mongoose');
const express = require('express');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    topic: {
        type: String,
        require: true,
    },

    content: {
        type: String,
        require: true,
    },

    words: {
        type: Number,
    },

    authorFirstName: {
        type: String,
    },

    authorLastName: {
        type: String,
    },

    email: {
        type: String,
    },

    phone: {
        type: Number,
    },

    postdate: 
        {
        type: Date, 
        default:Date.now,
    },
     
    image: {
        data: Buffer,
        contentType: String,
    },
});

const Blogdata = mongoose.model('blogcollection',blogSchema);
// 'blogcollection' is the collection under the database. And store it into const Blogdata (first letter should be in capital for database name) 

module.exports = Blogdata;