import express from "express";
import { getUsers,getUserName, addUser,updateUserById, deleteUserById, login } from "../Controller/userController.js";

const userRouter = express.Router()

userRouter.get('/',getUsers)// get all userss 

 userRouter.get('/username/:username',getUserName) // find one using with id 
 userRouter.post('/',addUser)
 userRouter.post('/login',login)
 userRouter.patch("/:id",updateUserById)
 userRouter.delete("/:id",deleteUserById)


export default userRouter


// pasport => athentication
// jwt => atheration