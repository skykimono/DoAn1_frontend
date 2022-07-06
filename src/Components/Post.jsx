import React from 'react'
import CustomNavbar from './CustomNavbar';

import { useParams } from "react-router-dom";
import { fontSize } from '@mui/system';
import { Container } from '@mui/system';


const Post = () => {
  const { _id } = useParams();
  return (
    <div style={{backgroundColor: 'black',minHeight:'762px'}}>
      <CustomNavbar></CustomNavbar>
      <div style={{height: 70}}></div>
      {JSON.parse(localStorage.getItem('postlist')).map((item) => {
        return (
          _id === item._id ?
            <Container key={item._id}>
              <h1 style={{ fontSize: "4rem", color: 'white' }}>{item.title}</h1>
              <div style={{height: 70}}></div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img 
              src={`${item.photo}`} 
              style={{maxHeight: '500px', maxWidth: '650px', minWidth:'650px', minHeight: '500px' }}/></div>
              <div style={{height: 40}}></div>
              <h5 style={{ color: 'aqua' }}>{item.categories}</h5>
              <h3 style={{ color: 'white' }}> {`By: ${item.username}`}</h3>
              <span style={{ fontSize: "1.2rem", color: 'white' }}>{item.content}</span> 
            </Container>
            : <div></div>
            
        )
      }
      )
      }
      <div style={{height: 500}}></div>
    </div>
  )
}

export default Post