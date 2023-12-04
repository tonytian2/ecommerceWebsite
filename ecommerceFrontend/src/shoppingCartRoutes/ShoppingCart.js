import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import NeedToLogin from '../components/NeedToLogIn';

import CartItemFeed from './CartItemFeed'

import productsApi from '../api/products'
import shoppingCartApi from '../api/shoppingCart'
import ordersApi from '../api/orders'
const ShoppingCart = () => {
    const { shoppingCart, shoppingCartMessage, fetchShoppingCart, clearLocalStorageCredentials, navigate } =useContext(DataContext)
    
    const handleOrder = async (e) => {
        e.preventDefault();
        try {
            let response;
            fetchShoppingCart()
            const t = Date.now();
            shoppingCart.forEach( async (cartItem) => {
                response = await productsApi.put(`/soldquantity/${cartItem.product.productId}?username=buyer&incre=${cartItem.quantity}`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
               
            })
            shoppingCart.forEach( async (cartItem) => {
                
                const data = {
                    boughtQuantity: `${cartItem.quantity}`,
                    username: localStorage.getItem("username"),
                    productId: `${cartItem.product.productId}`,
                    productName: cartItem.product.productName,
                    imageURL: cartItem.product.imageURL,
                    price: `${cartItem.product.price}`,
                    snapshotTime: `${t}`

                }
                response = await ordersApi.post("/",data,
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )


            })

            response = await shoppingCartApi.delete(`/deleteall?username=${localStorage.getItem("username")}`,
            {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
            fetchShoppingCart()
            
          
        } catch (err) {
            if (err.response) {
                if(err.response.status == 401){
                    await clearLocalStorageCredentials()
                    navigate("/wrongcredentials")
                    return
                }
                console.log(`${err.response.data}`)
                
            }else{
                console.log(`${err.message}`)
            } 
        }
    }


    return (
        <>
        
            {localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                )
                :
                (<div className='ShoppingCartDiv'>
                    
                    <h2> Your Shopping Cart</h2>
                    <p> {shoppingCartMessage} </p>
                    {shoppingCart.length ? (
                    <>
                        <div className='ShoppingCartTop'>
                            <table className='ShoppingCart' > 
                                <thead>
                                    <tr>
                                        <td>Remove</td>
                                        <td>Image</td>
                                        <td>Product</td>
                                        <td>Price</td>  
                                        <td>Quantity</td> 
                                    </tr>
                                </thead>
                            <CartItemFeed cartItems={shoppingCart} />
                            </table>
                        </div>
                        <div className='ShoppingCartBottom'>
                            <h3>{`Total: ${Math.round(shoppingCart.reduce((acc, curr)=> acc + curr.product.price*curr.quantity,0 )*100)/100}   `}</h3>
                            <button onClick={handleOrder} > Order</button>
                        </div>
                    </>
                    ) : (
                        <p style={{ marginTop: "2rem" }}>
                            Your shopping cart is empty.
                        </p>
                    )}
                </div>)} 

        </>
    )
}
export default ShoppingCart