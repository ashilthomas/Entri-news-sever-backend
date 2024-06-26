import Post from "../models/postModel.js";

import path from 'path'
import fs from 'fs'


const addPost = async(req,res)=>{
    try {
        
        const postItem = {
            image:req.file.filename,
            title:req.body.title,
            subtitle:req.body.subtitle,
            desc:req.body.desc
        }        
        const post = new Post(postItem)
        await post.save()
        post.imgeUrl= `http://localhost:3000/uploads/${post.id}`
        await post.save()
        res.status(201).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)


    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }

}
const updatePost =async(req,res)=>{
     try {
        const postItem = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(postItem)
     } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
        
     }
}
const deletePost = async(req,res)=>{
    try {
         await Post.findByIdAndDelete(req.params.id)
         res.status(200).json({message:"post deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
const getImageById = async(req,res)=>{
    try {

        const id = req.params.id

        const post = await Post.findById(id).exec()

        if(!post){
            return res.status(404).json({error:"Image not found"})
        }
       const dirname = path.resolve()
       const imagePath = path.join(dirname,'uploads',post.image)
      
       if(!fs.existsSync(imagePath)){
             return  res.status(404).json({error:"Image not found"})
       }

       res.sendFile(imagePath)

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
export {addPost,getPosts,updatePost,deletePost,getImageById}