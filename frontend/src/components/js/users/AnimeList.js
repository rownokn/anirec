import React, {useState, useEffect, useContext} from 'react'
import SearchUserAnime from './SearchUserAnime'
import { AccountContext } from '../account_management/AccountProvider'
import {Link} from 'react-router-dom'


const AnimeList = () => {
  const {account} = useContext(AccountContext)
  const [animeName, setAnimeName] = useState('')
  const [userAnimeInfo, setUserAnimeInfo] = useState([])


  const animeHandler = e => {
    setAnimeName(e.target.value)
  }



  const user = async () => {

    try {
      const response = await fetch(`http://localhost:5000/user/user_activity`, {
      method: "POST",
       body: JSON.stringify({
         "user_id": account.account_id,
         "name": animeName
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
      <SearchUserAnime user={user} animeName={animeHandler} />

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
              <td>{user.eng_title ? (user.eng_title !== user.name ? user.eng_title + ' (' + user.name + ')' : user.name) :  user.name}</td>
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