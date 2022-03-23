import React from 'react'
import "./OnlineFriends.css"

function OnlineFriends() {
  return (
    <div>
      <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>Currently no friends are online</span>
          </li>
    </div>
  )
}

export default OnlineFriends
