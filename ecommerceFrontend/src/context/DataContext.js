
import {createContext, useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import productsApi from '../api/products';
import shoppingCartApi from '../api/shoppingCart';
import ordersApi from '../api/orders';

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [products, setProducts] = useState([])
    const [ownProducts, setOwnProducts] = useState([])
    
    const [shoppingCart, setShoppingCart] = useState([])
    const [refreshShoppingCart, setRefreshShoppingCart] = useState(true)

    const [orders, setOrders] = useState([])
   

    const [manageProductsMessage, setManageProductsMessage] = useState("Click the delete icon to delete your product.")
    const [shoppingCartMessage, setShoppingCartMessage] = useState("Click the remove icon to remove items from shopping cart.")
    
    const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.get('/');
        setProducts(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
 
    fetchProducts()
    fetchShoppingCart()
    
    const filteredProducts = products.filter((product) =>
      ((product.productName).toLowerCase()).includes(search.toLowerCase())
      || ((product.description).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredProducts.reverse())
  }, [])

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      ((product.productName).toLowerCase()).includes(search.toLowerCase())
      || ((product.description).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredProducts.reverse());
  }, [products, search])

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      ((product.user.username) === localStorage.getItem("username")))

    setOwnProducts(filteredProducts.reverse());
  }, [products])

  useEffect(() => {
    fetchShoppingCart()
  }, [refreshShoppingCart])

  const clearLocalStorageCredentials = async () => {
    localStorage.removeItem("username")
    localStorage.removeItem("password")
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    navigate("/")
  }

  const fetchShoppingCart = async () => {
    try{
      const response = await shoppingCartApi.get(`/?username=${localStorage.getItem("username")}`,
      {headers: 
        { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}
      });
      setShoppingCart(response.data)
    } catch (err) {
      setShoppingCart([])
      if (err.response) {
          console.log(`${err.response.data}`)
          
      }else{
        console.log(`${err.message}`)
      } 
  }
    
  }
  const fetchOrders = async () => {
    try{
      const response = await ordersApi.get(`/${localStorage.getItem("username")}`,
      {headers: 
        { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))}
      });
      setOrders(response.data)
    } catch (err) {
      setOrders([])
      if (err.response) {
          console.log(`${err.response.data}`)
          
      }else{
        console.log(`${err.message}`)
      } 
  }
    
  }
  
  const handleReturnHome = async (e) => {
    e.preventDefault()
    navigate("/")
  }
    return (
        <DataContext.Provider value = {{
            username, setUsername, password, setPassword,
            handleLogout, handleReturnHome,
            clearLocalStorageCredentials,
            search, setSearch, searchResults,
            products, setProducts, ownProducts,
            manageProductsMessage, setManageProductsMessage,
            shoppingCart, setShoppingCart, shoppingCartMessage, setShoppingCartMessage,
            fetchShoppingCart,
            orders, fetchOrders,
            navigate
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;