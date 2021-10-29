import React,  {useState} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from "../Modal";

const UserNavBar = () => {
  let { url } = useRouteMatch();
  const [show, setShow] = useState(false)


  return (
    <div className='user-navbar'>
      <div className='menu'>
      <button onClick={() => setShow(true)}><i><FontAwesomeIcon icon={faBars} /></i></button>
      <Modal title='Anime Menu' onClose={() => setShow(false)} show={show}>
      <div class='mobile-navbar'>
          <ul>
          <li><Link to={`${url}/anime-list`} onClick={() => setShow(false)} >anime activites</Link></li>
          <li><Link to={`${url}/anime-favorites`} onClick={() => setShow(false)} >favorite anime</Link></li>
          <li><Link to={`${url}/user-review`} onClick={() => setShow(false)} >reviews</Link></li>
          </ul>
          </div>
        </Modal>
      </div>
      <nav>
        <Link to={`${url}/user-review`}>reviews</Link>
        <Link to={`${url}/anime-favorites`}>favorite anime</Link>
        <Link to={`${url}/anime-list`}>anime activites</Link>

       
      </nav>
    </div>

  )
}

export default UserNavBar;