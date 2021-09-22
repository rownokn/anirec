import React, {useState}  from 'react'
import transparent_logo from '../../images/brandmark-design-transparent.png'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const emailHandler = e => {
    setEmail(e.target.value)
  }

  const usernameHandler = e => {
    setUsername(e.target.value)
  }

  const passwordHandler = e => {
    setPassword(e.target.value)
  }

  const confirmPasswordHandler = e => {
    setConfirmPassword(e.target.value)
  }

  const register = async () => {
    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          "email": email,
          "username": username,
          "password": password
        }),
        headers: {
          "Content-Type": 'application/json'
        }
      }

      if (password === confirmPassword){
        const response = await fetch('http://localhost:5000/user/register', config);
        const userInfo = await response.json();
      }
    }catch(e) {
      console.log(e)
    }
  }


  return (
    <div class='account-box'>
       <img src={transparent_logo} alt='logo' />
       <p>Sign Up</p>
       <div className='account-input'>
          <input type='text' placeholder='Email' onChange={emailHandler}/>
          <input type='text' placeholder='Username' onChange={usernameHandler}/>
          <input type='password' placeholder='Password' onChange={passwordHandler}/>
          <input type='password' placeholder='Confirm Password'  onChange={confirmPasswordHandler}/>
          <button onClick={register}>submit</button>

       </div>
       
    </div>
  )
}

export default SignUp