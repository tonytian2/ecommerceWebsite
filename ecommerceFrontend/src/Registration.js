import { useState, useContext } from 'react';
import DataContext from './context/DataContext';
import registrationApi from './api/registration';

const Registration = ({
}) => {
    const {username, setUsername, password, setPassword, navigate, handleLogout, handleReturnHome} = useContext(DataContext);
    const [registrationMessage, setRegistrationMessage] = useState("Please enter username and password.")
    
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
          const response = await registrationApi.post(`/?username=${username}&password=${password}`)
          localStorage.setItem("username", username)
          localStorage.setItem("password", password)
          navigate("/");
        } catch (err) {
          if (err.response) {
            setRegistrationMessage(`${err.response.data}`)
          }else{
            setRegistrationMessage(`${err.message}`)
          } 
        }finally {
          setUsername("")
          setPassword("")
        }
      }

    
    return (
        <main className="Registration">
            { localStorage.getItem("username") == undefined ?
                (<>
                    
                    <h2>Registration</h2>
                    <p>{registrationMessage}</p>
                    <p>Username starts with a letter and can contain letters and numbers</p>
                    <p>Password must contain at least one digit and one letter, no space, no special character, and it must be 6-16 characters long.</p>
                    <form className="FlexForm" onSubmit={handleRegistration}>
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
                        <button type="submit">Register</button>
                    </form>
                    </>):(<div className="requireLogout">
                            <p>You are already logged in. Please log out.</p>
                            <button onClick={handleLogout}>Log out</ button>
                            <button onClick={handleReturnHome}>Return to Front Page</ button>
                        </div>)}
        </main>
    )
}

export default Registration