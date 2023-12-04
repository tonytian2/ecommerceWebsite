import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {useState, useContext} from 'react'
import DataContext from '../context/DataContext';
import productsApi from '../api/products'
const ManageProduct = ({ product }) => {
    const { products, setManageProductsMessage, setProducts, navigate, clearLocalStorageCredentials, fetchShoppingCart } = useContext(DataContext)
    const [newPrice, setNewPrice] = useState(product.price)
    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            
            setProducts(products.filter( (filteredProduct) => (filteredProduct.productId !== product.productId )))
            
            const response = await productsApi.delete(`/${product.productId}?username=${localStorage.getItem("username")}`,
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
            setManageProductsMessage(`${response.data}`)
            fetchShoppingCart()
        } catch (err) {
            if (err.response) {
                if(err.response.status == 401){
                    await clearLocalStorageCredentials()
                    navigate("/wrongcredentials")
                    return
                }
                setManageProductsMessage(`${err.response.data}`)
                
            }else{
                setManageProductsMessage(`${err.message}`)
            } 
        }
    }
    
    const handleChangePrice = async (e) => {
        e.preventDefault();
        try {

            const response = await productsApi.put(`/price/${product.productId}?username=${localStorage.getItem("username")}&price=${newPrice}`,{},
                {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}} )
            setManageProductsMessage(`Price updated successfully`)
            setProducts(products.map( (selectedProduct) => ((selectedProduct.productId === product.productId)? ({...selectedProduct, price: newPrice}):selectedProduct )))
            fetchShoppingCart()
        } catch (err) {
            if (err.response) {
                if(err.response.status == 401){
                    await clearLocalStorageCredentials()
                    navigate("/wrongcredentials")
                    return
                }
                setManageProductsMessage("Invalid product price")
                
            }else{
                setManageProductsMessage(`${err.message}`)
            } 
        }
    }

    return (
        
        <tbody>
            <tr>
                <td> <FontAwesomeIcon icon={faCircleXmark} onClick={handleRemove} className='faButton'/> </td>
                <td> <img src={product.imageURL}  alt="" /> </td>
                <td> <Link to= {`/products/${product.productId}`} > 
                            <span className="ProductName">{
                                (product.productName).length <= 15
                                ? product.productName
                                : `${(product.productName).slice(0, 15)}...`
                            }</span> 
                        </Link>
                </td>
               
                
                <td> {product.soldQuantity} </td>
                
                <td> <input value={newPrice} onChange={(e)=>setNewPrice(e.target.value)}/> </td>
                <td> <button onClick={handleChangePrice}> Confirm Change </button></td>      
            </tr>
        </tbody>)
        
    }


export default ManageProduct