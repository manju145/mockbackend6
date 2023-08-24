const express = require("express");
const { BlogsModel } = require("../model/blogsModel");
const { auth } = require("../middleware/auth");
const BlogsRouter = express.Router();


//   created
BlogsRouter.post('/blogs',auth, async (req, res) => {
    const { username, title, content, category } = req.body;
    const newBlog = new BlogsModel({
      username,
      title,
      content,
      category,
      date: new Date(), 
      likes: 0, 
      comments: [] 
    });
    try {
      await newBlog.save();
          res.status(200).send("Blogs Created Successfully!");
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  });


//   get all data
BlogsRouter.get("/",auth, async (req, res) => {
    try {
        const blogs = await BlogsModel.find()
        res.status(200).send(blogs)
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

//   update
BlogsRouter.patch("/update/:blogsID",auth, async (req, res) => {
    const { blogsID } = req.params
    try {
        await BlogsModel.findByIdAndUpdate({ _id: blogsID }, req.body)
        res.status(200).send({ "msg": `The blog with id:${blogsID} has been updated` })
    } catch (err) {
        res.status(400).send({ "err": err.message })
    }
})

//   delete
BlogsRouter.delete("/delete/:blogsID",auth, async (req, res) => {
    const { blogsID } = req.params
    try {
        await BlogsModel.findByIdAndDelete({ _id: blogsID })
        res.status(200).send({ "msg": `The blog with id:${blogsID} has been delete` })
    } catch (err) {
        res.status(400).send({ "err": err.message });
    }
})


//   likes
BlogsRouter.patch('/likes/:blogsID/like', auth, async (req, res) => {
    const { blogsID } = req.params;
  
    try {
        await BlogsModel.findByIdAndUpdate({_id: blogsID }, { $inc: { likes: 1 } }, { new: true });
        res.status(200).send({ "msg": `The blog with id:${blogsID} has been like` })
     } catch (error) {
        res.status(400).send({ "err": err.message });
    }
  });


//   comments
  BlogsRouter.patch('/comments/:blogsID/comment', auth, async (req, res) => {
    const { blogsID } = req.params;
    const { username, content } = req.body;
     try {
  await BlogsModel.findByIdAndUpdate({_id: blogsID }, { $push: { comments: { username, content } } }, { new: true });
  res.status(200).send({ "msg": `The blog with id:${blogsID} has been comment` })
    } catch (error) {
        res.status(400).send({ "err": err.message });
    }
  });



module.exports = {
    BlogsRouter
}