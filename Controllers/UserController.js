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