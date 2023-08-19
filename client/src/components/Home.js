import React, { useState, useEffect } from "react";
import Header from "./homecomponets/Header";
import axios from "axios";
import SinglePost from "./homecomponets/SinglePost";
import { Cookies, useCookies } from "react-cookie";
import {BASE_URL} from '../helper.js';

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
  

  useEffect(() => {
    const fetchingArray = async () => {
      try {
        const featuredPostss = await axios.get(`${BASE_URL}/posts`, {
          headers: { authorization: cookies.access_token },
        });
        setfeaturedPosts(featuredPostss.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingArray();
  }, [c]);
  

  return (
    <>
      <Header title=" Quotes Blog" sections={sections} />
      <div className="flexing-cards">
        {featuredPosts.map((item) => (

          <SinglePost key={item.title} item={item} home={home}  />
        ))}
      </div>
    </>
  );
}