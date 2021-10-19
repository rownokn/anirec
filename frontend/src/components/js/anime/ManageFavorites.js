import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";


const ManageFavorites = ({account, anime_id, exist, setExist}) => {


  const addToFavorites = async () => {
    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          "user_id": account.account_id,
          "anime_id" : anime_id
        }),
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${account.session_id}`
        }
      }
      const response = await fetch('http://localhost:5000/user/add_favorite', config);
      const userInfo = await response.json();
      setExist(userInfo.exist)
      toast.success(userInfo.msg, {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast'
      });

      setExist(true)

    }catch(e) {
      console.log(e)
    }
    
  }

 

  const deleteFavorites = async () => {
    try {
      const config = {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${account.session_id}`
        }
      }
        const response = await fetch(`http://localhost:5000/user/delete_favorite/${account.account_id}/${anime_id}`, config);
        const userInfo = await response.json();
        setExist(userInfo.exist)
        toast.success(userInfo.msg, {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
        setExist(false)

    }catch(e) {
      console.log(e)
    }

  }


  return (
      <div className='fav-buttons'>
        <div>
          {exist && account.account_id ? <button className='profile-button fav' onClick={deleteFavorites}>unsave</button> : <button className='profile-button fav' disabled>unsave</button>}
        </div>
        <div class='save-button'>
          {!exist && account.account_id ? <button className='profile-button fav' onClick={addToFavorites}>save</button> : <button className='profile-button fav' disabled>save</button>}
          
        </div>
        

    </div>

  )
} 

export default ManageFavorites