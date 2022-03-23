import ProfilePage from "./pages/profile/ProfilePage";
import HomePage from "./pages/homePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import NewConversation from "./components/conversations/NewConversation";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" exact element={user ? <HomePage/> : <Login/>} />
    <Route path="/login" exact element={user ? <Navigate to="/"/> : <Login/>} />
    <Route path="/register" exact element={user ? <Navigate to="/"/> : <Register/>} />
    <Route path="/profile/:username" exact element={<ProfilePage/>} /> 
    <Route path="/messenger" exact element={<Messenger />} /> 
    <Route path="/newConversation/:username" exact element={<NewConversation />} /> 
    </Routes>
    
    </BrowserRouter>
     
    
    </>
  );
}

export default App;
