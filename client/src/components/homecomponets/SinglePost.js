import React, { useEffect, useState } from "react";
import "./SinglePost.css";
//import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BASE_URL } from "../../helper";

function SinglePost({ item, home,savedPosts,setc,setSavedPosts }) {
  const navigate = useNavigate();
  const date = new Date(item.date);


  //const [savedPosts, setSavedPosts] = useState([]);

  const formattedDate = date.toLocaleDateString("en-GB");
  const handleDelete = async (id) => {
    console.log(id);
    const respone = await axios.delete(
      `${BASE_URL}/posts/delete/${id}`
    );
    alert(item.title + "deleted Successfully");

    console.log(respone);
    setc(id); 
  };
  const handleEdit = (id) => {
    window.localStorage.setItem("postId", id);
    
  
    navigate("/updatepost");
  };
  const isUserPresent = (id) => savedPosts.some((user) => user._id === id);
  

  const userId = window.localStorage.getItem("userid");

  console.log(userId);
  const savePost = async (postID) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/savepost`,
        {
          postId: postID,
          userId: userId,
        }
      );

      
      //navigate("/fav");
      //setSavedRecipes(response.data.savedRecipes);
      if (response.status === 201) {
        //alert("Post Liked");
        console.log(response.data.fav);
        setSavedPosts(response.data.fav);
        setc(postID+Math.random());

      }
    } catch (err) {
      console.log(err);
    }
  };
  const unsavePost=async(postID)=>{
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/unsavepost`,
        {
          postId: postID,
          userId: userId,
        }
      );
      setSavedPosts(response.data.fav);
      setc(postID);
    } catch (error) {
      
    }

  }

  return (
    <div className="card">
      <div className="icon"></div>
      <div className="title">{item.title}</div>
      <div className="quote-box">{item.post}</div>
      <div className="date">{formattedDate}</div>
      {home === false ? (
        <>
          <button
            className="delete-button"
            onClick={() => handleDelete(item._id)}
          >
            delete
          </button>

          <button className="edit-button" onClick={() => handleEdit(item._id)}>
            edit
          </button>
        </>
      ) : (
        <></>
      )}
      {isUserPresent(item._id) === false ? (
        <div className="white-logo" onClick={() => savePost(item._id)}>
          {<FavoriteBorderOutlinedIcon />}
        </div>
      ) : (
        <div className="white-logo" onClick={()=>unsavePost(item._id)}>{<FavoriteIcon />}</div>
      )}

      <div className="author"> ~ by {item.author}</div>
    </div>
  );
}

export default SinglePost;