import { Link } from 'react-router-dom';
import './NavBar.css';
import coolpanda from "../pics/coolpanda.jpeg";


const NavBar = () => {
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
            </ul>
        </nav>
    );
}

export default NavBar;