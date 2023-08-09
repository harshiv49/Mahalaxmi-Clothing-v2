import Home from "./routes/home/home_component";
import { Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import Navigation from "./routes/navigation/navigation_component";
import ProductScreen from "./components/product-view/product_view_component";
import Shop from "./routes/shop/shop_component";
import Checkout from "./routes/checkout/checkout_component.jsx";
import LoginScreen from "./components/login-screen/loginScreen";
import RegisterScreen from "./components/register-screen/registerScreen";
import ProfileScreen from "./components/profile-screen/ProfileScreen";
import ShippingScreen from "./components/shipping-screen/ShippingScreen";
import PaymentScreen from "./components/payment-screen/PaymentScreen";
import PlaceOrder from "./components/place-order/PlaceOrderScreen";
import OrderScreen from "./components/order-screen/OrderScreen";
import UserListScreen from "./components/user-login/userListScreen";
import EditUserScreen from "./components/user-admin-edit/userEdit";
import AdminProductListScreen from "./components/product-list-admin/adminProductList";
import EditProductScreen from "./components/product-edit/productEditScreen";
import AdminOrderListScreen from "./components/order-admin-list/orderAdminScreen";
function App() {
  //we use Routes to wrap anything that is routable inside this app component
  //Route is a component which renders a specific component if it matches the path

  //index true will render the component on the route of the parent component
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index={true} element={<Home></Home>} />
        <Route path="shop" element={<Shop></Shop>}></Route>
        <Route path="checkout" element={<Checkout></Checkout>} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="payment" element={<PaymentScreen />} />
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="placeorder" element={<PlaceOrder></PlaceOrder>} />
        <Route path="order/:id" element={<OrderScreen />} />
        <Route path="admin/userList" element={<UserListScreen />} />
        <Route path="products/:id" element={<ProductScreen />} />
        <Route path="admin/user/:id/edit" element={<EditUserScreen />} />
        <Route path="admin/productList" element={<AdminProductListScreen/>} />
        <Route path="admin/orderList" element={<AdminOrderListScreen/>} />
        <Route path="admin/product/:id/edit" element={<EditProductScreen />} />
      </Route>
    </Routes>
  );
}
export default App;
// import axios from "axios";

// function App() {

// //Function to load razorpay script for the display of razorpay payment SDK.
//   function loadRazorpayScript(src) {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => {
//             resolve(true);
//         };
//         script.onerror = () => {
//             resolve(false);
//         };
//         document.body.appendChild(script);
//     });
// }

// //function will get called when clicked on the pay button.
// async function displayRazorpayPaymentSdk() {
//   const res = await loadRazorpayScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//   );

//   if (!res) {
//       alert("Razorpay SDK failed to load. please check are you online?");
//       return;
//   }

//   // creating a new order and sending order ID to backend
//   const result = await axios.post("http://127.0.0.1:8000/api/payments/razorpay_order", {
//       "order_id" : "9"
//   });

//   if (!result) {
//       alert("Server error. please check are you onlin?");
//       return;
//   }

//   // Getting the order details back
//    const {merchantId=null , amount=null,currency=null,orderId=null } = result.data;

//   const options = {
//       key: merchantId,
//       amount: amount.toString(),
//       currency: currency,
//       name: "Razorpay Testing",
//       description: "Test Transaction",
//       order_id: orderId,
//       callback_url: "http://127.0.0.1:8000/razorpay_callback",
//       redirect: true,
//       prefill: {
//         name: "Swapnil Pawar",
//         email: "swapnil@example.com",
//         contact: "9999999999",
//     },
//       notes: {
//           address: "None",
//       },
//       theme: {
//           color: "#61dafb",
//       },
//   };

//   const paymentObject = new window.Razorpay(options);
//   paymentObject.open();
// }

//     return (
//         <div>
//                 <p>Razorpay Payments ! Try it Once </p>
//                 <button className="App-link" onClick={displayRazorpayPaymentSdk}>
//                     Pay Now To Test
//                 </button>
//         </div>
//     );
// }

// export default App;