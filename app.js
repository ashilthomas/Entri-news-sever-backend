import express from "express"
import cors from "cors"
import userRouter from "./Routers/userRouter.js"
import employeeRouter from "./Routers/employeeRouter.js"
import postRouter from "./Routers/postRouter.js"
import path from "path"
import passport from './passport.js';
import mongoose from "mongoose"
import 'dotenv/config'


const app = express()
async function main() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  main();

app.use(express.json())

app.use(cors())
app.use('/users',userRouter)
app.use('/employees',employeeRouter)
app.use('/posts',postRouter)
app.use(passport.initialize());
const dirname = path.resolve()

app.use(express.static(path.join(dirname,'uploads')))


const port = process.env.PORT
app.listen(3000,()=>{
    console.log(`server running at ${port}`);
})






