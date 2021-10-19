import React from 'react'
import loading_image from '../images/hatsunemiku-miku.gif'



const Loading = () => {
  return (
    <div className='loading'>
      <img src={loading_image} alt='loading_image'/>
    </div>
  )
}

export default Loading