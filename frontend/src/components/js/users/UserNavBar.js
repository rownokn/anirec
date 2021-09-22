import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const UserNavBar = () => {
  let { url } = useRouteMatch();

  return (
    <div className='user-navbar'>
      <nav>
        <Link to={`${url}/user-review`}>reviews</Link>
        <Link to={`${url}/anime-favorites`}>favorite anime</Link>
        <Link to={`${url}/anime-list`}>anime activites</Link>

       
      </nav>
    </div>

  )
}

export default UserNavBar;