import React from 'react'
import CustomNavbar from '../Components/CustomNavbar'
import { color, Container, fontStyle } from '@mui/system';
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'
import { useNavigate } from 'react-router-dom';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    let navigate = useNavigate();

    const getAllCategories = async () => {
        const res = await axios.get(`${config.URL}category`)
        setCategories(res.data);
      }
    
      useEffect(() => {
        getAllCategories();
      },[categories])

  return (
    <div style={{backgroundColor: 'black',minHeight:'762px'}}>
        <CustomNavbar />
        <div style={{height: 100}}></div>
        <Container maxWidth='lg'>
            <h1 style={{fontSize: '5rem', color: 'white'}}>All Categories:</h1>
        {categories.map((category, index)=>
        <h1 key={index} 
        style={{color: 'aqua', cursor: 'pointer' }} 
        onClick={()=>{navigate('/categories/'+category)}}>{category}
        </h1>
        )}
        </Container>
        <div style={{height: 300}}></div>
        </div>
  )
}

export default AllCategories