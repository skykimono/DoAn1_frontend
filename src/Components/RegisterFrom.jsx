import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from '../apis/axios-api';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const REGISTER_URL = '/auth/register';

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validname, setValidName] = useState(false);
  const [regis, setRegis] = useState(false);
  const [regisfail, setRegisfail] = useState(false);
  let navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('accessToken')!==null)
    {navigate('/')}
  })

  useEffect(()=>{
    setValidUsername(username!=='')
  })

  useEffect(()=>{
    setValidName(name!=='')
  })
  useEffect(() => {
    setRegis(false);
    setRegisfail(false);
}, [username, password,name,repassword])

  useEffect(() => {
    setValidPassword(password!=='');
    setValidMatch(password === repassword);
    console.log(validMatch)
}, [password, repassword])

  const handleRegister = async(e) =>{
    e.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
        fullname: name
      }
      const response = await axios.post(REGISTER_URL, data,
        {
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Credentials': true
        });

        console.log(response.data)
        setRegis(true)
  }

  catch(err){
    console.log(err)
    setRegisfail(true)
  }
}


  return (
    <Form>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 45,
      
  }}><h1 style={{fontSize: 85,fontWeight:'bolder'}}>Register</h1></div>
    <Form.Group className="mb-3" controlId="formUsername" style={{
      height: 'auto',
      weight: 'auto',
    }}>
      <Form.Label style={{fontSize: 20,}}>Username</Form.Label>
      <Form.Control type="username" placeholder="Enter username" style={{fontsize: 20, width: 500, height: 50, borderColor: 'grey'}}
     onChange={(e) => setUsername(e.target.value)}
     value={username}/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formName" style={{
      height: 'auto',
      weight: 'auto',
    }}>
      <Form.Label style={{fontSize: 20,}}>FullName</Form.Label>
      <Form.Control type="name" placeholder="Enter your name" style={{fontsize: 20, width: 500, height: 50, borderColor: 'grey'}}
       onChange={(e) => setName(e.target.value)}
       value={name}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword"style={{fontSize: 20,}}>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder=" Enter your Password" style={{fontsize: 20, width: 500, height: 50,borderColor: 'grey'}}
       onChange={(e) => setPassword(e.target.value)}
       value={password}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword2"style={{fontSize: 20,}}>
      <Form.Label>Password Confirm</Form.Label>
      <Form.Control type="password" placeholder="Re-type password" style={{fontsize: 20, width: 500, height: 50,borderColor: 'grey'}}
      onChange={(e) => setRepassword(e.target.value)}
      value={repassword}
      required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
      
      />
      <p id="confirmnote" className={!validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.</p>
    </Form.Group>
    <Alert show={regis}  variant='success'>
          Create Account Successfully!
        </Alert>
        <Alert show={regisfail}  variant='danger'>
          Register Fail! Please choose another Username!
        </Alert>
    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <Button variant="primary" type="submit" style={{fontSize: 20, width: 110, height: 50}}  disabled={!validMatch||!validPassword||!validUsername||!validname}
      onClick={e => handleRegister(e)}> Register</Button></div>
      <p style ={{fontSize: 20,}}>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">LOGIN</a>
                        </span>
                    </p>
  </Form>
  );
}

export default RegisterForm;