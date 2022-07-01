import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import config from '../config';
import { useState, useEffect } from 'react';




function LoginForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  //const [user, setUser] = useState(
   // {
     // username: 'dat',
      //password: '123'
    //}
  //)

  const [res, setRes] = useState('01');

  const postLoginrq = async (pusername,ppassword) => {  
    try{
    const response = await axios.post(`${config.URL}auth/login`,{username: pusername,
    password: ppassword});
    console.log(response);
    return response.data}
    catch(err){
      return err;
    }

  }

  const handleLogin = async (e) => {
    e.preventDefautl();
    const data = await postLoginrq(username,password);
    console.log(data);
    setRes(data);
  }
  

  return (
    <Form>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 45,
        
    }}><h1 style={{fontSize: 85,fontWeight:'bolder'}}>Login</h1></div>
      <Form.Group className="mb-3" controlId="userinput">
        <Form.Label style={{fontSize: 20,}}>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username"  style={{fontsize: 20, width: 500, height: 50, borderColor: 'grey',}}
       onChange={(e) => setUsername(e.target.value)}
       value={username}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordinput"style={{fontSize: 20,}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{fontsize: 20, width: 500, height: 50,borderColor: 'grey'}}
         input = ''
         onChange={(e) => setPassword(e.target.value)}
         value={password}/>
      </Form.Group>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <Button variant="primary" type="submit" style={{fontSize: 20, width: 110, height: 50}} 
        onClick = {e=> handleLogin(e)}> Login</Button></div>
        <p>{}</p>
    </Form>
  
  );
}

export default LoginForm;