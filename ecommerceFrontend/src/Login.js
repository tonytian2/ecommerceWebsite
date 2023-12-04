import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import loginApi from './api/login';

const Login = () => {
   
    const { username, setUsername, password, setPassword, handleLogout, handleReturnHome, navigate, fetchShoppingCart } = useContext(DataContext)
    const [ loginMessage, setLoginMessage ] = useState("Please enter username and password.")
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await loginApi.post(`/?username=${username}&password=${password}`)
          localStorage.setItem("username", username)
          localStorage.setItem("password", password)
          setUsername("")
          setPassword("")
          fetchShoppingCart() 
          navigate("/");
        
        } catch (err) {
          setUsername("")
          setPassword("")
          if (err.response) {
            
            setLoginMessage(`${err.response.data}`)
          }
          else{
            setLoginMessage(`Error: ${err.message}`);
          }
        }
      }
    return (<div className="Login">
        { localStorage.getItem("username") == undefined ?
        (<>
            <h2>Log in</h2>
            <p>{loginMessage}</p>
            <form  className="LoginForm" onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log in</button>
            </form>
        </>
       ):
        (<div className="requireLogout">
            <p>You are already logged in. Please log out.</p>
            <button onClick={handleLogout}>Log out</ button>
            <button onClick={handleReturnHome}>Return to Front Page</ button>
        </div>)
    }
     </div>
    )
}
export default Login