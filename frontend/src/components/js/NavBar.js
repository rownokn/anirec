import React, {useContext, useState} from 'react'
import transparent_logo from '../images/brandmark-design-transparent.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { AccountContext } from './account_management/AccountProvider'
import Modal from "./Modal";
import AnimeQuickSearch from './AnimeQuickSearch'



const NavBar = () => {
  const {auth, logout} = useContext(AccountContext)
  const [show, setShow] = useState(false);


    if(auth){
      return (
        <div className='nav-bar'>
          <nav className='menu'>
            <div class='main-navbar'> 
              <Link className='main-link' to='/'><img src={transparent_logo} alt='logo' /></Link>       
              <Link className='main-link' to='/user-profile/anime-list'>Anime List</Link>
              <Link className='main-link' to='/'>User Recommended</Link>  
              <div className='main-link dropdown'>
                <button>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button>
                <div className="dropdown-content">
                    <Link to='/popular-trending'>popular/trending anime</Link>
                    <Link to='/'>advanced search</Link>
                </div>
              </div>   
            </div>
          <div className='login-bar'> 
              <div></div>
              <Link class='login-link' to='/login' onClick={logout}><i><FontAwesomeIcon icon={faUser} /></i></Link>  
              <button class='search-btn' onClick={() => setShow(true)}><i><FontAwesomeIcon icon={faSearch} /></i></button>
              <AnimeQuickSearch setShow={setShow} show={show} />
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
              <div class='main-link dropdown'>
                <button>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button>
                <div class="dropdown-content">
                    <Link to='/popular-trending'>popular/trending anime</Link>
                    <Link to='/'>advanced search</Link>
                </div>
              </div>              
            </div>
          <div class='login-bar'> 
              <div></div>
              <Link class='login-link' to='/signup'>Sign Up</Link>  
              <Link class='login-link' to='/login'>Login</Link>
              <button class='search-btn' onClick={() => setShow(true)}><i><FontAwesomeIcon icon={faSearch} /></i></button>
              <AnimeQuickSearch setShow={setShow} show={show} />

          </div>
        </nav>
        </div>
  
      )

    }
 
}

export default NavBar;