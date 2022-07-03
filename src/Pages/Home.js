import axios from '../apis/axios-api';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomNavbar from '../Components/CustomNavbar'
import MyNav from '../Components/MyNav'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { update } from '../redux/user/userState';

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
        }, 60000)
        return () => {
            clearInterval(myinterval)
          }

    }, [user])

    return (<>
        <CustomNavbar />
    </>)
}