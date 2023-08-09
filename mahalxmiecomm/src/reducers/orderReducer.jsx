export const myOrderTypes={
    ORDER_CREATE_REQUEST:'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS:'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAIL:'ORDER_CREATE_FAIL',
    ORDER_CREATE_RESET:'ORDER_CREATE_RESET',

    ORDER_DETAILS_REQUEST:'ORDER_DETAILS_REQUEST',
    ORDER_DETAILS_SUCCESS:'ORDER_DETAILS_SUCCESS',
    ORDER_DETAILS_FAIL:'ORDER_DETAILS_FAIL',
    ORDER_DETAILS_RESET:'ORDER_DETAILS_RESET',

    ORDER_PAY_REQUEST:'ORDER_PAY_REQUEST',
    ORDER_PAY_SUCCESS:'ORDER_PAY_SUCCESS',
    ORDER_PAY_FAIL:'ORDER_PAY_FAIL',
    ORDER_PAY_RESET:'ORDER_PAY_RESET',

    ORDER_DELIVER_REQUEST:'ORDER_DELIVER_REQUEST',
    ORDER_DELIVER_SUCCESS:'ORDER_DELIVER_SUCCESS',
    ORDER_DELIVER_FAIL:'ORDER_DELIVER_FAIL',
    ORDER_DELIVER_RESET:'ORDER_DELIVER_RESET',


    
    ORDER_ADMIN_LIST_REQUEST:'ORDER_ADMIN_LIST_REQUEST',
    ORDER_ADMIN_LIST_SUCCESS:'ORDER_ADMIN_LIST_SUCCESS',
    ORDER_ADMIN_LIST_FAIL:'ORDER_ADMIN_LIST_FAIL',
    ORDER_ADMIN_LIST_RESET:'ORDER_ADMIN_LIST_RESET',


    ORDER_LIST_MY_REQUEST:'ORDER_LIST_MY_REQUEST',
    ORDER_LIST_MY_SUCCESS:'ORDER_LIST_MY_SUCCESS',
    ORDER_LIST_MY_FAIL:'ORDER_LIST_MY_FAIL',
    ORDER_LIST_MY_RESET:'ORDER_LIST_MY_RESET',

}

export const orderCreateReducer=(state={},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_CREATE_REQUEST:
            return{
                loading:true
            }
        case myOrderTypes.ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                success:true,
                //state will be uploaded wth the payload of get request
                 order:payload
            }
        case myOrderTypes.ORDER_CREATE_FAIL:
            return{
                loading:false,
                error:payload
            }

        case myOrderTypes.ORDER_CREATE_RESET:
            return{}
        default:
            return state

    }
}


export const orderDetailsReducer=(state={loading:true,order:[],shippingAddress:{},user:{}},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case myOrderTypes.ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                success:true,
                 order:payload
            }
        case myOrderTypes.ORDER_DETAILS_FAIL:
            return{
                loading:false,
                error:payload
            }

        case myOrderTypes.ORDER_DETAILS_RESET:
            return{loading:true,orderItems:[],shippingAddress:{}}
        default:
            return state

    }
}




export const orderPayReducer=(state={},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_PAY_REQUEST:
            return{
                ...state,
                loading:true
            }
        case myOrderTypes.ORDER_PAY_SUCCESS:
            return{
                loading:false,
                success:true,
               
            }
        case myOrderTypes.ORDER_PAY_FAIL:
            return{
                loading:false,
                error:payload
            }
        case myOrderTypes.ORDER_PAY_RESET:
            return{}
        default:
            return state

    }
}


export const orderDeliverReducer=(state={},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_DELIVER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case myOrderTypes.ORDER_DELIVER_SUCCESS:
            return{
                loading:false,
                success:true,
               
            }
        case myOrderTypes.ORDER_DELIVER_FAIL:
            return{
                loading:false,
                error:payload
            }
        case myOrderTypes.ORDER_DELIVER_RESET:
            return{}
        default:
            return state

    }
}




export const adminListReducer=(state={orders:[]},action)=>{
    const {type,payload}=action  
    switch(type){
      case myOrderTypes.ORDER_ADMIN_LIST_REQUEST:
        return{
        loading:true
        }
      case myOrderTypes.ORDER_ADMIN_LIST_SUCCESS:
        return{
          loading:false,
          orders:payload
        }
        case myOrderTypes.ORDER_ADMIN_LIST_FAIL:
          return{
            loading:false,
            error:payload
          } 
      case myOrderTypes.ORDER_ADMIN_LIST_RESET:
        return{
          orders:[]
        } 

      default:
        return state

  }
}
  


export const orderListMyReducer=(state={orders:[]},action)=>{
    const {type,payload}=action
    switch(type){
        case myOrderTypes.ORDER_LIST_MY_REQUEST:
            return{
                ...state,
                loading:true
            }
        case myOrderTypes.ORDER_LIST_MY_SUCCESS:
            return{
                loading:false,
                orders:payload
               
            }
        case myOrderTypes.ORDER_LIST_MY_FAIL:
            return{
                loading:false,
                error:payload
            }
        case myOrderTypes.ORDER_LIST_MY_RESET:
            return {orders:[]}
        default:
            return state

    }
}

