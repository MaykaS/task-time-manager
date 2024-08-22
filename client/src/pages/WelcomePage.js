import React, { useState } from "react";
import Footer from "../component/Footer";
import coolpanda from "../pics/coolpanda.jpeg";
import './WelcomePage.css';
import NavBar from "../component/NavBar";
import RegistrationForm from '../component/RegistrationForm';
import LoginForm from "../component/LoginForm";
import Notification from "../component/Notification";


const WelcomePage = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [notification, setNotification] = useState({message: '', type: ''});
    
    const handleLogin = () =>{
        setShowLoginForm(true);
        setShowRegistrationForm(false);
    }
    const handleRegister = () =>{
        setShowRegistrationForm(true);
        setShowLoginForm(false);
    }
    const handleCloseForm = () => {
        setShowRegistrationForm(false);
        setShowLoginForm(false);
    }; 
    const handleSuccessfulLogin = () => {
        handleNotification({message:"Login Succeseful",type: "Success"});
        handleCloseForm(); // Close the login form after successful login
        setIsLoggedIn(true);
    };
    const handleNotification=(notification)=>{
        setNotification(notification);  
    }

    return(
        <div className="welcome-container">
            <div className="header">
                <div className="buttons">
                    <button className="button" onClick={handleRegister}>Register</button>  
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
                <img src={coolpanda} alt="panda" className="pandaImage"/>
                <h1>Welcome To My Task App</h1>
                {isLoggedIn && <NavBar/>}
            </div>
            <Footer/>
            {showRegistrationForm && <RegistrationForm onClose={handleCloseForm} onNotification={setNotification} />} {/* Show Registration Form */}
            {showLoginForm && <LoginForm onSuccessfulLogin={handleSuccessfulLogin} onClose={handleCloseForm} onNotification={setNotification}/>} {/* Show Login Form */}
            {notification.message && <Notification message={notification.message} type={notification.type} onClose={()=>setNotification({message:'',type:''})} />} {/* Show Notification */}
        </div>
    )
};
/**
 * TODO: 
 * 1. make authentication state global (redux?) login returnes a token
 **/
export default WelcomePage;