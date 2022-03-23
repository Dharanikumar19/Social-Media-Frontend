import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import TopBar from '../topbar/TopBar';
import { AuthContext } from '../../context/AuthContext'
import "./NewConversation.css"


function NewConversation() {
  const { user } = useContext(AuthContext)

  const [friends, setFriends] = useState([]);
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const senderId = user._id
    const receiverId = user.followings[0]

    const conversation = {
      senderId,
      receiverId,
    };
    try {
      const res = await axios.post(`https://dk-social-media.herokuapp.com/api/conversations`, conversation)

    } catch (error) {
      console.log(error)
    }
    navigate("/messenger")
  }


  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users/friends/${user._id}`)
      setFriends(res.data)
    }
    getFriends();
  }, [user._id])

  return (
    <>
      <TopBar />
      <div>
        <div className='newconversation'>
          <div className='conversationWrapper'>  
            <div className='convoRight'>
            <h3 className='convoheading'>Create New Conversation</h3>
              <form className='convoBox' onSubmit={handleSubmit}>
                <label>Your Name</label>
                <input className='convoInput' type="text" defaultValue={user.username} readOnly />
                <label>Your Friend Name</label>
                <input className='convoInput' type="text" defaultValue={params.username} readOnly />
                <button type='submit' className='convoButton'>Create New conversation</button>
                <Link to="/messenger">
                  <div type='submit' className='backToMessenger'>Back to Chat</div>
                </Link>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewConversation
