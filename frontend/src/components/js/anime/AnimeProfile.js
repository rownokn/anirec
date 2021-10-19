import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import AnimeProfileDisplay from './AnimeProfileDisplay'
import { AccountContext } from '../account_management/AccountProvider'
import Loading from '../Loading'

const AnimeProfile = () => {
  const {account} = useContext(AccountContext)
  const { anime_id } = useParams();
  const [animeInfo, setAnimeInfo] = useState({})
  const [userActivity, setUserActivity] = useState({})
  const [recommendation, setRecommendation] = useState([])
  const [activtiesExist, setActivitiesExist] = useState(false)
  const [favExist, setFavExist] = useState(false);

  const [genre, setGenre] = useState([])
  const [studio, setStudio] = useState([])


  const [isLoading, setIsLoading] = useState(false);
  

  const anime = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/profile/${anime_id}/${account.account_id}`);
      const info = await response.json()
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      setAnimeInfo(info.anime)
      setGenre(info.anime.genre)
      setStudio(info.anime.studio)
      setUserActivity(info.activities)
      setRecommendation(info.recommendation)
      setActivitiesExist(info.activity_exist)
      setFavExist(info.favorite_exist)
   
      
      
      

    }catch (err){
      console.error(err)
 }

  }
   useEffect(() => {
     anime()
   }, [anime_id])
   
  return (
   !isLoading ? <AnimeProfileDisplay animeInfo={animeInfo} 
                                     userActivity={userActivity} 
                                     setUserActivity = {setUserActivity}
                                     recommendation={recommendation} 
                                     genre={genre} 
                                     studio={studio} 
                                     anime_id={anime_id} 
                                     account={account}
                                     activtiesExist={activtiesExist}
                                     setActivitiesExist={setActivitiesExist}
                                     favExist={favExist}
                                     setFavExist={setFavExist} />
                : <Loading />

  )
}

export default AnimeProfile