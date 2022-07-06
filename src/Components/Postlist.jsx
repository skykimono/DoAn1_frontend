import React from 'react'
import { Grid } from '@mui/material'
import axios from '../apis/axios-api';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect, useState } from 'react';
import { postupdate } from '../redux/post/postlistState';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const getallpostURL = 'post'

const Postlist = () => {
  const postlist = useSelector(state => state.poslistState.postlist)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const getAllPosts = async () => {
    const res = await axios.get('post')
    dispatch(postupdate(res.data))

  }


  useEffect(() => {
    getAllPosts();
  }, []
  )

  return (
    <Grid container spacing={6}>
      { JSON.parse(localStorage.getItem("postlist")).map((item) =>{ return(
         <Grid item xs={4}key={item._id}>
         <Card sx={{ maxWidth: 345 , maxHeight: 410}} variant='dark'>
                 <CardActionArea  onClick={()=>{navigate('post/'+item._id)}}>
                   <CardMedia
                     component="img"
                     height="200"
                     image={`${item.photo}`}
                   />
                   <CardContent>
                     <Typography gutterBottom variant="h4" component="div">
                       {item.title}
                     </Typography>
                     <Typography gutterBottom variant="h8" component="div" style={{ color: 'aqua' }}>
                       {item.categories[0]}
                     </Typography>
                     <Typography gutterBottom variant="h7" component="div">
                       {`By: ${item.username}`}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       {item.content}
                     </Typography>
                   </CardContent>
                 </CardActionArea>
                 </Card>
       </Grid>
      )})
     
      }
    </Grid>
  )
}

export default Postlist