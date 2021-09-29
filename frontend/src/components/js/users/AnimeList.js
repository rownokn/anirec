import React, {useState, useEffect, useContext} from 'react'
import SearchUserAnime from './SearchUserAnime'
import { AccountContext } from '../account_management/AccountProvider'
import {Link} from 'react-router-dom'


const AnimeList = () => {
  const {account} = useContext(AccountContext)
  const [userAnimeInfo, setUserAnimeInfo] = useState([])

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/user/user_activity`, {
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
      setIsError(true)
    }

  }


   useEffect(() => {
    user()
   }, [])


  return (
    <div>
      <SearchUserAnime />

      <div >
        <table className='anime-table'>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Episodes Watched</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {userAnimeInfo ? userAnimeInfo.map((user) => 
            <tr>
              <td><Link to={`/anime-profile/${user.anime_id}/anime-summary`}><img src={user.cover_image} alt='inu' /></Link></td>
              <td>{user.name}</td>
              <td>{user.progress}</td>
              <td>{user.score}%</td>
              <td>{user.status}</td>
            </tr>
          
          ) : "" }
         
            
          </tbody>


        </table>
  

      </div>
    </div>

  )
}

export default AnimeList