import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/UserRouter.js";
import { postRouter } from "./routes/PostRouter.js";

//creating the express
const app = express();
app.use(cors());
app.use(express.json());
//configuring the dotenv file 

dotenv.config(); 
//creating mongodb connection 
mongoose.connect(process.env.MONGODB_URL);

//creating the middleware
app.use("/auth",userRouter);
app.use("/posts",postRouter); 
//listen on port
app.listen(process.env.PORT||3500, () =>
  console.log(`server is started ${process.env.PORT}`)
);
