import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import Message from "../message/message";
import Loader from "../loader/loader";
import FormContainer from "../form-container/FormContainer";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { myActionsProductList } from "../../reducers/productReducers";
import { updateProduct } from "../../actions/productActions";
import axios from "axios";
function EditProductScreen({ children }) {
  const params = useParams();
  const productId = params.id;

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  const dispatch = useDispatch();

  //bring the initial state passed in the user reducer
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
    product:createdProduct
  } = productUpdate;

  const uploadFileHandler=async(e)=>{
    // console.log('File is uploading ')
    const file=e.target.files[0]
    const formData=new FormData()

    formData.append('images',file)
    formData.append('product_id',productId)

    setUploading(true)

    try {
      const config={
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data}=await axios.post('/api/products/upload/',formData,config)
      
      setImage(image)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }

  }


  //if userinfo exist we want to redirect
  useEffect(() => {
   
    if (successUpdate) {
        
        dispatch({ type: myActionsProductList.UPDATE_RESET })
        navigate("/admin/productList")
      } 
      else {
        //if we dont have details we call the action or we update the state
        if (!product.name || parseInt(product._id) !== parseInt(productId)) {
          //that is if there is no username or the id which we get form params is not same of the user
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setBrand(product.brand);
          setPrice(product.price);
          setImage(product.image);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setCategory(product.category);
        }
      }
     
  }, [dispatch, product, productId, navigate,successUpdate]);

  const submitHandler = (e) => {
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
    e.preventDefault();
    dispatch(updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
      countInStock,
        description
  }))
  
  };

  return (
    <Fragment>
      <Link to="/admin/productList">Go Back</Link>
      <FormContainer>
        <h1>Edit Products</h1>
        {loadingUpdate &&<Loader></Loader>}
        {errorUpdate &&  <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>NAME:</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Username"
                value={name}
                //The target event property returns the element that triggered the event. syntax event.target
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
              <Form.Control
              type='file'
              id='image-file'
              label='Choose File '
              onChange={uploadFileHandler}
              >
              
              </Form.Control>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Stock:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(event) => setCountInStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></Form.Control>
            </Form.Group>

            {/*
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></Form.Control>
            </Form.Group>
        */}
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
}
export default EditProductScreen;
