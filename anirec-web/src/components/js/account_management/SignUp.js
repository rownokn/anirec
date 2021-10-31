import React, {useState}  from 'react'
import transparent_logo from '../../images/brandmark-design-transparent.png'
import { toast, ToastContainer } from "react-toastify";
import validator from 'validator'

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

  const user = async () => {
    const response = await fetch(`http://localhost:8000/user/users`)
    const info = await response.json()

    for (let user of info){
      if(username === user.username) {
        return true;
      }

      if (email === user.email){
        return true;
      }
    }
    return false;
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
      
      let userExist = await user()

    
      
      if (validator.isEmpty(email)){
        toast.error("Please Enter Email", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(username)){
        toast.error("Please Enter Username", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(password)){
        toast.error("Please Enter Password", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(confirmPassword)){
        toast.error("Please Confirm Your Password", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      } else if (password !== confirmPassword){
        toast.error("Password Does Not Match", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      } else{
        
        if (!validator.isEmail(email)) {
          toast.error("Invalid Eamil", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        }else if (userExist) {
          toast.error("Username/Email already used", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        }else{
          const response = await fetch('http://localhost:8000/user/register', config);
          const userInfo = await response.json();
          toast.success("Registration Sucessful", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });

        }
       
       
  

      }


    
      
      
    }catch(e) {
      console.log(e)
    }
  }

  console.log(validator.isEmail(email))
  console.log(user())


  console.log(password)


  return (
    <div className='account-box'>
       <img src={transparent_logo} alt='logo' />
       <p>Sign Up</p>
       <div className='account-input'>
          <input type='text' placeholder='Email' onChange={emailHandler}/>
          <input type='text' placeholder='Username' onChange={usernameHandler}/>
          <input type='password' placeholder='Password' onChange={passwordHandler}/>
          <input type='password' placeholder='Confirm Password'  onChange={confirmPasswordHandler}/>
          <button className ='login-submit' onClick={register}>submit</button>

       </div>
       <ToastContainer />
       
    </div>
  )
}

export default SignUp