import React, { useEffect, useState } from 'react'
import "./ProfilePage.css"
import ProfileRightBar from '../../components/rightbar/ProfileRightBar'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topbar/TopBar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProfileFeed from '../../components/ProfileFeed/ProfileFeed'

function ProfilePage() {
    const [user, setUser] = useState({})
    const params = useParams();
    const username = params.username;
    
    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`https://dk-social-media.herokuapp.com/api/users?username=${username}`)
          setUser(res.data)
        }
        fetchUser();
      }, [username]);
      
    return (
        <>
            <TopBar />
            <div className='profile'>
                <SideBar />
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img src="/assets/person/nocover.jpg"
                    alt="cover image" className='profileCoverImg'/>

                            <img src="/assets/person/noavatar.png"
                    alt="profile" className='profileUserImg'/>
                        </div>
                        <div className='profileInfo'>
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className='profileRightBottom'>
                        <ProfileFeed username={username} />
                        <ProfileRightBar user={user} />
                    </div>
                </div>

            </div>


        </>
    )
}

export default ProfilePage
