import React from 'react'
import {Link} from 'react-router-dom'
import {useQuery} from 'react-query'
import Loading from '../Loading'
import loading_gif from '../../images/13335.gif'

const fetchAnimeTags = async (anime_id) => {
  const response = await fetch(`http://localhost:8000/anime/tags/${anime_id}`);
  return await response.json()
} 

const AnimeTags = ({anime_id}) => {
  const {isLoading, data} = useQuery([anime_id], async () =>{
    const data = await fetchAnimeTags(anime_id)
    return data
  })

  if (isLoading){
    return <Loading />
  }

  return (
    <div className='anime-summary'>
      <h2>Anime Tags</h2>
      <ul>
        {data.anime_tags ? data.anime_tags.map((tags) => 
          <li>
            <Link key={tags.id} to={`/anime-categories/${tags.name}`}>{tags.name}</Link>
          </li>
        ): <div><img src={loading_gif} alt='loading' /> <h3>No Tags Posted</h3></div>}
      </ul>
        </div>
  )
}

export default AnimeTags