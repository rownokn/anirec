import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import welcome_image from '../images/87d5b33980c2ae8037c95f44cb91e514.png'

const Welcome = () => {
  return (
    <BrowserRouter>
    <div className='welcome'>
      <img src={welcome_image} alt='inu' />
    </div>
    </BrowserRouter>
  )
}

export default Welcome