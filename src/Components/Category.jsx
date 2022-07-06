import React from 'react'
import { Grid } from '@mui/material'
import axios from '../apis/axios-api';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import Container from 'react-bootstrap/Container';

const Category = () => {
    const { category } = useParams();
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const getPostbyCategory = async() =>{
        const res = await axios.get('post/?category='+category);
        setCategories(res.data);
    }

    useEffect(() => {
        getPostbyCategory();
      }, 
      [category])


  return (
    <div style={{backgroundColor: 'grey',minHeight:'762px'}}>
        <CustomNavbar/>
        <div style={{height: 100}}></div>
        <Container maxWidth='lg'>
    <Grid container spacing={6}>
     {categories.map((cate) =>{ return(
         <Grid item xs={4}key={cate._id}>
         <Card sx={{ maxWidth: 345, maxHeight: 410 }} variant='dark'>
                 <CardActionArea  onClick={()=>{navigate('/post/'+cate._id)}}>
                   <CardMedia
                     component="img"
                     height="200"
                     image={`${cate.photo}`}
                   />
                   <CardContent>
                     <Typography gutterBottom variant="h4" component="div">
                       {cate.title}
                     </Typography>
                     <Typography gutterBottom variant="h8" component="div" style={{ color: 'aqua' }}>
                       {cate.categories[0]}
                     </Typography>
                     <Typography gutterBottom variant="h7" component="div">
                       {`By: ${cate.username}`}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       {cate.content}
                     </Typography>
                   </CardContent>
                 </CardActionArea>
                 </Card>
       </Grid>
     )})}
  </Grid>
  </Container>
  <div style={{height: 500}}></div>
  </div>)
}

export default Category