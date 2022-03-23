import React from 'react'
import OnlineFriends from '../onlineFriends/OnlineFriends'
import "./RightBar.css"

const HomeRightBar = () => {
    return (
        <>
            <div className='rightbar'>
                <div className='rightbarWrapper'>
                    <h3 className='rightbarHeading'>Connecting People</h3>
                    <img className='rightbarAd' src='assets/media-world.jpg' alt='ad' />
                    <img className='rightbarAd' src='assets/globe.png' alt='ad' />
                    <img className='rightbarAd' src='assets/getty.jpg' alt='ad' />
                   
                    <h3 className='rightbarTitle'>Online Friends</h3>
                    <ul className='rightbarFriendList'>
                        
                        <OnlineFriends />     
                    </ul>
                </div>
            </div>

        </>
    )
}

export default HomeRightBar
