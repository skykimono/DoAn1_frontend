import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
import config from '../config'


const sampleCategories = [
  "Living",
  "Programming"
]

export default function CustomNavbar() {
    const [categories,setCategories] = useState(sampleCategories);



    const getAllCategories = async () => {
      const res = await axios.get(`${config.URL}category`)
      console.log(res.data);
      setCategories(res.data);
    }

    useEffect( () => {
      getAllCategories();
    },[])
    


    return(
        <>
       <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to ="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to ="/">Home</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categories.map(category => <NavDropdown.Item href="#action/3.1">{category}</NavDropdown.Item>)}  
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="#action/3.4">
                All Categories
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to ="/login">Login</Nav.Link>
            <Nav.Link as={Link} to ="/register">Register</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></>
    )
}