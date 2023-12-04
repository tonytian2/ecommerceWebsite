import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import DataContext from './context/DataContext';
import PopulateDB  from './devUtility/populateDB';
const Nav = () => {
    const { shoppingCart, handleLogout,navigate, fetchShoppingCart } = useContext(DataContext)
    
    async function handleClick()  {
        await PopulateDB()
        navigate("/")
        
    }
    return (
        <nav className="Nav">
            
            <ul>
                <li><button onClick={() => handleClick()}>DevTool: Populate Database</button></li>
                <li><Link onClick={fetchShoppingCart} className={window.location.pathname==="/"?"active":""} to="/">Home</Link></li>
                
                { 
                localStorage.getItem("username") == undefined ? 
                (<>
                    <li><Link to="/login" className={window.location.pathname==="/login"?"active":""} >Login</Link></li>
                    <li><Link to="/registration" className={window.location.pathname==="/registration"?"active":""}>Register</Link></li>
                </>):
                (<> <li><Link to="/user/userhome" className={window.location.pathname==="/user/userhome"?"active":""} >Welcome, {localStorage.getItem("username")}</Link></li>
                    <button onClick={handleLogout} >Log out</ button>
                </>)}
                <li><Link to="/user/shoppingcart" onClick={fetchShoppingCart}>{ shoppingCart.length ? 
                                <FontAwesomeIcon icon={faCartShopping} bounce size="lg" style={{color: "#1f5151",}} />:
                                <FontAwesomeIcon icon={faCartShopping} size="lg" style={{color: "#1f5151",}} />}
                    </Link>
                </li>
           </ul>
        </nav>
    )
}

export default Nav