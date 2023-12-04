import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import NeedToLogin from '../components/NeedToLogIn';

import OrderFeed from './OrderFeed'
const OrderHistory = () => {
    const { orders, fetchOrders } =useContext(DataContext)
    fetchOrders()
    return (
        <>
            {localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                )
                :
                (<div className='OrderHistoryDiv'>
                    <h2> Your Order History</h2>
                    
                    {orders.length ? (
                        <table className='OrderHistory' > 
                            <thead>
                                <tr>
                                    <td>Product</td>
                                    <td>Image</td>
                                    <td>Price</td>
                                    <td>Quantity</td>
                                    <td>Total</td>
                                    <td>Order Time</td>
 
                                </tr>
                            </thead>
                        
                        <OrderFeed orders={orders} />
                        </table>
                    ) : (
                        <p style={{ marginTop: "2rem" }}>
                            You haven't ordered anything.
                        </p>
                    )}
                </div>)}         
        </>)
}
export default OrderHistory