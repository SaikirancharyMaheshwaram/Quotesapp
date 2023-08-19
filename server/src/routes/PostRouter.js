import express from "express";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "../routes/UserRouter.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const result = await PostModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a new post
router.post("/", async (req, res) => {
  const { title, post, author,owner } = req.body;
  const authorname=await UserModel.findOne({_id:author});
  console.log(title + "" + post + "" + author);
  const result = new PostModel({
    title,
    post,
    author:authorname.username,
    owner
  });
   
  try {
    await result.save();

    res.status(201).json({
      title: result.title,
      post: result.post,
      author: result.author,
      date: result.date,
      owner:result.owner
    });
  } catch (err) {
    res.status(500).json(err);
  }

});
router.get("/:postid",async(req,res)=>{
  const postId = req.params.postid;
  //console.log(postId);
  const response=await PostModel.findById(postId);
  res.status(200).json(response);
})

router.delete("/delete/:postid",async(req,res)=>{
  const postId = req.params.postid;
  console.log(postId);
  const deletedPost = await PostModel.findByIdAndDelete(postId);
  if(deletedPost){
    res.json({message:"sucessfully deleted"});
  }
  else{

    res.status(401).json(err);
  }

})
//updating the post
router.patch("/update/:postid",async (req,res)=>{
  const postId=req.params.postid;
  // const singlePost=await PostModal.filter({_id:postId});
  const filter={_id:postId};
  // singlePost.title=req.body.title,
  // singlePost.post=req.body.post,
    const update={$set:{title:req.body.title,post:req.body.post}};
    const result=await PostModel.updateOne(filter,update);
  res.status(200).json({result});
});


router.get("/myposts/:userid",async(req,res)=>{
  const userid=req.params.userid;
  console.log(userid);
  const result=await PostModel.find({owner:{$in:userid}});
  console.log(result);
  res.status(200).json(result);
});
//saving the post
router.post("/savepost", async (req, res) => {
  const favpost = await PostModel.findById(req.body.postId);
  const user = await UserModel.findById(req.body.userId);
  console.log(req.body.postId);
  console.log(req.body.userId);
  try {
    user.fav.push(favpost);
    await user.save();
    res.status(201).json({ fav: user.fav });
  } catch (err) {
    res.status(500).json("problem");
  }
});
//getting the saved fav posts

router.get("/myfav/:userid", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userid);
    const favs = await PostModel.find({
      _id: { $in: user.fav },
    });

    console.log(favs);
    res.status(201).json({ favs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




export { router as postRouter };
