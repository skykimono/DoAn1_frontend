import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LoginForm() {
  return (
    <Form>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 45,
        
    }}><h1 style={{fontSize: 85,fontWeight:'bolder'}}>Login</h1></div>
      <Form.Group className="mb-3" controlId="formBasicEmail" style={{
        height: 'auto',
        weight: 'auto',
      }}>
        <Form.Label style={{fontSize: 20,}}>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" style={{fontsize: 20, width: 500, height: 50, borderColor: 'grey'}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"style={{fontSize: 20,}}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{fontsize: 20, width: 500, height: 50,borderColor: 'grey'}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <Button variant="primary" type="submit" style={{fontSize: 20, width: 110, height: 50}} > Login</Button></div>
    </Form>
  );
}

export default LoginForm;