import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import NeedToLogin from '../components/NeedToLogIn';

import ProductFeed from './ProductFeed'
const ManageProducts = () => {
    const { ownProducts, manageProductsMessage } =useContext(DataContext)
 
    return (
        <>
            {localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                )
                :
                (<div className='ManageProductDiv'>
                    <h2> Your products</h2>
                    <p> {manageProductsMessage} </p>
                    {ownProducts.length ? (
                        <table className='ManageProduct' > 
                            <thead>
                                <tr>
                                    <td>Delete</td>
                                    <td>Image</td>
                                    <td>Product</td>
                                    <td>Sold Quantity</td>
                                    <td>Price</td>
                                    
                                    
                                </tr>
                            </thead>
                        
                        <ProductFeed products={ownProducts} />
                        </table>
                    ) : (
                        <p style={{ marginTop: "2rem" }}>
                            You are not selling any products.
                        </p>
                    )}
                </div>)}         
        </>)
}
export default ManageProducts