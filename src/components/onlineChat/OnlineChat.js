import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./OnlineChat.css"

function OnlineChat({ setCurrentChat, currentId}) {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users/friends/${currentId}`)
      setFriends(res.data)
    }
    getFriends();
  }, [currentId])
   

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`https://dk-social-media.herokuapp.com/api/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
      <h4 className='onlineFriends'>Your Friends List / Create Conversation </h4>
      {
        friends.map((f, i) => (
          <div className='chatOnlineFriend' key={i} onClick={() => handleClick(f)}>
            <Link to={`/newConversation/${f.username}`} style={{textDecoration:"none"}}>
          <div className='chatOnlineImgContainer'>
              <img className='chatOnlineImg' src="assets/person/noavatar.png" alt="" />
              <div className='chatOnlineBadge'></div>
              </div>  
              <span className='chatOnlineName'>{f?.username ? f?.username : "Follow any Friends to chat with them"}</span>
              </Link>
          </div>
        ))
      }
      
    </div>
  )
}

export default OnlineChat
