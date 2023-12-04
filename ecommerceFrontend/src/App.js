import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Nav from './Nav';
import Registration from "./Registration"
import Login from './Login'
import Home from './homeRoutes/Home'
import UserHome from './userRoutes/UserHome'
import ChangePassword from './userRoutes/ChangePassword'
import Search from './homeRoutes/Search'
import ProductPage from './productsRoutes/ProductPage'
import CreateProduct from './productsRoutes/CreateProduct'
import ManagerProducts from './productsRoutes/ManageProducts'
import WrongCredentialsPage from './WrongCredentialsPage'
import ShoppingCart from './shoppingCartRoutes/ShoppingCart';
import OrderHistory  from './ordersRoutes/OrderHistroy';
import PageNotFound from './PageNotFound';
function App(){

  return (
    <div className="App">
      <DataProvider>
      <Nav />
      <Routes>
        <Route exact path="/" element = {<> <Search /> <Home  /> </>} />
        <Route exact path="/login" element = {<Login />} />
        <Route exact path="/registration" element = {<Registration />} />
        <Route exact path="/user/userhome" element = {<UserHome />} />
        <Route exact path="/user/changepassword" element=  {<ChangePassword />} />
        <Route exact path="/user/products/createproduct" element=  {<CreateProduct />} />
        <Route exact path="/user/products/manageproducts" element=  {<ManagerProducts />} />
        <Route exact path="/user/shoppingcart"   element=  {<ShoppingCart />} /> 
        <Route exact path="/user/orderhistory"   element=  {<OrderHistory />} /> 

        <Route path="/products/:id"   element  =  {<ProductPage />} />

        <Route exact path="/wrongcredentials"   element=  {<WrongCredentialsPage />} /> 
        <Route path="*" element={<PageNotFound />} />
        
       

      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
