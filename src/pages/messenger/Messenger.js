import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Messenger.css"
import TopBar from '../../components/topbar/TopBar'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/messages/Message'
import OnlineChat from '../../components/onlineChat/OnlineChat'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

function Messenger() {
  const { user } = useContext(AuthContext)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef()
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/conversations/${user._id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations();
  }, [user._id])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${currentChat?._id}`)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    try {
      const res = await axios.post(`http://localhost:5000/api/messages`, message)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior : "smooth"})
  }, [messages])
  

  return (
    <>
      <TopBar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <h4 className='recentFriends' style={{textAlign : "center"}}>Recent Chat Friends List </h4>
            {conversations.map((con,i) => (  
              <div onClick={() => setCurrentChat(con)}>
                <Conversations key={i} conversation={con} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <h3 className='chatboxHeading'>Chat Box-(Select a friend in Recent Chat or Create New)</h3>

          <hr />
          <div className='chatBoxWrapper'>
            {
              currentChat ?
                <>
                  <div className='chatBoxTop'>
                    {messages.map((m, i) => (
                      <div ref={scrollRef}>
                        <Message key={i} message={m} own={m.sender === user._id} />
                      </div>

                    ))}
                  </div>
                  <div className='chatBoxBottom'>
                    <textarea className='chatMessageInput'
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      placeholder='write Something...'>
                    </textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                  </div> </> : <span className='Open a Conversation on your recent chat friends list or create new Conversation'></span>}
                  

          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <OnlineChat currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>

  )
}

export default Messenger
