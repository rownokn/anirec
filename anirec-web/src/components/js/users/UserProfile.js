import React from 'react'
import UserNavBar from './UserNavBar'
import UserProfileDashboard from './UserProfileDashboard'
import banner_image from '../../images/wp5567600-anime-ps4-banner-4k-wallpapers.jpg'
import {useParams} from 'react-router-dom'

const UserProfile = () => {
  const {user_id} = useParams()


  
  return (
    <div className='user-container'>
      <div className='image-container'>
        <img src={banner_image} alt='banner' />
      </div>
      <UserNavBar/>
   
      <div className='content user-content'>
        <UserProfileDashboard user_id={user_id} />
      </div>
   </div>

  )
}

export default UserProfile