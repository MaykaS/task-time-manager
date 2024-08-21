import { Link } from 'react-router-dom';
import './NavBar.css';
import coolpanda from "../pics/coolpanda.jpeg";
import { useState } from 'react';


const NavBar = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const handleLogout = () =>{
        setIsLoggedOut(true);
        alert("loggedout!");
    }
    return (
        <nav className='navbar'>
            <img src={coolpanda} alt="panda"/>
            <ul>
                <li>
                    <Link to="/ListView">ListView</Link>
                </li>
                <li>
                    <Link to="/CalendarView">CalendarView</Link>
                </li>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    );
}

export default NavBar;
//TODO: upon logout - back to welcome page with islogedin val = falses