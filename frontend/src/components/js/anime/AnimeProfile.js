import React, {useState, useEffect, useContext} from 'react'
import AnimeNavBar from './AnimeNavBar'
import AnimeProfileDashboard from './AnimeProfileDashboard'
import {useParams} from 'react-router-dom'
import Modal from "../Modal";
import default_banner_image from '../../images/wp5195565-ps4-anime-girl-wallpapers.jpg'
import AnimeActivty from './AnimeActivity';
import ManageFavorites from './ManageFavorites';
import { AccountContext } from '../account_management/AccountProvider'

const AnimeProfile = () => {
  const {account} = useContext(AccountContext)
  const { anime_id } = useParams();
  const [animeInfo, setAnimeInfo] = useState({})
  const [userActivity, setUserActivity] = useState({})

  const [genre, setGenre] = useState([])
  const [studio, setStudio] = useState([])
  const [show, setShow] = useState(false);


  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const addToFavorites = () => {

  }

  const unsave = () => {
    
  }

  const anime = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/profile/${anime_id}/${account.account_id}`);
      const info = await response.json()
      setAnimeInfo(info.anime)
      setGenre(info.anime.genre)
      setStudio(info.anime.studio)
      setUserActivity(info.activities)

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
        {animeInfo.banner_image !== null ? <img src={animeInfo.banner_image} alt='banner_image'/>: <img src={default_banner_image} alt='def_banner_image'/>}
      </div>
      <AnimeNavBar anime_id={anime_id}/>
   
      <div className='profile-image'>
        <img src={animeInfo.cover_image} alt='cover_image'/>
      </div>

      <div className='activity'>
        <AnimeActivty anime_id={anime_id} animeInfo={animeInfo} userActivity={userActivity} account={account} /> 
        <h1>favorites</h1>
        <ManageFavorites />
      </div>

      <div className='anime-info'>
        <h2>Anime Details</h2>
        <p>English Name: {animeInfo.name}</p>
        <p>Japanese Name: {animeInfo.jap_name}</p>
        <p>Status: {animeInfo.status}</p>
        <p>Format: {animeInfo.format}</p>
        <p>Episodes: {animeInfo.episodes}</p>
        <p>Average Score: {animeInfo.average_score}</p>
        <p>Aired: {new Date(animeInfo.start_date).toLocaleDateString("en-US")} -  {new Date(animeInfo.end_date).toLocaleDateString("en-US")} </p>
        <p>Season: {animeInfo.season}</p>
        <div>Genres:
          <ul>
            {genre.map(genre => 
              <li>{genre}</li>
              )}
          </ul>
        </div>
        <div>Studios:
          <ul>
            {studio.map(studio => 
              <li>{studio}</li>
              )}
          </ul>
        </div>
      </div>
      <div className='content'>
        {animeInfo.character ? <AnimeProfileDashboard animeInfo={animeInfo} anime_id={anime_id}  /> : ""}
      </div>
     
      

   </div>

  )
}

export default AnimeProfile