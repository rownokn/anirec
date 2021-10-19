import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {useQuery} from 'react-query'
import Loading from '../Loading'
import loading_gif from '../../images/13335.gif'

const fetchAnimeCharacter = async (anime_id) => {
  const response = await fetch(`http://localhost:5000/anime/characters_list/${anime_id}`);
  return await response.json()
} 


const AnimeCharacterSummary = ({anime_id}) => {
  let { url } = useRouteMatch();
  
  const {isLoading, data} = useQuery([anime_id], async () =>{
    const data = await fetchAnimeCharacter(anime_id)
    return data
  })


  if (isLoading){
    return <Loading />
  }

  return (

      <div className='content-list'>
        {data.anime_characters ?  (data.anime_characters.length  ? data.anime_characters.map (char => 
        <Link to={`${url}/character-profile/${char.id}`}>
          <div>
            <img src={char.image} alt='inu' />
           <p>{char.name}</p>
          </div>
        </Link>
          
        ): <div><img src={loading_gif} alt='loading' /> <h3>No Characters Posted</h3></div>):
        <div><img src={loading_gif} alt='loading' /> <h3>No Characters Posted</h3></div>}

      
      </div>     
  )

}

 


export default AnimeCharacterSummary