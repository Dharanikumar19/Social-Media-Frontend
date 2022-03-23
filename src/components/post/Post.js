import React, { useState, useEffect, useContext } from 'react'
import "./Post.css"
import axios from 'axios'
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { format } from "timeago.js";


function Post({ post }) {
  
    const {user:currentUser} = useContext(AuthContext)
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})

    
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users?userId=${post.userId}`)
          setUser(res.data)
         
        }
        fetchUser();
      }, [post.userId])

      
    const likeHandler = () => {
        try{
            axios.put(`https://dk-social-media.herokuapp.com/api/posts/${post._id}/like`, {userId:currentUser._id})
        }catch(error){
            console.log(error)
        }
        setLike(isLiked ? like -1 : like + 1 )
        setIsLiked(!isLiked)
    }

    return (
        <>
        <div className='post'>
            
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                    <Link to={`/profile/${user.username}`}>
                        <img className='postProfileImg' src="/assets/person/noavatar.png" alt='img' />
                        </Link>
                        <span className='postUsername'>{user.username}
                        </span>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postText'>{post?.desc}</span>
                    <img className='postImg' src={post.img} alt='' />
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt='' />
                        <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt='' />
                        <span className='postLikeCounter'>{like} likes</span>
                    </div>
                    <div className='postBottomLeft'>
                        <span className='postCommentText'>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Post
