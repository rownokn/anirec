import React, {useState, useEffect} from 'react'
import AnimeNavBar from './AnimeNavBar'
import AnimeProfileDashboard from './AnimeProfileDashboard'
import {useParams} from 'react-router-dom'


const AnimeProfile = () => {
  const { anime_id } = useParams();
  const [animeInfo, setAnimeInfo] = useState({})

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const anime = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/profile/${anime_id}`);
      const info = await response.json()
      setAnimeInfo(info.anime)

    }catch (err){
      setIsError(true)
    }

  }


   useEffect(() => {
     anime()
     
   }, [])

  

  return (
    <div className='anime-container'>
      <div className='image-container'>
        <img src={animeInfo.banner_image} alt='banner_image'/>
      </div>
      <AnimeNavBar anime_id={anime_id}/>
   
      <div className='profile-image'>
        <img src={animeInfo.cover_image} alt='cover_image'/>
      </div>

      <div className='activity'>
        <button>Planning</button>
        <h1>favorites</h1>
        <div className='fav-buttons'>
          <div>
            <button>unsave</button>
          </div>
          <div class='save-button'>
            <button>save</button>
          </div>
        </div>
      </div>

      <div className='anime-info'>
        <h2>Anime Details</h2>
        <p>English Name: {animeInfo.name}</p>
        <p>Japanese Name: {animeInfo.jap_name}</p>
        <p>Status: {animeInfo.status}</p>
        <p>Format: {animeInfo.format}</p>
        <p>Episodes: {animeInfo.episodes}</p>
        <p>Average Score: {animeInfo.average_score}</p>
        <p>Aired: {animeInfo.start_date} -  {animeInfo.end_date} </p>
        <p>Season: {animeInfo.season}</p>
        <p>Genres: {animeInfo.genre}</p>
        <p>Studios: {animeInfo.studio}</p>
      </div>
      <div className='content'>
        {animeInfo.character ? <AnimeProfileDashboard animeInfo={animeInfo} anime_id={anime_id}  /> : ""}
      </div>
     
      

   </div>

  )
}

export default AnimeProfile