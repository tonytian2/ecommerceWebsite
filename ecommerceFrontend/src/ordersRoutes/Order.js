import { Link } from 'react-router-dom';
import {useState, useContext} from 'react'
import DataContext from '../context/DataContext';
const ManageProduct = ({ order }) => {

    const getLocalTime = (millisecTime) => {
        let t = new Date(millisecTime)
        return t.toLocaleDateString()+" "+t.toLocaleTimeString()
    }
    return (
        
        <tbody>
            <tr>
                <td> <Link to= {`/products/${order.orderProduct.productId}`} > 
                            <span className="ProductName">{
                                (order.orderProduct.productName).length <= 30
                                ? order.orderProduct.productName
                                : `${(order.orderProduct.productName).slice(0, 30)}...`
                            }</span> 
                    </Link>
                </td>
                <td> <img src={order.orderProduct.imageURL}  alt="" /> </td>
                
                
               
                <td> {order.orderProduct.price} </td>
                <td> {order.boughtQuantity} </td>
                <td> {(order.orderProduct.price * order.boughtQuantity).toFixed(2) }</td>
                <td> {getLocalTime(order.orderProduct.snapshotTime)}</td>  
            </tr>
        </tbody>)
        
    }


export default ManageProduct