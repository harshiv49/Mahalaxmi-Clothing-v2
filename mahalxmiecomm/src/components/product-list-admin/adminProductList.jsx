import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts,deleteProduct, createProduct} from "../../actions/productActions";
import Loader from "../loader/loader";
import Message from "../message/message";
import { myActionsProductList } from "../../reducers/productReducers";
import Paginate from "../paginate/Paginate";
import { Fragment } from "react";
function  AdminProductListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList=useSelector(state=>state.productList);
  const {loading,error,products,pages,page}=productList

  const productDelete=useSelector(state=>state.productDelete);
  const {loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete
  
  const productCreate=useSelector(state=>state.productCreate);
  const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct}=productCreate


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //delete products 
      dispatch(deleteProduct(id))
      //after delete we want our listproducts to render again so we add some dependencies in useEffect for this purpose
    }
  };
  let keyword=useLocation().search
  useEffect(() => {
    dispatch({type:myActionsProductList.CREATE_RESET})
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
      
    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`);
    }
    else{
      dispatch(listProducts(keyword))
    }
  }, [dispatch, navigate, userInfo,successDelete,successCreate,createdProduct,keyword]);

  const createProductHandler=()=>{
    //create Product 
    dispatch(createProduct())
  }

  return (
    <div>

      <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
      
           <Button className="my-3" onClick={createProductHandler}> 

           <i className='fas fa-plus'></i>Create Product
           </Button>
        </Col>
      </Row>


      {loadingDelete&&<Loader></Loader>}
      {errorDelete&&<Message variant='danger'>{errorDelete}</Message>}


      {loadingCreate&&<Loader></Loader>}
      {errorCreate&&<Message variant='danger'>{errorCreate}</Message>}


      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
        <Table stripped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>

          <tbody>
         
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas  fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true} ></Paginate>
        </Fragment>
      )}
    </div>
  );
}
export default AdminProductListScreen;
