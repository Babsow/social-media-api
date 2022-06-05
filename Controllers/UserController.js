import { constants } from "fs";
import UserModel from "../Models/userModel.js";



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
      const user = await UserModel.findByIdAndUpdate(id, req.body,{new: true});
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}