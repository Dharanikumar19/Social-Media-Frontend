import React, { useContext, useEffect, useState } from 'react'
import "./RightBar.css"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import {Add, Remove} from "@material-ui/icons"

function ProfileRightBar({ user }) {

  const {user:currentUser, dispatch} = useContext(AuthContext)

  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))
  

  useEffect(() => {
      const getFriends = async () => {
          try {
            const friendList = await axios.get(`https://dk-social-media.herokuapp.com/api/users/friends/${user._id}`)
            setFriends(friendList.data)
           
          } catch (error) {
            console.log(error)
          }
      }
      getFriends()
  }, [user])

  
  const handleClick = async() => {
    try {
      if(followed){
        await axios.put(`https://dk-social-media.herokuapp.com/api/users/${user._id}/unfollow`, {userId:currentUser._id})
        dispatch({type:"UNFOLLOW", payload:user._id})
      }else{
        await axios.put(`https://dk-social-media.herokuapp.com/api/users/${user._id}/follow`,{userId:currentUser._id})
        dispatch({type:"FOLLOW", payload:user._id})
      }
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed)
  }


  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
      {user.username !== currentUser.username && (
        <button className='rightbarFollowButton' onClick={handleClick}> 
        {followed ? "Unfollow" : "Follow"}
        {followed ? <Remove/> : <Add/>}     
          </button>
      )}
        <h4 className='profilerightbartitle'>User Info</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City : </span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>State : </span>
            <span className='rightbarInfoValue'>{user.state} </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>RelationShip : </span>
            <span className='rightbarInfoValue'>{user.relationship === 1 
            ? "Single" : user.relationship === 2 ? "Married" : "-"} </span>
          </div>
        </div>
        <h4 className='rightbartitle'>User Friends List :</h4>
        <div className='rightbarFollowings'>
          {friends.map((friend, index) => (
            <Link to={`/profile/${friend.username}`} style={{textDecoration:"none"}} key={index}>
            <div className='rightbarFollowing' >
            <img src="/assets/person/noavatar.png" alt='' className='rightbarFollowingImg' />
            <span className='rightFollowingName'>{friend.username}</span>
          </div>
            </Link>
          
      ))}
            
        </div>
      </div>
    </div>
  )
}

export default ProfileRightBar
