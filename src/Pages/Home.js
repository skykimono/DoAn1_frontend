import axios from '../apis/axios-api';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomNavbar from '../Components/CustomNavbar'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { update } from '../redux/user/userState';
import Postlist from '../Components/Postlist';
import { Container } from '@mui/system';


const RefreshUrl = "auth/refresh"


export default function Home() {
    const user = useSelector(state => state.userState)

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
            //console.log(rs.data);
        }
        fetchData()
        const myinterval = setInterval(() => {
            fetchData()
        }, 6000)
        return () => {
            clearInterval(myinterval)
        }

        

    }, [user])

    return (<div style={{backgroundColor: '#e5e5e5',minHeight:'762px'}}>
        <CustomNavbar />
        <div style={{height: 100}}></div>

        <Container maxWidth='lg'>
            <Postlist/>
        </Container>
        <div style={{height: 500}}></div>


    </div>)
}