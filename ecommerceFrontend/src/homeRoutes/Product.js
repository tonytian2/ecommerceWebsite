import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faCartShopping } from '@fortawesome/free-solid-svg-icons'
import shoppingCartApi from '../api/shoppingCart'
import {useContext } from 'react';
import DataContext from '../context/DataContext'
const Product = ({ product }) => {
    const { shoppingCart, fetchShoppingCart, navigate, clearLocalStorageCredentials} = useContext(DataContext)
    const handleAddToCart = async (e) => {
        e.preventDefault();
        try{
            let response;
            fetchShoppingCart();
            if(shoppingCart.filter((filteredCartItem) => (filteredCartItem.product.productId === product.productId)).length){
                response = 
                await shoppingCartApi.put(`/?username=${localStorage.getItem("username")}&productId=${product.productId}&quantity=1`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}})
            
            }else{
                response = 
                await shoppingCartApi.post(`/?username=${localStorage.getItem("username")}&productId=${product.productId}&quantity=1`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}})
            }
           
            window.alert(`${product.productName} added to shopping cart`)
            fetchShoppingCart()
        }catch (err) {
            if (err.response) {
                if(err.response.status == 401){
                    await clearLocalStorageCredentials()
                    navigate("/wrongcredentials")
                    return
                }
                window.alert(`${err.response.data}`)
                
            }else{
                window.alert(`${err.message}`)
            } 
        }
    }
    return (
        <div className="Product">
            <Link to={`/products/${product.productId}`}>
                
                <div className='des'>   
                    <div> 
                        <img src={product.imageURL} alt={product.productName}/>   
                    </div>  
                    <div>
                        <h5 className = "ProductName">{product.productName}</h5>
                        <p className="ProductDescription">{
                        (product.description).length <= 30
                            ? product.description
                            : `${(product.description).slice(0, 30)}...`
                        }</p>
                    </div>
                </div>
            </Link>
                <div className='info'>
                <Link to={`/products/${product.productId}`}>
                        <div className='stars'>
                            <FontAwesomeIcon className = "star" icon={faStar} style={{color: "#1f4e51",}} />
                            <FontAwesomeIcon className = "star" icon={faStar} style={{color: "#1f4e51",}} />
                            <FontAwesomeIcon className = "star" icon={faStar} style={{color: "#1f4e51",}} />
                            <FontAwesomeIcon className = "star" icon={faStar} style={{color: "#1f4e51",}} />
                            <FontAwesomeIcon className = "star" icon={faStar} style={{color: "#1f4e51",}} />
                        </div>
                        <h4>${product.price}<span>Sold {product.soldQuantity}</span> </h4>
                </Link>  
                <Link onClick={handleAddToCart}>
                        <FontAwesomeIcon className = "cart" icon={faCartShopping} style={{color: "#1f4e51",}} />
                </Link>
                </div>
           
    
        </div>    
    )
}

export default Product