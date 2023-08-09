import { myActionsProductList } from "../reducers/productReducers";

import axios from 'axios';
export const listProducts=(keyword='')=>async (dispatch)=>{
    try{
        dispatch({loading:true,type:'PRODUCTS_LIST_REQUEST'})
        const {data}=await axios.get( `/api/products/${keyword}`)
        dispatch({loading:false,type:'PRODUCTS_LIST_SUCCESS',payload:data})
    }
    catch(error){
        dispatch({loading:false,type:'PRODUCTS_LIST_FAIL',payload:error.response&&error.response.data.detail?error.response.data.detail:error.message})
    }
}

export const listProductDetails=(id)=>async (dispatch)=>{
 
    try{
        dispatch({loading:true,type:'PRODUCTS_DETAILS_REQUEST'})
        const {data}=await axios.get(`/api/products/${id}/`)
        dispatch({loading:false,type:'PRODUCTS_DETAILS_SUCCESS',payload:data})
    }
    catch(error){
        dispatch({laoding:false,type:'PRODUCTS_DETAILS_FAIL',payload:error.response&&error.response.data.detail?error.response.data.detail:error.message})
    }
}


export const deleteProduct= (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type:'PRODUCTS_DELETE_REQUEST'
        })
      const {
        userLogin:{userInfo},
      }=getState()
  
  
      const config={
        
          headers:{
          // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
            'Content-Type': 'application/json',
            Authorization:`Bearer ${userInfo.token}` 
          }
      }
      const { data } = await axios.delete(
          `/api/products/delete/${id}/`,
          config
      );
    
      dispatch({
        type: 'PRODUCTS_DELETE_SUCCESS',
       
      });

    } 
    catch (error) {
      dispatch({
        type: 'PRODUCTS_DELETE_FAIL',
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  
export const createProduct= () => async (dispatch,getState) => {
  try {
      dispatch({
          type:'PRODUCTS_CREATE_REQUEST'
      })

    const {
      userLogin:{userInfo},
    }=getState()


    const config={
      
        headers:{
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
          'Content-Type': 'application/json',
          Authorization:`Bearer ${userInfo.token}` 
        }
    }
    const { data } = await axios.post(
      
        '/api/products/create/',
        //we are not sending from data we just send an empty object
        {},
        config,
        
    );
  
    dispatch({
      type: 'PRODUCTS_CREATE_SUCCESS',
     payload:data,
    });

  } 
  catch (error) {
    dispatch({
      type: 'PRODUCTS_CREATE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

  
export const updateProduct= (product) => async (dispatch,getState) => {
  try {
      dispatch({
          type:'PRODUCTS_UPDATE_REQUEST'
      })

    const {
      userLogin:{userInfo},
    }=getState()


    const config={
      
        headers:{
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
          'Content-Type': 'application/json',
          Authorization:`Bearer ${userInfo.token}` 
        }
    }
    const { data } = await axios.put(
      
        `/api/products/update/${product._id}/`,
        //we are not sending from data we just send an empty object
        product,
        config,
        
    );
  
    dispatch({
      type: 'PRODUCTS_UPDATE_SUCCESS',
     payload:data,
    });

    dispatch({
      type: 'PRODUCTS_DETAILS_SUCCESS',
      payload:data,
   
    });

  } 
  catch (error) {
    dispatch({
      type: 'PRODUCTS_UPDATE_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const createProductReview= (productId,review) => async (dispatch,getState) => {
  try {
      dispatch({
          type:'PRODUCTS_CREATE_REVIEW_REQUEST'
      })

    const {
      userLogin:{userInfo},
    }=getState()


    const config={
      
        headers:{
        // we need to send the authorization headers as our /users/profile is a restriccetd route for authenticated users only
          'Content-Type': 'application/json',
          Authorization:`Bearer ${userInfo.token}` 
        }
    }
    const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config,
        
    );
  
    dispatch({
      type: 'PRODUCTS_CREATE_REVIEW_SUCCESS',
     payload:data,
    });


  } 
  catch (error) {
    dispatch({
      type: 'PRODUCTS_CREATE_REVIEW_FAIL',
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listTopProducts=()=>async (dispatch)=>{
   
  try{
      dispatch({loading:true,type:'PRODUCTS_TOP_REQUEST'})
      const {data}=await axios.get(`/api/products/top/`)
      dispatch({loading:false,type:'PRODUCTS_TOP_SUCCESS',payload:data})
  }
  catch(error){
      dispatch({laoding:false,type:'PRODUCTS_TOP_FAIL',payload:error.response&&error.response.data.detail?error.response.data.detail:error.message})
  }
}
