import { constants } from "fs";
import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"


export const getUser = async(req, res)=>{
  const id = req.params.id;

  try {
    const  user = await UserModel.findById(id);

    if(user){
      const {password,...details} = user._doc
      res.status(200).json(details);
    }
    else{
      res.status(404).json('The user does not exist');
    }
  } catch (error) {
     res.status(500).json(error)
  }
}

//Updating a user 

export const  updateUser = async(req, res)=> {
  const id = req.params.id;
  const {currentUserId, currentUserAdminStatus,password} = req.body;

  if(id === currentUserId || currentUserAdminStatus){
    try {

      if(password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password,salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body,{new: true});
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  } 
  else{
    res.status(403).json("Access Denied!")
  }
}

//Delete

export const deleteUser = async(req, res)=>{
  const id = req.params.id

  const {currentUserId, currentUserAdminStatus}= req.body;

  if(currentUserId === id || currentUserAdminStatus) {
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("Deleted successfully")
    } catch (error) {
      res.status(500).json(error)
    }
  }
  else{
    res.status(403).json("Access Denied!")
  }
}

//Flowing another user 
export const followUser = async(req, res)=>{
  const id = req.params.id;

  const {currentUserId} = req.body

  if(currentUserId = id){
    res.status(403).json("Action forbidden");
  }
  else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if(!followUser.followers.incluse(currentUserId)){
        await followUser.updateOne({$push : {followers: currentUserId}});
        await followingUser.updateOne({$push : {following: id}});
        res.status(200).json("User followed!")
      }
      else {
        res.status(403).json("You already follow this user")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

//UnFlowing a user 
export const unfollowUser = async(req, res)=>{
  const id = req.params.id;

  const {currentUserId} = req.body

  if(currentUserId = id){
    res.status(403).json("Action forbidden");
  }
  else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if(followUser.followers.incluse(currentUserId)){
        await followUser.updateOne({$pull : {followers: currentUserId}});
        await followingUser.updateOne({$pull : {following: id}});
        res.status(200).json("User Unfollowed!")
      }
      else {
        res.status(403).json("You don't  follow this user")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
