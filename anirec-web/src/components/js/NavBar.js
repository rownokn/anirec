import React, {useContext, useState} from 'react'
import transparent_logo from '../images/brandmark-design-transparent.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { AccountContext } from './account_management/AccountProvider'
import Modal from "./Modal";
import AnimeQuickSearch from './AnimeQuickSearch'



const NavBar = () => {
  const {auth, logout} = useContext(AccountContext)
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const clickQuickSearch = () => {
    setShowQuickSearch(true)
    setShowNav(false)
  }


    if(auth){
      return (
        <div className='nav-bar'>

          <div className='mobile-nav'>
            <button onClick={() => setShowNav(true)}><i><FontAwesomeIcon icon={faBars} /></i></button>
            <Modal title='Anime Menu' onClose={() => setShowNav(false)} show={showNav}>
              <div class='mobile-navbar '>
                <ul>
                <li> <Link to='/user-profile/anime-list' onClick={() => setShowNav(false)} >Anime List</Link></li>
                <li><Link to='/anime-user-rec' onClick={() => setShowNav(false)}>Recommended For User</Link> </li>
                
                <li><Link  to='/popular-trending' onClick={() => setShowNav(false)}>popular/trending anime</Link></li>
                <li><Link to='/advanced-search' onClick={() => setShowNav(false)}>advanced search</Link></li>
                <li><Link className='search-btn' to='#test'  onClick={clickQuickSearch}>quick search</Link>
                <AnimeQuickSearch setShow={setShowQuickSearch} show={showQuickSearch} />
                <li><Link to='/login' onClick={logout}>logout</Link></li>
               
                </li>
                
                </ul>
              </div>
            </Modal>
          </div>
          <nav className='menu'>
          <Link  to='/'><img src={transparent_logo} alt='logo' /></Link>       
            <div className='main-navbar'> 
              <Link className='main-link' to='/user-profile/anime-list'>Anime List</Link>
              <Link className='main-link' to='/anime-user-rec'>Recommended For User</Link>  
              <div className='main-link dropdown'>
                <button>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button>
                <div className="dropdown-content">
                    <Link to='/popular-trending'>popular/trending anime</Link>
                    <Link to='/advanced-search'>advanced search</Link>
                </div>
              </div>   
            </div>
          <div className='login-bar'> 
              <div></div>
              <Link className='login-link' to='/login' onClick={logout}><i><FontAwesomeIcon icon={faUser} /></i></Link>  
              <button className='search-btn' onClick={() => setShowQuickSearch(true)}><i><FontAwesomeIcon icon={faSearch} /></i></button>
              <AnimeQuickSearch setShow={setShowQuickSearch} show={showQuickSearch} />
          </div>
        </nav>
        </div>
  
      )

    }else{
      return (
        <div className='nav-bar'>
           <div className='mobile-nav'>
            <button onClick={() => setShowNav(true)}><i><FontAwesomeIcon icon={faBars} /></i></button>
            <Modal title='Main Menu' onClose={() => setShowNav(false)} show={showNav}>
              <div className='mobile-navbar'>
                <ul>
                <li><Link to='/popular-trending' onClick={() => setShowNav(false)}>popular/trending anime</Link></li>
                <li><Link to='/advanced-search' onClick={() => setShowNav(false)}>advanced search</Link></li>
                <li><Link className='search-btn' to='#test'  onClick={clickQuickSearch}>quick search</Link>
                <AnimeQuickSearch setShow={setShowQuickSearch} show={showQuickSearch} />
                <li><Link to='/login' onClick={() => setShowNav(false)}>Login</Link></li>
                <li><Link to='/signup' onClick={() => setShowNav(false)}>Sign Up</Link> </li>


                </li>
                
                </ul>
              </div>
            </Modal>
          </div>
          <nav className='menu'>
            <Link  to='/'><img src={transparent_logo} alt='logo' /></Link>       

            <div className='main-navbar'> 
              <div className='main-link dropdown'>
                <button>Browse&nbsp; <i><FontAwesomeIcon icon={faCaretDown} /></i></button>
                <div className="dropdown-content">
                    <Link to='/popular-trending'>popular/trending anime</Link>
                    <Link to='/advanced-search'>advanced search</Link>
                </div>
              </div>              
            </div>
          <div className='login-bar'> 
              <div></div>
              <Link className='login-link' to='/signup'>Sign Up</Link>  
              <Link className='login-link' to='/login'>Login</Link>
              <button className='search-btn' onClick={() => setShowQuickSearch(true)}><i><FontAwesomeIcon icon={faSearch} /></i></button>
              <AnimeQuickSearch setShow={setShowQuickSearch} show={showQuickSearch} />

          </div>
        </nav>
        </div>
  
      )

    }
 
}

export default NavBar;