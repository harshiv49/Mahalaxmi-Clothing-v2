import { useState,useEffect } from 'react';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../../actions/userAction';
import Message from '../message/message';
import Loader from '../loader/loader';
import FormContainer from '../form-container/FormContainer';

function RegisterScreen({children}){
    const location = useLocation()
    const navigate = useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [confirmPassword,setconfirmPassword]=useState('')
    const[message,setMessage]=useState('')
    //event handler runs when form is submitted
    const submitHandler=(e)=>{
        
        e.preventDefault()
        if (password!==confirmPassword){
            setMessage('passwords do not match')
        }
        else{

            dispatch(register(name,email,password))
        }

        
        
    }
    //above function is important 


    const dispatch=useDispatch()
    //the url where we want to redirect
    const redirect=location.search?location.search.split('=')[1]:'/';
    //bring the initial state passed in the user reducer 
    const userRegister=useSelector(state=> state.userRegister)
    const {error , loading ,userInfo}=userRegister
    //if userinfo exxist we wan to redirect
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    return(
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>NAME:</Form.Label>
                    <Form.Control 
                    required
                    type='name'
                    placeholder='Enter Username'
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>EMAIL:</Form.Label>
                    <Form.Control 
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    required
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    required
                    type='Confirm password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(event)=>setconfirmPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                 Have an account?<Link to={redirect!=='/'?`/login/redirect=${redirect}`:'/login'}>
                 Sign in 
                 </Link>
               
                </Col>
            </Row>
        </FormContainer>
         
    )
}
export default RegisterScreen;
