import React, {useState, useEffect, useContext} from 'react'
import { AccountContext } from '../account_management/AccountProvider'
import {Link} from 'react-router-dom'
import Loading from '../Loading'
import AnimeData from '../AnimeData'
const UserRecommended = () => {
  const {account} = useContext(AccountContext)
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animeList, setAnimeList] = useState([])

  const anime = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/rec_by_user/${account.account_id}`);
      const info = await response.json()
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      setAnimeList(info)

    }catch (err){
      console.error(err)
 }

  }

  useEffect(() => {
    anime()
    
  }, [account.account_id])

  return (
    <div>
      {!isLoading ? 
        <div class='user-rec'>
        <p class='header'>Recommended For User</p>
        <AnimeData animeData={animeList} style={'popular-anime'} />
    </div> : <Loading/>}
    </div>
  
  )
}

export default UserRecommended