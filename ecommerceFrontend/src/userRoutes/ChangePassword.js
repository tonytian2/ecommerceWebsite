import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';
import userApi from '../api/users'
import NeedToLogin from '../components/NeedToLogIn';

const ChangePassword = ({
}) => {
    const { password, setPassword, navigate, clearLocalStorageCredentials} = useContext(DataContext);
    const [changePasswordMessage, setChangePasswordMessage] = useState();
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
          const response = await userApi.put(`/${localStorage.getItem("username")}?password=${password}`,{},
          {headers: { authorization: 'Basic ' + window.btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"))   } 
        }
          
        )
          localStorage.setItem("password", password)
          setPassword("")
          setChangePasswordMessage("Password changed successfully");
        
        } catch (err) {
            setPassword("")
          if (err.response) {
            
            if(err.response.status == 401){
              await clearLocalStorageCredentials()
              navigate("/wrongcredentials")
              return
            }
            setChangePasswordMessage(`${err.response.data}`)
          }
          else{
            setChangePasswordMessage(`${err.message}`);
          }
        }
      }

    return (
        <div className="ChangePassword">
            {  localStorage.getItem("username") == undefined ? 
                ( <NeedToLogin />
                ):
                (<>
                    <h2>Change Password</h2>
                    <p>{changePasswordMessage}</p>
                    <p>Password must contain at least one digit and one letter, no space, no special character, and it must be 6-16 characters long.</p>
                    <form  className="FlexForm" onSubmit={handleChangePassword}>
                       
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Confirm</button>
                    </form>
                </>)}
        </div>
    )
}

export default ChangePassword