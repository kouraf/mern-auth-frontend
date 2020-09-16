import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserContext from '../context/UserContext';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData } = useContext(UserContext);
    const [cookies, setCookie] = useCookies(['userData']);
    const handleLogin = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/users/signin`, { email, password })
            .then(res => {
                setCookie('userData', res.data);
                setUserData(cookies.userData);
                setEmail('');
                setPassword('');
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="container">
            <Form onSubmit={handleLogin}>
                <FormGroup row>
                    <Label for="Email" sm={2} >Email</Label>
                    <Col sm={10}>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="Email" placeholder="Email" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Password" sm={2} >Password</Label>
                    <Col sm={10}>
                        <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="Password" placeholder="Password" />
                    </Col>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}
