import PostModel from  "../Models/postModel.js";
import mongoose from "mongoose";

export const createPost = async(req, res)=>{
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(500).json(error);
  }
  
}

export const getPost = async(req,res)=>{
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updatePost = async(req,res)=>{
  const postId = req.params.id;
  const {userId} = req.body;

  try {
    const post = await PostModel.findById(postId);
    if(post.userId === userId){
      await post.updateOne({$set: req.body});
      res.status(200).json("Post updated")
    }
    else {
      res.status(403).json("Action forbiden")
    }
  } catch (error) {
    res.status(500).json(error)

  }
}

export const deletePost = async(req,res)=>{
  const id = req.params.id ;
  const {userId} = req.body;

  try {
    const post = await PostModel.findById(id);7
    if(post.userId === userId){
       await post.deleteOne();
       res.status(200).json("Post deleted successfully")
    }
  } catch (error) {
    res.status(500).json(error)

  }
}