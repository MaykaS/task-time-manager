import React, { useState } from "react";
import Footer from "../component/Footer";
import coolpanda from "../pics/coolpanda.jpeg";
import './WelcomePage.css';
import NavBar from "../component/NavBar";


const WelcomePage = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //FIXME: for the real things
    const handleLogin = () =>{
        setIsLoggedIn(true);
        alert("logged in");
    }
    const handleRegister = () =>{alert("registered!");} 

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
        </div>
    )
    
    
};
/**
 * TODO: 
 * 1. navbar only seen after successeful login 
 * 2. action sheet on buttons 
 */
export default WelcomePage;