import { useParams, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import DataContext from '../context/DataContext';
import shoppingCartApi from '../api/shoppingCart';

const PostPage = () => {

    const {products, shoppingCart, fetchShoppingCart, navigate, clearLocalStorageCredentials } =useContext(DataContext)
    const { id } = useParams()
    const [quantity, setQuantity] =useState(1)
    const product = products.find(product => (product.productId).toString() === id);
    
    const handleAddToCart = async (e) => {
        e.preventDefault();
        try{
            let response;
            fetchShoppingCart();
            if(shoppingCart.filter((filteredCartItem) => (filteredCartItem.product.productId === product.productId)).length){
                response = 
                await shoppingCartApi.put(`/?username=${localStorage.getItem("username")}&productId=${product.productId}&quantity=${quantity}`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}})
            }
            else{
                response = 
                await shoppingCartApi.post(`/?username=${localStorage.getItem("username")}&productId=${product.productId}&quantity=${quantity}`,{},
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
        <div className="ProductPage">
           
            {product &&
            <>
                <div className="imgAndDetails">
                    <div className="img">
                        <img src={product.imageURL} alt={product.productName} width="100%" />
                    </div>
                    <div className="details">
                        <h3>{product.productName}</h3>
                        <h2>${product.price}</h2>
                        <input type="number" value={quantity} min="1" onChange={(e)=> setQuantity(e.target.value)}/>
                        <button onClick={handleAddToCart}> Add to cart</button>
                        
                    </div>
                </div>
                    <div className="description">
                    <h2> Product Description</h2>
                    <span>{product.description}</span>
                </div>
            </>    
            }
            {!product &&
                <>
                    <h2>Product Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
         
        </div>
    )
}

export default PostPage