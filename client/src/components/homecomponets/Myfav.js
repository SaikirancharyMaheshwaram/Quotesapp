import React from 'react';
import Header from './Header';
import { useEffect } from 'react';
import SinglePost from './SinglePost';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../helper';
import { motion } from "framer-motion";

function Myfav() {

    const sections = [

        { title: 'All Posts', url: '/home' },
        { title: 'fav', url: '/fav' },
        
       
      ];
      const [featuredPosts,setfeaturedPosts]=React.useState([]);
      const [c,setc]=React.useState(1);
      const[cookies,_]=useCookies("[access_token]");
      const [savedPosts, setSavedPosts] = React.useState([]);

    
    
      useEffect(()=>{
        const fetchingArray=async()=>{
            try {
               // const userId=window.localStorage.getItem("userid");
                const featuredPostss=await axios.get(`${BASE_URL}/posts/myfav/${window.localStorage.getItem("userid")}`
                );
                console.log(featuredPostss.data.favs);
                setfeaturedPosts(featuredPostss.data.favs.slice().reverse());
                
            } catch (error) {
                console.log(error);
                
            }
        }
        const fetchFav =  async() => {
          const userId = window.localStorage.getItem("userid");
          const favP =  await axios.get(`${BASE_URL}/posts/myfav/${userId}`, {
            headers: { authorization: cookies.access_token },
          });
    
          setSavedPosts(favP.data.favs);
        };
        fetchingArray();
        fetchFav();
      },[c]);
      const home=true;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{opacity:1}} exit={{opacity:0}}>
    <Header title=" Quotes Blog" sections={sections}/>
    {featuredPosts.map((item) => (
              <SinglePost key={item._id} item={item} home={home} savedPosts={savedPosts} setc={setc}  setSavedPosts={setSavedPosts} />
            ))}
    </motion.div>
  )
}

export default Myfav;