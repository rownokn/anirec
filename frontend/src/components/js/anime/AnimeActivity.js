import React, {useState} from 'react'
import Modal from "../Modal";
import { toast } from "react-toastify";
import validator from 'validator'



const AnimeActivty = ({anime_id, animeInfo, userActivity, setUserActivity, account, activtiesExist, setActivitiesExist}) => {
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(userActivity.status)
  const [episodesWatched, setEpisodesWatched] = useState(userActivity.episode_watched)
  const [score, setScore] = useState(userActivity.score)



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

      if (validator.isEmpty(status)){
        toast.error("Please Enter Rating", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(score.toString())){
        toast.error("Please Enter Score", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(episodesWatched.toString())){
        toast.error("Please Enter Episode Watched", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else{
        if (parseInt(score) < 0 || parseInt(score)  > 100){
          toast.error("invalid score: please choose between 0 and 100", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        }else if (parseInt(episodesWatched) < 0 || parseInt(episodesWatched)  > parseInt(animeInfo.episodes)){
          toast.error(`please choose between 0 and ${animeInfo.episodes}`, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        }else{
          const response = await fetch('http://localhost:8000/user/manage_activity', config);
          const userInfo = await response.json();
          toast.success(userInfo.msg, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
          setActivitiesExist(true)
          setUserActivity(userInfo.activities)


        }
      }

    }catch(e) {
      console.error(e)
    }

  }

  const deleteActivity = async () => {
    const config = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${account.session_id}`
      }
    }
    const response = await fetch(`http://localhost:8000/user/delete_activity/${account.account_id}/${anime_id}`, config);
    const userInfo = await response.json();
    toast.success(userInfo.msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast'
    });
    setUserActivity({})
    setActivitiesExist(false)
    
  }
  return (
    <div>
      {account.account_id ? (Object.keys(userActivity).length === 0 ? <button  className='profile-button activity-button' onClick={() => setShow(true)}>Add Activity</button>: <button className='profile-button activity-button' onClick={() => setShow(true)}>{status}</button> ) : <button className='profile-button activity-button'>Please Login to see activity</button>}
      <Modal title={animeInfo.name} onClose={() => setShow(false)} show={show}>
        <div className='manage'>
          <div className='user-activity'>
            <img src={animeInfo.cover_image} alt='cover_photo'/>
             {activtiesExist ? <button className='activity-button' onClick={deleteActivity}>Delete This Activity</button> : <button className='activity-button' onClick={deleteActivity} disabled>Delete This Activity</button> }
          </div>
          <div className='content'>
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
            <button className='activity-button' onClick={manageActivity}>Submit</button>
          </div>
        </div>
   
      </Modal>

    </div>
  )
}

export default AnimeActivty