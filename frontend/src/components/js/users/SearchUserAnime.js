import React from 'react'

const SearchUserAnime = ({user, animeName}) => {
  return (
    <div className='search-anime'>
      <h2>Search Anime</h2>
      <input type='text' onChange={animeName} /><br/>
      <button onClick={user}>Search</button>
    </div>
  )
}

export default SearchUserAnime