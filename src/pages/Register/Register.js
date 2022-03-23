import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const city = useRef();
  const state = useRef();
  const password = useRef();

  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
    const user = {
      username: username.current.value,
      email: email.current.value,
      city: city.current.value,
      state: state.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("https://dk-social-media.herokuapp.com/api/auth/register", user)
       navigate("/login")
    } catch (err) {
      console.log(err);
    }
};

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mingle Media</h3>
          <span className="loginDesc">
          Connect with Friends and Chat with Friends from all around the world on Mingle Media
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input placeholder="Enter your Username" type="text" ref={username} className="loginInput" required/>
            <input placeholder="Enter your Email" type="email" ref={email} className="loginInput" required/>
            <input placeholder="Enter your City" type="text" ref={city} className="loginInput" required/>
            <input placeholder="Enter your State" type="text" ref={state} className="loginInput" required/>
            <input placeholder="Enter your Password" ref={password} type="password" minLength="6" className="loginInput" required/>
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login" className="loginlink">
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}