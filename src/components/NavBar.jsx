import React, { useContext } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

import UserContext from '../context/UserContext';

const NavBar = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(['userData']);
    const handleLogOut = () => {
        removeCookie('userData');
        setUserData({
            token: null,
            user: {}
        });
    }
    return (
        <div className="mb-4">
            <Navbar expand="xs">
                <NavLink to="/" tag={RRNavLink}>Mern-Auth</NavLink>
                <Nav className="ml-auto" navbar>
                    {userData && userData.token ?
                        <NavItem>
                            <Button onClick={handleLogOut}>LogOut</Button>
                        </NavItem>
                        :
                        <>
                            <NavItem>
                                <NavLink to="/login" tag={RRNavLink}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/register" tag={RRNavLink}>Register</NavLink>
                            </NavItem>
                        </>}
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;