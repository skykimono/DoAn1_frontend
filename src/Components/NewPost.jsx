import React from 'react'
import axios from '../apis/axios-api';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import CustomNavbar from '../Components/CustomNavbar'
import { Container } from '@mui/system';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';


const RefreshUrl = "auth/refresh"


function NewPost() {
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');
    const [validTitle, setValidTitle] = useState(false);
    const [vaidContent, setValidContent] = useState(false);
    const [validPhoto, setValidPhoto] = useState(false);
    const [validCate, setValidCate] = useState(false);
    const [submitsuccess, setSubmitsuccess] = useState(false);
    const [submitfail, setSubmitfail] = useState(false);
    const user = useSelector(state => state.userState);



    useEffect(()=>{
        setValidTitle(title!=='')
      })

      useEffect(()=>{
        setValidContent(content!=='')
      })
      useEffect(()=>{
        setValidPhoto(photo!=='')
      })
      useEffect(()=>{
        setValidCate(category!=='')
      })


      const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
          const data = {
             post: {
                title: title,
                desc: " ",
                photo: photo,
                content: content
            },
            categories :[
                category
            ]
          }
          const response = await axios.post('/post', data,
            {
              headers: { 'Content-Type': 'application/json', 'authorization': user.token },
              'Access-Control-Allow-Credentials': true
            });
    
            console.log(response.data)
            setSubmitsuccess(true)
      }
    
      catch(err){
        console.log(err)
        setSubmitfail(true)
      }
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






  return (
    <div>
        <div style={{backgroundColor: 'black',minHeight:'762px'}}>
        <CustomNavbar />
        <div style={{height: 100}}></div>
        <Container maxWidth='lg'>
            <h1 style={{color: 'white', fontSize: '5rem'}}>Write new post:</h1>
            <div style={{height: '100px'}}></div>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Category:</InputGroup.Text>
        <Form.Control
          placeholder="Category"
          aria-label="Cate"
          aria-describedby="basic-addon1"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
      </InputGroup>
      <div style={{height: '35px'}}></div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Put your photo URL here..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => setPhoto(e.target.value)}
          value={photo}
        />
        <InputGroup.Text id="basic-addon2">@photoURL</InputGroup.Text>
      </InputGroup>
      <div style={{maxWidth: '300px', maxHeight: '300px'}}><img style={{maxWidth: '300px', maxHeight: '300px'}}  src={`${photo}`} /></div>
      <div style={{height: '35px'}}></div>
        <Col md>
        <FloatingLabel controlId="floatingInputGrid" label="Title">
          <Form.Control type="email" placeholder="Title"
          style={{fontSize: '1.5rem', height:'75px' }}  onChange={(e) => setTitle(e.target.value)}
          value={title}/>
        </FloatingLabel>
      </Col>
      <FloatingLabel controlId="floatingTextarea2" label="Content">
        <Form.Control
          as="textarea"
          placeholder="Content"
          style={{ height: '500px', fontSize: '2rem' }}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </FloatingLabel>
      <Alert show={submitsuccess}  variant='success'>
          Post Created!
        </Alert>
        <Alert show={submitfail}  variant='danger'>
          Something wrong!! Maybe your title is already exist?!!
        </Alert>
      <div style={{height: '50px'}}></div>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <Button variant="outline-success" type="submit" style={{fontSize: 20, width: 110, height: 50}}
     disabled={!validTitle||!vaidContent||!validPhoto||!validCate}
     onClick={e => handleSubmit(e)}> Submit</Button></div>
        </Container>
        <div style={{height: '500px'}}></div>
    </div>
    </div>
  )
}

export default NewPost