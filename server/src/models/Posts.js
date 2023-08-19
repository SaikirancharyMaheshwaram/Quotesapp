import mongoose from "mongoose"
const PostSchema=new mongoose.Schema({
    title:{
        type:String,

    },
    post:{
        type:String,

    },
    author:{
        type:String,

    },
    date:{
        type:Date,
        default:Date.now,
    },
    owner:{
        type:mongoose.Types.ObjectId
    }

});
export const PostModel=mongoose.model("posts",PostSchema);
