import React, {useState} from 'react'
import Modal from "../Modal";




const AnimeActivty = ({anime_id, animeInfo, userActivity, account}) => {
  const [show, setShow] = useState(false)
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(userActivity.status)
  const [episodesWatched, setEpisodesWatched] = useState(userActivity.episode_watched)
  const [score, setScore] = useState(userActivity.score)

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }

  const statusHandler = e => {
    setStatus(e.target.value)
  }

  const episodesWatchedHandler = e => {
    setEpisodesWatched(e.target.value)
  }

  const scoreHandler = e => {
    setScore(e.target.value)
  }


  const manageActivity = async () => {
    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          "id": userActivity.id,
          "status": status ? status : userActivity.status,
          "episode_watched": episodesWatched ? episodesWatched : userActivity.episode_watched,
          "score" : score ? score : userActivity.score,
          "user_id": account.account_id,
          "anime_id" : anime_id
        }),
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${account.session_id}`
        }
      }
      const response = await fetch('http://localhost:5000/user/manage_activity', config);
      const userInfo = await response.json();

    }catch(e) {
      console.log(e)
    }

  }

  console.log(userActivity)

  const deleteActivity = async () => {
    const config = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${account.session_id}`
      }
    }
    const response = await fetch(`http://localhost:5000/user/delete_activity/${account.account_id}/${anime_id}/${userActivity.id}`, config);
    const userInfo = await response.json();

  }

  

  return (
    <div>
      {account.account_id ? (isEmpty(userActivity) ? <button onClick={() => setShow(true)}>Add Activity</button>: <button onClick={() => setShow(true)}>{userActivity.status}</button> ) : <button>Please Login to see activity</button>}
      <Modal title={animeInfo.name} onClose={() => setShow(false)} show={show}>
        <div class='manage'>
          <div class='user-activity'>
            <img src={animeInfo.cover_image} alt='cover_photo'/>
            <button>Add To Favorites</button>
            <button onClick={deleteActivity}>Delete This Activity</button>
          </div>
          <div class='content'>
            <p>ACTIVITY</p>
            <select value={status} onChange={statusHandler} placeholder='Status'>
              <option value>Status</option>
              <option value='PAUSED'>Paused</option>
              <option value='PLANNING'>Planning</option>
              <option value='CURRENT'>Current</option>
              <option value='DROPPED'>Dropped</option>
              <option value='COMPLETED'>Completed</option>
              <option value='WATCHING'>Watching</option>
              <option value='REPEATING'>Repeating</option>
            
            </select>
            <input type='number' placeholder='Episode Watched' value={episodesWatched} onChange={episodesWatchedHandler}/>
            <input type='number' placeholder='Score' value={score} onChange={scoreHandler}/>
            <button onClick={manageActivity}>Submit</button>
          </div>
        </div>
   
      </Modal>

    </div>
  )
}

export default AnimeActivty