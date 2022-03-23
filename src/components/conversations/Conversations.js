import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Conversations.css"

function Conversations({conversation, currentUser}) {
    
    const [user, setUser] = useState({})

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id )
        const getUser = async () => {
           try {
            const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users?userId=${friendId}`)     
            setUser(res.data)
           } catch (error) {
               console.log(error)
           }
        }
        getUser()
    }, [currentUser, conversation])

    return (
        <>
        
            <div className='conversation'>
            <img className='conversationImg' src={"assets/person/noavatar.png"} alt="" />
            <span className='conversationName'>{user?.username}</span>
            </div>
        </>
    )
}

export default Conversations
