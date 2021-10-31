import React, {useState, useContext} from 'react'
import { AccountContext } from './AccountProvider'
import transparent_logo from '../../images/brandmark-design-transparent.png'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {authenticate, ToastContainer} = useContext(AccountContext)

  const usernameHandler = e => {
    setUsername(e.target.value)
  }

  const passwordHandler = e => {
    setPassword(e.target.value)
  }


  return (
    <div className='account-box'>
       <img src={transparent_logo} alt='logo' />
       <p>login</p>
       <div className='account-input'>
          <input type='text' placeholder='Username' onChange={usernameHandler}/>
          <input type='password' placeholder='Password' onChange={passwordHandler}/>
          <button className='login-submit' onClick={() => authenticate(username, password)}>submit</button>
          <ToastContainer />
       </div>
       
    </div>
  )
}

export default Login