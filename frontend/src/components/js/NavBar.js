import React, {useContext} from 'react'
import transparent_logo from '../images/brandmark-design-transparent.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { AccountContext } from './account_management/AccountProvider'



const NavBar = () => {
  const {auth, logout} = useContext(AccountContext)

    if(auth){
      return (
        <div className='nav-bar'>
          <nav className='menu'>
            <div class='main-navbar'> 
              <Link class='main-link' to='/'><img src={transparent_logo} alt='logo' /></Link>       
              <Link class='main-link' to='/user-profile/anime-list'>Anime List</Link>
              <Link class='main-link' to='/'>User Recommended</Link>  
              <div class='anime-drop-down'><button class='main-link'>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button></div>  
            </div>
          <div class='login-bar'> 
              <div></div>
              <Link class='login-link' to='/login' onClick={logout}><i><FontAwesomeIcon icon={faUser} /></i></Link>  
              <button class='search-btn' href='#t'><i><FontAwesomeIcon icon={faSearch} /></i></button>
          </div>
        </nav>
        </div>
  
      )

    }else{
      return (
        <div className='nav-bar'>
          <nav className='menu'>
            <div class='main-navbar'> 
              <Link class='main-link' to='/'><img src={transparent_logo} alt='logo' /></Link>       
              <div class='main-link'><button>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button></div>              </div>
          <div class='login-bar'> 
              <div></div>
              <Link class='login-link' to='/signup'>Sign Up</Link>  
              <Link class='login-link' to='/login'>Login</Link>
              <button class='search-btn' href='#t'><i><FontAwesomeIcon icon={faSearch} /></i></button>
          </div>
        </nav>
        </div>
  
      )

    }
 
}

export default NavBar;