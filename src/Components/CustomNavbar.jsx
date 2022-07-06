import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { logout } from '../redux/user/userState';


const sampleCategories = [
  "Living",
  "Programming"
]

export default function CustomNavbar() {
  const user = useSelector(state => state.userState.token)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState(sampleCategories);
  let navigate = useNavigate();



  const getAllCategories = async () => {
    const res = await axios.get(`${config.URL}category`)
    console.log(res.data);
    setCategories(res.data);
  }

  useEffect(() => {
    getAllCategories();
  },[])



  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map((category, index) => <NavDropdown.Item key={index} onClick={()=>{navigate('/categories/'+category)}}>{category}</NavDropdown.Item>)}
                <NavDropdown.Divider></NavDropdown.Divider>
                <NavDropdown.Item onClick={()=>{navigate('/allcategories')}}>
                  All Categories
                </NavDropdown.Item>
              </NavDropdown>
              {
                !user ?
                  <React.Fragment>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </React.Fragment>
                  :
                  <React.Fragment>
                  <Nav.Link as={Link} to="/mypost">My Post</Nav.Link>
                  <Nav.Link className="justify-content-end" style={{color: 'red'}} onClick={() => {
                    dispatch(logout())
                  }}>LOG OUT</Nav.Link>
                 </React.Fragment>
              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar></>
  )
}