import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState,  useContext} from 'react'
import DataContext from '../context/DataContext';
import shoppingCartApi from '../api/shoppingCart'
const CartItem = ({ cartItem }) => {
    
    const { shoppingCart, setShoppingCart, setShoppingCartMessage, navigate, clearLocalStorageCredentials } = useContext(DataContext)
    const [newQuantity, setNewQuantity] = useState(cartItem.quantity)
    
    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            
            setShoppingCart(shoppingCart.filter( (filteredCartItem) => (filteredCartItem.cartItemId !== cartItem.cartItemId )))
            
            const response = await shoppingCartApi.delete(`/${cartItem.cartItemId}?username=${localStorage.getItem("username")}`,
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
                window.alert(`${response.data}`)
                window.location.reload()
        } catch (err) {
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
    
    const handleChangeQuantity = async (e) => {
        e.preventDefault();
        try {

            const response = await shoppingCartApi.put(`/quantity/${cartItem.cartItemId}?username=${localStorage.getItem("username")}&quantity=${newQuantity}`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
                window.alert(`Quantity updated successfully`)
            setShoppingCart(shoppingCart.map( (selectedCartItem) => ((selectedCartItem.cartItemId === cartItem.cartItemId)? ({...selectedCartItem, quanity: newQuantity}):selectedCartItem )))
            window.location.reload()
        } catch (err) {
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
        
        <tbody>
            <tr>
                <td> <FontAwesomeIcon icon={faCircleXmark} onClick={handleRemove} className='faButton'/> </td>
                <td> <img src={cartItem.product.imageURL}  alt="" /> </td>
                <td> <Link to= {`/products/${cartItem.product.productId}`} > 
                            <span className="ProductName">{
                                (cartItem.product.productName).length <= 15
                                ? cartItem.product.productName
                                : `${(cartItem.product.productName).slice(0, 15)}...`
                            }</span> 
                        </Link>
                </td>
               
                
                <td> {cartItem.product.price} </td>
                
                <td> <input value={newQuantity} onChange={(e)=>setNewQuantity(e.target.value)}/> </td>
                <td> <button onClick={handleChangeQuantity}> Confirm Change </button></td>      
            </tr>
        </tbody>)
        
    }


export default CartItem