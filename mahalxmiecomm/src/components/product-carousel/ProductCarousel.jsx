import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel,Image } from "react-bootstrap";
import Loader from "../loader/loader";
import Message from "../message/message";
import { useEffect } from "react";
import { listTopProducts } from "../../actions/productActions";
function ProductCarousel(){
    const dispatch=useDispatch()
    const productTopRated=useSelector(state=>state.productTopRated)
    const {error,loading,products}=productTopRated
    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])
    return(
        loading?<Loader></Loader>:error?
        <Message></Message>:(
            <Carousel pause='hover' className='bg-dark'>
            {products.map((product)=>{
                return(
                    <Carousel.Item>
                        <Link to={`/products/${product._id}`}>
                        <Image src={product.image} alt={product.name}></Image>
                        </Link>
                        <Carousel.Caption className="carousel.caption">
                            <h4>{product.name} (${product.price})</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })

            }
            
            </Carousel>
        )
    )
}
export default ProductCarousel;