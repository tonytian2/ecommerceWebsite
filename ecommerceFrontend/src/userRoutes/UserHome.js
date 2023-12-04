import { useContext } from 'react';
import DataContext from '../context/DataContext';
import NeedToLogin from '../components/NeedToLogIn';

const UserHome = () => {
    const {navigate} = useContext(DataContext)
    return (
        <div className="UserHome">
            { 
                localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                ):
                (<> <button onClick={() => navigate("/user/changepassword")}>Change password</ button>
                    <button onClick={() => navigate("/user/products/manageproducts")}>Manage Products</ button>
                    <button onClick={() => navigate("/user/products/createproduct")}>Create Products</ button>
                    <button onClick={() => navigate("/user/shoppingcart")}>Shopping Cart</ button>
                    <button onClick={() => navigate("/user/orderhistory")}>Order History</ button>
                </>)}
          
        </div>
    )
}

export default UserHome