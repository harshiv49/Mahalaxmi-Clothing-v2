import { useState,useEffect } from 'react';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { login } from '../../actions/userAction';
import Message from '../message/message';
import Loader from '../loader/loader';
import FormContainer from '../form-container/FormContainer';
import GoogleAuth from '../google-auth/googleAuth';
function LoginScreen({children}){
    const location = useLocation()
    const navigate = useNavigate()
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    //event handler runs when form is submitted
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    const dispatch=useDispatch()
    //the url where we want to redirect
    const redirect=location.search?location.search.split('=')[1]:'/';
    //bring the initial state passed in the user reducer 
    const userLogin=useSelector(state=> state.userLogin)
    const {error , loading ,userInfo}=userLogin
    //if userinfo exxist we wan to redirect
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    console.log('mai hu redirect',redirect)
    return(
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='Enter Email'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>

            <Button type='submit' variant='primary'>Sign in</Button>
            {/* yaha dalna hai button google wala */}
            <GoogleAuth></GoogleAuth>
            </Form>
            <Row className='py-3'>
                <Col>
                 New Customer?<Link to={redirect!=='/'?`/register/redirect=${redirect}`:'/register'}>
                 Register
                 </Link>
                
                </Col>
            </Row>
        </FormContainer>
         
    )
}
export default LoginScreen;
