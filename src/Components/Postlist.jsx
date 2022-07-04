import React from 'react'
import { Grid } from '@mui/material'
import axios from '../apis/axios-api';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { postupdate } from '../redux/post/postlistState';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const getallpostURL = 'post'

const Postlist = () => {
  const postlist = useSelector(state => state.poslistState.postlist)
  let dispatch = useDispatch()
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
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }} variant='dark'>
          {
            JSON.parse(localStorage.getItem("postlist")).map((item, index) => {
              return (
                <CardActionArea key={index}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${item.photo}`}
                    alt="green iguana"
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
              )
            })
          }

        </Card>
      </Grid>

    </Grid>
  )
}

export default Postlist