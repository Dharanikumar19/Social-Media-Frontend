import React, { useContext, useRef,useState } from 'react'
import "./Login.css"
import {loginApi} from "../../loginApi"
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';

function Login() {
const [formValue, setFormValue] = useState("")

  const fillInputs = () => {
      setFormValue({email : "black@gmail.com", password : "123456"})
  }

 const email = useRef();
 const password = useRef();
  const { isFetching, error, dispatch} = useContext(AuthContext)


const handleSubmit = async(e) => {
    e.preventDefault();
    loginApi({email:email.current.value, password :password.current.value},dispatch )

}

    return (
        <div>
            <div className='login'>
                <div className='loginWrapper'>
                    <div className='loginLeft'>
                        <h3 className='loginLogo'>Mingle Media</h3>
                        <span className='loginDesc'>Connect with Friends and Chat with Friends from all around the world on Mingle Media
                        </span>
                    </div>
                    <div className='loginRight'>
                        <form className='loginBox' onSubmit={handleSubmit}>
                        {error ? <Alert severity="error">Invalid Email or Password — check it out! </Alert> : ""} 
                            <input placeholder='Enter your Email' type="email" className='loginInput' value={formValue.email} ref={email} required/> 
                            <input placeholder='Enter your Password' type="password" className='loginInput' value={formValue.password} ref={password} minLength="6" required/> 
                            <button className='loginButton'>{isFetching ? <CircularProgress color="secondary"/> : "Login"}</button>
                            <Link to="/register" className="regbutton">
                        <button className='loginRegisterButton'>Create a New Account</button>
                        </Link>
                        <div className='demoCredentialButton' onClick={() => fillInputs()}>Demo Credentials</div>
                        </form>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
