
import {Fragment, useState} from 'react';
import axios from 'axios';
import useRazorpay from "react-razorpay/src";
function RazorpayPayment({orderPrice}){
  const [amount,setAmount]=useState(parseInt(orderPrice));
  const [Razorpay] = useRazorpay();
  console.log(amount)
  const completePayment=(payment_id,order_id,signature)=>{
    axios.post('http://127.0.0.1:8000/razorpay/order/complete/',{
      "payment_id":payment_id,
      "amount":amount,
      "order_id":order_id,
      "signature":signature
    })
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  const razorpayPayment=()=>{
    axios.post('http://127.0.0.1:8000/razorpay/order/create/',{
      "amount":amount,
      "currency":"INR",
    })
    .then(function(response){
       var order_id=response.data.data.id 
        console.log("here")
       
       const options = {
        key: "rzp_test_N3mNbfTOGmD6aw", // Enter the Key ID generated from the Dashboard
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          completePayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          )
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();

     })
    .catch(function(error){ 
      console.log(error)
     })
  } 
  
  return (
    <Fragment>
      <button type="button" onClick={razorpayPayment} >PayNow</button>
    </Fragment>
  );
}

export default RazorpayPayment;