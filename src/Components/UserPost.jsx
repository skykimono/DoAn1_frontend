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
import { useSelector } from 'react-redux/es/exports';

const RefreshUrl = "auth/refresh"


const UserPost = () => {
    let navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.userState)


    const getPostbyUser = async() =>{
        const res = await axios.get('post/myPosts',
        {headers: {'Content-Type': 'application/json', 'authorization': user.token },
        'Access-Control-Allow-Credentials': true }
        );
        setPosts(res.data);
    }

    useEffect(()=>{
        if(localStorage.getItem('accessToken')===null)
        {navigate('/')}
      })
    

    useEffect(() => {
        const data = {
            refreshToken: JSON.parse(localStorage.getItem("refeshToken"))

        }
        const fetchData = async () => {
            const rs = await axios.post(RefreshUrl, data,
                {
                    headers: { 'Content-Type': 'application/json', 'authorization': user.token },
                    'Access-Control-Allow-Credentials': true
                });
            localStorage.setItem("accessToken", JSON.stringify(rs.data.accessToken))
            console.log(rs.data);
        }
        fetchData()
        const myinterval = setInterval(() => {
            fetchData()
        }, 6000)
        return () => {
            clearInterval(myinterval)
        }
    }, [user])


    useEffect(() => {
        getPostbyUser();
      }, 
      [posts])

  return (
    <div style={{backgroundColor: 'grey',minHeight:'762px'}}>
    <CustomNavbar/>
    <div style={{height: 100}}></div>
    <Container maxWidth='lg'>
<Grid container spacing={6}>
 {posts.map((cate) =>{ return(
     <Grid item xs={4}key={cate._id}>
     <Card sx={{ maxWidth: 345, maxHeight: 410 }} variant='dark'>
             <CardActionArea  onClick={()=>{navigate('post/'+cate._id)}}>
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
</div>)
}

export default UserPost