import React, {useState} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from "../Modal";

const AnimeNavBar = () => {
  let { url } = useRouteMatch();
  const [show, setShow] = useState(false)


  return (
    <div className='anime-navbar'>
      <div className='menu'>
        <button onClick={() => setShow(true)}><i><FontAwesomeIcon icon={faBars} /></i></button>
        <Modal title='Anime Menu' onClose={() => setShow(false)} show={show}>
        <div className='mobile-navbar'>
          <ul>
          <li><Link to={`${url}/anime-summary`} onClick={() => setShow(false)} >summary</Link></li>
          <li><Link to={`${url}/episodes`} onClick={() => setShow(false)} >episodes</Link></li>
          <li><Link to={`${url}/anime-tags`} onClick={() => setShow(false)} >tags</Link></li>
          <li><Link to={`${url}/anime-characters`} onClick={() => setShow(false)} >characters</Link></li>
          <li><Link to={`${url}/anime-reviews`} onClick={() => setShow(false)} >reviews</Link></li>
          <li><Link to={`${url}/anime-recommedations`} onClick={() => setShow(false)} >recommendation</Link></li>
          </ul>
          </div>
        </Modal>
      </div>
      <nav>
        <Link to={`${url}/anime-recommedations`}>recommendation</Link>
        <Link to={`${url}/anime-reviews`}>reviews</Link>
        <Link to={`${url}/anime-characters`}>characters</Link>
        <Link to={`${url}/anime-tags`}>tags</Link>
        <Link to={`${url}/episodes`}>episodes</Link>
       <Link to={`${url}/anime-summary`}>summary</Link>
      </nav>
    </div>

  )
}

export default AnimeNavBar;
