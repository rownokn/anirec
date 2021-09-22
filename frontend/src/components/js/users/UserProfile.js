import React from 'react'
import UserNavBar from './UserNavBar'
import UserProfileDashboard from './UserProfileDashboard'
import banner_image from '../../images/Beautiful-Anime-Banner-gdragon-sunny-cat-41532037-1500-500.jpeg'
import cover_image from '../../images/2627af529562d869a6acdea2bf5e83c0.jpeg'
import {useParams} from 'react-router-dom'



const UserProfile = () => {
  const {user_id} = useParams()


  
  return (
    <div className='user-container'>
      <div className='image-container'>
        <img src={banner_image} alt='banner' height='400'/>
      </div>
      <UserNavBar/>
   
      <div className='profile-image user-profile'>
        <img src={cover_image} alt='cover_image'/>
      </div>

      <div className='content'>
        <UserProfileDashboard user_id={user_id} />
      </div>
   </div>

  )
}

export default UserProfile