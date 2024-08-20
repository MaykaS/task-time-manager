import React from "react";
import Footer from "../component/Footer";
import coolpanda from "../pics/coolpanda.jpeg";
import './WelcomePage.css';

const WelcomePage = () =>(
    <div className="welcome-container">
        <div className="header">
            <div className="buttons">
                <button className="button">Register</button>
                <button className="button">Login</button>
            </div>
            <img src={coolpanda} alt="panda" className="pandaImage"/>
            <h1>Welcome To My Task App</h1>
            
        </div>
        <Footer/>
    </div>
    
);

export default WelcomePage;