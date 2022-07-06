import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from '../apis/axios-api';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { update } from '../redux/user/userState';
import { useNavigate } from 'react-router-dom';


const LOGIN_URL = '/auth/login'
const Profile_URL = '/user/profile'

function LoginForm() {
  const user1 = useSelector(state => state.userState.token)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);


  //const [user, setUser] = useState(
  // {
  // username: 'dat',
  //password: '123'
  //}
  //)

  useEffect(()=>{
    if(localStorage.getItem('accessToken')!==null)
    {navigate('/')}
  })


  useEffect(() => {
    setVisible(false);
}, [username, password])

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const data = {
        username: username,
        password: password
      }
      const response = await axios.post(LOGIN_URL, data,
        {
          headers: { 'Content-Type': 'application/json' },
          'Access-Control-Allow-Credentials': true
        });


      if (true) {
        dispatch(update(response.data.token))
        localStorage.setItem("refeshToken", JSON.stringify(response.data.rtoken))
        localStorage.setItem("accessToken", JSON.stringify(response.data.token))
        navigate('/')
      }
      

    }
    catch (err) {
      console.log(err)
      setVisible(true)
    }
  }


  return (
    <Form>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 45,

      }}><h1 style={{ fontSize: 85, fontWeight: 'bolder' }}>Login</h1></div>
      <Form.Group className="mb-3" controlId="userinput">
        <Form.Label style={{ fontSize: 20, }}>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" style={{ fontsize: 20, width: 500, height: 50, borderColor: 'grey', }}
          onChange={(e) => setUsername(e.target.value)}
          value={username} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordinput" style={{ fontSize: 20, }}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{ fontsize: 20, width: 500, height: 50, borderColor: 'grey' }}
          input=''
          onChange={(e) => setPassword(e.target.value)}
          value={password} />
      </Form.Group>
      <Alert show={visible}  variant='danger'>
          Login Fail!
        </Alert>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="primary" type="submit" style={{ fontSize: 20, width: 110, height: 50 }}
          onClick={e => handleLogin(e)}> Login</Button></div>
           <p style ={{fontSize: 20,}}>
                        Don't have an Account??<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">REGISTER</a>
                        </span>
                    </p>

    </Form>

  );
}

export default LoginForm;