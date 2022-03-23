import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Post from '../post/Post'
import "./ProfileFeed.css"


function ProfileFeed({username}) {

  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
      ? await axios.get(`https://dk-social-media.herokuapp.com/api/posts/profile/${username}`) 
      : await axios.get(`https://dk-social-media.herokuapp.com/api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts();
  }, [username, user._id])
  
  

  return (
    <div className='feed'>
        <h4 className='userProfilePage'>User Profile Page</h4>
        <h4 className='userPosts'>User recently added posts </h4>
      <div className='feedWrapper'>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        </div> 

    </div>
  )
}

export default ProfileFeed