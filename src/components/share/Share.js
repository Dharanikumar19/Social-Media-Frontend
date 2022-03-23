import React, { useContext, useState } from 'react'
import "./Share.css";
import { PermMedia, ShareSharp } from "@material-ui/icons"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FileBase from "react-file-base64";


const initialSate = {
    desc: ""
}

function Share() {
    const { user } = useContext(AuthContext)

    const [file, setFile] = useState(initialSate)
    const { desc } = file
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFile({ ...file, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            ...file, userId: user._id,
        }


        try {
            await axios.post("https://dk-social-media.herokuapp.com/api/posts", newPost)
        } catch (error) {
            console.log(error)
        }

        navigate(`/profile/${user.username}`)
    }

    return (
        <>
            <div className='share'>
                <div className='shareWrapper'>
                    <h4 className='createnewpost'>Create New Post - (Select your post and click Share now button)</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='shareTop'>

                            <img className='shareProfileImg' src="assets/person/noavatar.png" alt='img' />
                            <input type="text" value={desc}
                                name="desc" onChange={handleInput} placeholder={"what's in your mind "+ user.username + "..."} 
                                className='shareInput' required />
                        </div>
                        <hr className='shareHr' />
                        <div className='shareBottom'>
                        <label htmlFor='file' className='shareOptions'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'> Select Post</span>
                            <FileBase type="file" id="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setFile({ ...file, img: base64 })
                                }
                            />
                        </label>
                        <div className='shareOptions'>
                            <ShareSharp htmlColor='black' className='shareIcon' />
                            <button className='shareButton' type="submit">Share Now</button>
                        </div>
                        </div>
                       
                    </form>

                </div>

            </div>
            <h4 className='postmainheading'>Your Posts and your Friends Post will appear down below</h4>
        </>
    )
}

export default Share
