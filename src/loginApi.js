import axios from "axios";

export const loginApi = async (userCredentials, dispatch) => {
    dispatch({type : "LOGIN_START"});
    try {
        const res = await axios.post("https://dk-social-media.herokuapp.com/api/auth/login", userCredentials)
        dispatch({type : "LOGIN_SUCCESS", payload: res.data})
    } catch (error) {
        dispatch({type : "LOGIN_FAILURE", payload: error})
    }
}

export const logoutApi = async ( dispatch) => {
    dispatch({type : "LOGOUT_SUCCESS"});
}