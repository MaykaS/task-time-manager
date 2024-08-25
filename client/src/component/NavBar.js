import { Link,useNavigate } from 'react-router-dom';
import './NavBar.css';
import coolpanda from "../pics/coolpanda.jpeg";


const NavBar = () => {
    const navigate = useNavigate(); 
    const handleLogout = () =>{
        localStorage.removeItem('authToken');
        alert("loggedout!");
        navigate("/");
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
                <button onClick={handleLogout} as={Link} to="/">Logout</button>
            </ul>
        </nav>
    );
}

export default NavBar;