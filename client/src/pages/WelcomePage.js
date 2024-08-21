import React, { useState } from "react";
import Footer from "../component/Footer";
import coolpanda from "../pics/coolpanda.jpeg";
import './WelcomePage.css';
import NavBar from "../component/NavBar";
import RegistrationForm from '../component/RegistrationForm';
import LoginForm from "../component/LoginForm";


const WelcomePage = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //FIXME: for the real things
    const [showLoginForm, setShowLoginForm] = useState(false);
    const handleLogin = () =>{
        setShowLoginForm(true);
        setShowRegistrationForm(false);
        
    }
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const handleRegister = () =>{
        setShowRegistrationForm(true);
        setShowLoginForm(false);
    }
    const handleCloseForm = () => {
        setShowRegistrationForm(false);
        setShowLoginForm(false);
    }; 
    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
        handleCloseForm(); // Close the login form after successful login
    };

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
            {showRegistrationForm && <RegistrationForm onClose={handleCloseForm} />} {/* Show Registration Form */}
            {showLoginForm && <LoginForm onSuccessfulLogin={handleSuccessfulLogin} onClose={handleCloseForm} />} {/* Show Login Form */}
        </div>
    )
    
    
};
/**
 * TODO: 
 * 1. navbar only seen after successeful login 
 * 2. Add functionality to buttons
 **/
export default WelcomePage;