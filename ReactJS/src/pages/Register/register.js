import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './register.css'

const Register = () => {
    //variable declaration
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [displayname, setDisplayname] = useState('')

    //for register user
    const registerUser = async () => {
        if(email === "" || password === "" || confirmPassword === "" || displayname === "")
            alert('enter data')
        else{
            if (password == confirmPassword) {
                try{
                    const resp = await auth.createUserWithEmailAndPassword(email, password, displayname)
                    resp.user.updateProfile({
                        displayName: displayname
                    })
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    setDisplayname("")
                    alert('User register succesfully')
                }
                catch(error){
                    console.log(error)
                }
            } else {
                alert('Password doesnt match')
            }
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={{ span: 6 }}>
                    <Form className='register'>
                        <h3 className='text-center'>Register</h3><hr />
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>display Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter display name" value={displayname} onChange={(e) => { setDisplayname(e.target.value) }} />
                        </Form.Group>
                        <Button variant="primary" onClick={registerUser}>
                            Submit
                        </Button>
                        <br />
                        <Link to='/Login'>Click here for login</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default Register