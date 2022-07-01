import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from '../apis/axios-api';
import config from '../config';
import { useState, useEffect } from 'react';


const LOGIN_URL = '/auth/login'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result,setResult] = useState("");

  //const [user, setUser] = useState(
   // {
     // username: 'dat',
      //password: '123'
    //}
  //)

  const [res, setRes] = useState('01');


  
  const handleLogin = async (e) => {

    e.preventDefault();
    
    try {
      const data = {
        username: username,
        password: password
      }
      console.log(data);
      const response = await axios.post(LOGIN_URL,data,
      {
        headers: { 'Content-Type': 'application/json' },
        'Access-Control-Allow-Credentials':true
    });

    console.log(response);
    setResult(response.data);

    }
    catch(err){
      console.log(err)
    }
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
       
    </Form>
  
  );
}

export default LoginForm;