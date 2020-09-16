import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserContext from '../context/UserContext';


export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const { setUserData } = useContext(UserContext);
    const [cookies, setCookie] = useCookies(['userData']);

    const handleRegister = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/users/signup`, { email, password, passwordCheck, name })
            .then(() => {
                return axios.post(`http://localhost:5000/users/signin`, { email, password })
                    .then(res => {
                        setCookie('userData', res.data);
                        setUserData(cookies.userData);
                        setEmail('');
                        setPassword('');
                        setName('');
                        setPasswordCheck('');
                    })
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <Form onSubmit={handleRegister}>
                <FormGroup row>
                    <Label for="Name" sm={2} >Name</Label>
                    <Col sm={10}>
                        <Input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="Name" placeholder="Name" />
                    </Col>
                </FormGroup>
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
                <FormGroup row>
                    <Label for="PasswordCheck" sm={2} >Password</Label>
                    <Col sm={10}>
                        <Input onChange={(e) => setPasswordCheck(e.target.value)} value={passwordCheck} type="password" name="passwordCheck" id="PasswordCheck" placeholder="Confirme your password" />
                    </Col>
                </FormGroup>
                <Button>Submit</Button>

            </Form>
        </div>
    )
}
