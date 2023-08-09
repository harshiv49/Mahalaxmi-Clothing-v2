import { Fragment, useState } from "react";
import { Button,Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBox(){
    const [keyword,setKeyword]=useState('')
    const navigate=useNavigate()
    const location=useLocation()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }
        else{
            navigate(location.pathname)
        }
    }
    return (
        <Fragment>
        <Form onSubmit={submitHandler} style={{display:'flex',margin:'10px'}}>
       
        <Form.Control
        type='text'
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
        />
          
        <Button
        type='submit'
        variant='outline-success'
        className="p-2"
        style={{marginLeft:'8px'}}
        >
            Submit
        </Button> 
    
        </Form>
        </Fragment>
    )
}
export default SearchBox;