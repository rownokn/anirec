import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const AnimeNavBar = () => {
  let { url } = useRouteMatch();

  return (
    <div className='anime-navbar'>
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
