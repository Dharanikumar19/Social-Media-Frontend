import React from 'react'
import "./HomePage.css"
import Feed from '../../components/Homefeed/Feed'
import HomeRightBar from '../../components/rightbar/HomeRightBar'
import SideBar from '../../components/sidebar/SideBar'
import TopBar from '../../components/topbar/TopBar'

function HomePage() {
    return (
        <>
            <TopBar />
            <div className='homeContainer'>
            <SideBar />
            <Feed/>
            <HomeRightBar/>
            </div>
           

        </>
    )
}

export default HomePage
