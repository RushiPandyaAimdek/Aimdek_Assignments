import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './login.css'

const Login = () => {
    //variable declaration
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    //for login user
    const loginUser = async () => {
        if (email == "" || password == "")
            alert('enter data')
        else {
            try
            {
                const res = await auth.signInWithEmailAndPassword(email, password);
                const user = {
                    id : res.user.uid,
                    displayName : res.user.displayName
                }
                localStorage.setItem('currentUser', JSON.stringify(user))
                if (res.user.email != "") {
                    navigate('/')
                }
                else{
                    alert('invalid username or password')
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }
    return (
        <Container>
        <Row className="justify-content-md-center">
            <Col md={{ span: 6 }}>
                <Form className='login'>
                    <h3 className='text-center'>Login</h3><hr />
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" onClick={loginUser}>
                        Submit
                    </Button>
                    <br />
                    <Link to='/Register'>Click here for registration</Link>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}
export default Login