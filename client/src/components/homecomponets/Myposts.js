import React from 'react';
import Header from './Header';
import { useEffect } from 'react';
import SinglePost from './SinglePost';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../helper';
import { motion } from "framer-motion";

function Myposts() {

    const sections = [
        { title: 'Create Post', url: '/createpost' },
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
                
                const userId=window.localStorage.getItem("userid");
                const featuredPostss=await axios.get(`${BASE_URL}/posts/myposts/${userId}`,{
                  headers: { authorization: cookies.access_token },
                });
                console.log(featuredPosts);
                setfeaturedPosts(featuredPostss.data.slice().reverse());
                
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
        return()=>{
      
        }
      },[c]);
      const home=false;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{opacity:1}} exit={{opacity:0}}>
    <Header title=" Quotes Blog" sections={sections}/>
    {featuredPosts.map((item) => (
              <SinglePost key={item.title} item={item} home={home} savedPosts={savedPosts} setc={setc} setSavedPosts={setSavedPosts}
             />
            ))}
    </motion.div>
  )
}

export default Myposts;