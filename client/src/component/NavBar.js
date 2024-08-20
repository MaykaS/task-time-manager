import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/ListView">ListView</Link>
                    <Link to="/CalendarView">CalendarView</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;