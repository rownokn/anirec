import React, {createContext, useState} from 'react'
import {useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


const AccountContext = createContext({

});


const AccountProvider = ({children}) => {
  const [account, setAccount] = useState({})
  const [auth, setAuth] = useState(false)
  let history = useHistory();


  const authenticate = async (username, password) => {
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    }

    const response = await fetch('http://localhost:8000/user/login', configs)
    const userData = await response.json()
    if (userData.auth) {
      setAuth(userData.auth)
      setAccount({
          'account_id' : userData.user_id,
          'session_id' : userData.session_id,
          'username' : userData.username,
          'auth' : userData.auth,
      })

      console.log(account)
      history.push("/user-profile/anime-list"); 
    }else{
      toast.error(userData.msg, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast'
      });
    }

    }
    
  

  const logout = async () => {
    const response = await fetch(`http://localhost:8000/user/logout/${account.session_id}`)
    const userData = await response.json()
    setAuth(false)
    history.push("/login");
    setAccount({})
  }

  return (
    <AccountContext.Provider value={{account, auth, authenticate, logout, ToastContainer}}>
      {children}
    </AccountContext.Provider>
    
  )

  
}

export {AccountContext, AccountProvider}