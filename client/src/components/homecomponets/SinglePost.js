import React, { useEffect, useState } from "react";
import "./SinglePost.css";
//import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BASE_URL } from "../../helper";

function SinglePost({ item, home }) {
  const navigate = useNavigate();
  const date = new Date(item.date);
  const [c, setc] = useState(1);
  const [savedPosts, setSavedPosts] = useState([]);
  const [featuredPosts, setfeaturedPosts] = React.useState([]);
  const formattedDate = date.toLocaleDateString("en-GB");
  const handleDelete = async (id) => {
    console.log(id);
    const respone = await axios.delete(
      `${BASE_URL}/posts/delete/${id}`
    );
    alert(item.title + "deleted Successfully");
    console.log(respone);
  };
  const handleEdit = (id) => {
    window.localStorage.setItem("postId", id);
    navigate("/updatepost");
  };
  //fetching the saved posts

  // const fetchSavedPosts = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3500/posts/myfav/${window.localStorage.getItem("userId")}`
  //     );
  //     //console.log(response);
  //     setSavedPosts(response.data.favs);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  ///// start
  useEffect(() => {
    const fetchingArray = async () => {
      try {
        // const userId=window.localStorage.getItem("userid");
        const featuredPostss = await axios.get(
          `${BASE_URL}/posts/myfav/${window.localStorage.getItem(
            "userid"
          )}`
        );
        console.log(featuredPostss.data.favs);
        setfeaturedPosts(featuredPostss.data.favs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingArray();
  }, c);
  //// end
  // const isPostSaved = (title) => featuredPosts.includes(title);

  // //testing the logic
  // console.log(isPostSaved('Hello'));
  ///test number 2
 //checking if post is present in fav post array
  const isUserPresent = (id) => featuredPosts.some((user) => user._id === id);
  ///

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
      setc(c + 1);
      navigate("/fav");
      //setSavedRecipes(response.data.savedRecipes);
      if (response.status === 201) {
        alert("Post Liked");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="white-logo">{<FavoriteIcon />}</div>
      )}

      <div className="author"> ~ by {item.author}</div>
    </div>
  );
}

export default SinglePost;
