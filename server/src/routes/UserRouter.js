import express from "express";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//setting the router
const router = express.Router();
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(201).json({ message: "User already Exists" });
  }

  //bcrypt uses blowfish fish algorithm to hash the password and 10 is the key size salt rounds

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username: username,
    password: hashedPassword,
    email: email,
  });
  //to save the user
  await newUser.save();
  res.status(200).json({ message: "Registration Successful" });
});

//creating a route for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(201).json({ message: "User Not Exists" });
  }
  const isValid = bcrypt.compare(password, user.password);
  if (!isValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  console.log("User loggedin");
  const token=jwt.sign({id:user._id},process.env.SECRET);
  res.json({token,Userid:user._id,name:user.username,message:`${user.username} succesfullly logged in`});
});

export { router as userRouter };
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

