import React from 'react'
import {useQuery} from 'react-query'
import Loading from '../Loading'
import loading_gif from '../../images/13335.gif'

const fetchAnimeEpisodes = async (anime_id) => {
  const response = await fetch(`http://localhost:5000/anime/episodes/${anime_id}`);
  return await response.json()
} 

const AnimeEpisodes = ({anime_id}) => {
  const {isLoading, data} = useQuery([anime_id], async () =>{
    const data = await fetchAnimeEpisodes(anime_id)
    return data
  })

  if (isLoading){
    return <Loading />
  }


  return (
    <div className='anime-summary'>
      <h2>Anime Episodes</h2>
      {data.anime_episodes ? <ul>
        {data.anime_episodes.length ? data.anime_episodes.map((epi) => 
          <li>
              <a href={`${epi.url}`}>{epi.name}</a>
          </li>
        ): <div><img src={loading_gif} alt='loading' /> <h3>Episodes Not Available Please check other sites for the episodes of this anime</h3></div>}
        </ul> :
       <div><img src={loading_gif} alt='loading' /> <h3>Episodes Not Available Please check other sites for the episodes of this anime</h3></div> }
      Episodes can be watched on <b>Crunchyroll</b>
    </div>
    
  )
}

export default AnimeEpisodes