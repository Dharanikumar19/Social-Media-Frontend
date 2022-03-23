import React, { useEffect, useState } from 'react'
import "./CloseFriends.css"
import axios from 'axios'
import {Link} from "react-router-dom"


function CloseFriends() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users/getAllUsers`)
        setUsers(res.data.result)
    }

    return (

        <ul>
            <h4 className="suggestedFriends">
                Suggested Friends List / Visit profile
            </h4>
            {
                users.map((user, _id) => (
            <li className='sidebarFriend' key={_id}>
                <img className='sidebarFriendImg' src="/assets/person/noavatar.png" alt='' />
                <Link to={`/profile/${user.username}`}  style={{textDecoration:"none", color:"black"}}>
                 <span className='sidebarFriendName'>{user.username}</span>
                 </Link>
                
            </li>
            ))
            }
        </ul>



    )
}

export default CloseFriends

