import React from 'react';
import Header from './Header';
import { useEffect } from 'react';
import SinglePost from './SinglePost';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../helper';

function Myfav() {

    const sections = [

        { title: 'All Posts', url: '/home' },
        { title: 'fav', url: '/fav' },
        
       
      ];
      const [featuredPosts,setfeaturedPosts]=React.useState([]);
      const [c,setc]=React.useState(1);
      const[cookies,_]=useCookies("[access_token]");

    
    
      useEffect(()=>{
        const fetchingArray=async()=>{
            try {
               // const userId=window.localStorage.getItem("userid");
                const featuredPostss=await axios.get(`${BASE_URL}/posts/myfav/${window.localStorage.getItem("userid")}`
                );
                console.log(featuredPostss.data.favs);
                setfeaturedPosts(featuredPostss.data.favs);
                
            } catch (error) {
                console.log(error);
                
            }
         
      
        }
        fetchingArray();
      },[]);
      const home=true;

  return (
    <>
    <Header title=" Quotes Blog" sections={sections}/>
    {featuredPosts.map((item) => (
              <SinglePost key={item._id} item={item} home={home}  />
            ))}
    </>
  )
}

export default Myfav;