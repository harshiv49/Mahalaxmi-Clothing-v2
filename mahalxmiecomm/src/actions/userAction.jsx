import { myActionsUsers } from "../reducers/userReducers";
import axios from 'axios'; 
import { myOrderTypes } from "../reducers/orderReducer";


//login
export const login = (email, password) => async (dispatch) => {
  try {
    const config={
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        }
    }

    dispatch({ type: myActionsUsers.LOGIN_REQUEST });
    const { data } = await axios.post(
        "/api/users/login/",
        {'email':email,'password':password},
        config
    );

    dispatch({
      type: myActionsUsers.LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo',JSON.stringify(data))   
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


//logout 
export const logout=()=>(dispatch)=>{
  localStorage.removeItem('userInfo')
  dispatch({type:myActionsUsers.LOGOUT})
  dispatch({type:myActionsUsers.LIST_RESET})
  dispatch({type:myOrderTypes.ORDER_LIST_MY_RESET})
}



//register
export const register = (name,email, password) => async (dispatch) => {
  try {
    const config={
        headers:{
     
          'Content-Type': 'application/json' 
        }
    }

    dispatch({ type: myActionsUsers.REGISTER_REQUEST });
    const { data } = await axios.post(
        "/api/users/register/",
        {'name':name,'email':email,'password':password,},
        config
    );
      console.log("mai data hun",data)
    dispatch({
      type: myActionsUsers.REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: myActionsUsers.LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo',JSON.stringify(data))   
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//from frontend when we call this action we pass in the id 
export const getUserDetails = (id) => async (dispatch,getState) => {
  try {
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

    dispatch({ type: myActionsUsers.DETAILS_REQUEST });
    const { data } = await axios.get(
        `/api/users/${id}`,
        
        config
    );
      console.log("mai data hun",data)
    dispatch({
      type: myActionsUsers.DETAILS_SUCCESS,
      payload: data,
    });
    
    
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



//from frontend when we call this action we pass in the id 
export const updateUserProfile = (user) => async (dispatch,getState) => {
  try {
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

    dispatch({ type: myActionsUsers.PROFILE_REQUEST });
    const { data } = await axios.put(
        `/api/users/profile/update/`,
        user,
        config
    );
  
    dispatch({
      type: myActionsUsers.PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: myActionsUsers.LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo',JSON.stringify(data))
    
    
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};




//from frontend when we call this action we pass in the id 
export const listUsers = () => async (dispatch,getState) => {
  try {
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

    dispatch({ type: myActionsUsers.LIST_REQUEST });
    const { data } = await axios.get(
        `/api/users/`,
        config
    );
  
    dispatch({
      type: myActionsUsers.LIST_SUCCESS,
      payload: data,
    });

    
    
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


//from frontend when we call this action we pass in the id 
export const deleteUser = (id) => async (dispatch,getState) => {
  try {
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

    dispatch({ type: myActionsUsers.DELETE_REQUEST });
    const { data } = await axios.delete(
        `/api/users/delete/${id}/`,
        config
    );
  
    dispatch({
      type: myActionsUsers.DELETE_SUCCESS,
      payload: data,
    });

    
    
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const userEditFromAdmin = (user) => async (dispatch,getState) => {
  try {
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

    dispatch({ type: myActionsUsers.EDIT_ADMIN_REQUEST });
    const { data } = await axios.put(
        `/api/users/update/${user._id}/`,
        user,
        config
    );
  
    dispatch({
      type: myActionsUsers.EDIT_ADMIN_SUCCESS,
     
    });

    dispatch({
      type: myActionsUsers.DETAILS_SUCCESS,
      payload:data,
     
    });

    
    
  } 
  catch (error) {
    dispatch({
      type: myActionsUsers.EDIT_ADMIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};