const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    
category: String,
title: String,
image: String,
content: String,
description: String,
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true
});

const Blog = mongoose.model("Blog", blogSchema, "blogs"); 

module.exports = Blog;  
