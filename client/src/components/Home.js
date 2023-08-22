import React, { useState, useEffect } from "react";
import Header from "./homecomponets/Header";
import axios from "axios";
import SinglePost from "./homecomponets/SinglePost";
import { Cookies, useCookies } from "react-cookie";
import { BASE_URL } from "../helper.js";
import "./Home.css";

import { motion } from "framer-motion";

export default function Home() {
  const [cookies, _] = useCookies("[access_token]");
  const sections = [
    { title: "Create Post", url: "/createpost" },
    { title: "MyPosts", url: "/myposts" },
    { title: "fav", url: "/fav" },
  ];
  const [featuredPosts, setfeaturedPosts] = React.useState([]);
  const [c, setc] = React.useState(1);
  const home = true;

  const [savedPosts, setSavedPosts] = useState([]);

  const fetchFav = async () => {
    const userId = window.localStorage.getItem("userid");
    const favP = await axios.get(`${BASE_URL}/posts/myfav/${userId}`, {
      headers: { authorization: cookies.access_token },
    });

    setSavedPosts(favP.data.favs);
  };

  useEffect(() => {
    const fetchingArray = async () => {
      try {
        const featuredPostss = await axios.get(`${BASE_URL}/posts`, {
          headers: { authorization: cookies.access_token },
        });
        setfeaturedPosts(featuredPostss.data.slice().reverse());
      } catch (error) {
        console.log(error);
      }
    };
    console.log("qwerty");
    fetchFav();
    fetchingArray();

    return () => {};
  }, [c]);

  // const isUserPresent =  (id) => {
  //    savedPosts.some((user) => user._id === id);
  // };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{opacity:1}} exit={{opacity:0}}>
      <Header title=" Quotes Blog" sections={sections} />
      <div className="flexing-cards">
        {featuredPosts.map((item) => (
          <SinglePost
            key={item.title}
            item={item}
            home={home}
            savedPosts={savedPosts}
            setc={setc}
            setSavedPosts={setSavedPosts}
          />
        ))}
      </div>
    </motion.div>
  );
}
