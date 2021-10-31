import React, {useState, useEffect, useContext} from 'react'
import { AccountContext } from '../account_management/AccountProvider'
import {Link} from 'react-router-dom'
import AnimeData from '../AnimeData'


const AnimeFavorites = () => {
  const {account} = useContext(AccountContext)
  const [userAnimeInfo, setUserAnimeInfo] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/user/user_favorite`, {
        method: "POST",
         body: JSON.stringify({
           "user_id": account.account_id
        }),
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${account.session_id}`
         }
        });
      const info = await response.json()
      setUserAnimeInfo(info.users)

    }catch (err){
      console.error(err)
 }

  }


   useEffect(() => {
    user()
   }, [])

  return (
    <div>
      {userAnimeInfo ? <AnimeData animeData={userAnimeInfo} style='anime-data' /> : ""}
    </div>

    
  )
}

export default AnimeFavorites