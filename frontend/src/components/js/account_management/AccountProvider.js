import React, {createContext, useState} from 'react'
import {useHistory } from 'react-router-dom';

const AccountContext = createContext({

});

const useStateWithSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    sessionStorage.getItem(key) || initialValue
  );
  return [value, setValue]
}

const AccountProvider = ({children}) => {
  const [account, setAccount] = useStateWithSessionStorage("account", {})
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

    const response = await fetch('http://localhost:5000/user/login', configs)
    const userData = await response.json()
    if (userData.auth) {
      setAuth(userData.auth)
      setAccount({
          'account_id' : userData.user_id,
          'session_id' : userData.session_id,
          'username' : userData.username,
          'auth' : userData.auth,
      })
      sessionStorage.setItem("account", JSON.stringify({
        'account_id' : userData.user_id,
        'session_id' : userData.session_id,
        'username' : userData.username,
        'auth' : userData.auth,
    }));

      console.log(account)
      history.push("/user-profile/anime-list"); 
    }else{
      console.log("Invalid Login")
    }

    }
    
  

  const logout = async () => {
    const response = await fetch(`http://localhost:5000/user/logout/${account.session_id}`)
    const userData = await response.json()
    setAuth(false)
    history.push("/login");
    setAccount({})

  }

  return (
    <AccountContext.Provider value={{account, auth, authenticate, logout}}>
      {children}
    </AccountContext.Provider>
    
  )

  
}

export {AccountContext, AccountProvider}