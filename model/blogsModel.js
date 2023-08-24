const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
username:{type:String,required:true},
title:{type:String,required:true},
content:{type:String,required:true},
category:{type:String,required:true},
date:{type:Date,required:true},
likes:{type:String,required:true},
comments: [{
    username: String,
    content: String
  }],
},{
    versionKey:false
})


const BlogsModel= mongoose.model("blogs",blogSchema)

module.exports={
    BlogsModel
}


