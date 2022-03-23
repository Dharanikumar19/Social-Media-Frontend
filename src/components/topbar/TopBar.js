import React, { useContext } from 'react'
import "./TopBar.css"
import { Chat} from "@material-ui/icons"
import { Link } from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext"
import { logoutApi } from '../../loginApi'

function TopBar() {
    const {user, dispatch} = useContext(AuthContext)
    
  const logouthandler = () => {
        logoutApi(dispatch)
  }

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to="/" style={{textDecoration : "none"}}>
                <span className='logo'>Mingle Media</span>
                </Link>
                
            </div>
          
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <Link to="/" style={{textDecoration: "none", color:"white"}}>
                    <span className='topbarLink'>Home / Feed</span>
                    </Link>
                </div>
                <Link to="/messenger" className='chat'>
                    <h6>Messenger</h6>
                    <div>
                        <Chat/>
                    </div>    
                </Link>
                <Link to={`/profile/${user.username}`}>
                <img src="/assets/person/noavatar.png" 
                    alt="person1" className='topbarImg'/>
                </Link>
                <Link to={`/profile/${user.username}`}  style={{textDecoration: "none", color:"white"}}>
                <div className='myProfile'>My Profile : {user.username}</div>
                </Link>  
                <Link to="/login">
                <button className='logoutBotton' onClick={logouthandler}>Logout</button>
                </Link>
               
                     
            </div>
        </div>
    )
}

export default TopBar
