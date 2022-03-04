import React from 'react'
import { BsCart2 } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './header.css'

const Header = () => {
    let total = 0;
    const { cartItems } = useSelector(state => state.cartReducer)
    cartItems.map((obj) => {
        total += obj.quantity
    });
    const x = JSON.parse(localStorage.getItem('currentUser'))
    const btnLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cartItems');
        window.location.reload();
    }



    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>RMart</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link>Hey {x.displayName} !!</Nav.Link>
                            <Nav.Link as={NavLink} onClick={btnLogout} to='/Login'>Logout</Nav.Link>
                            <Nav.Link as={NavLink} to='/Orders'>Orders</Nav.Link>
                            <Nav.Link as={NavLink} to='/Cart'>
                                <BsCart2 />
                                {total}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header