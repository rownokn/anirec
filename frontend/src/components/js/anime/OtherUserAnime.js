import React, {useState, useEffect} from 'react'
import {Link, useeMatch} from 'react-router-dom'


const OtherUserAnime = ({anime_id}) => {
  const [otherAnime, setOtherAnime] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const other = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/recommendation_within_api/${anime_id}`);
      const info = await response.json()
      setOtherAnime(info.recommendation)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    other()
  }, [])
  return (
    <div className='content-list'>
      {otherAnime.slice(0,4).map(other =>
       <Link to={`/anime-profile/${other.id}/anime-summary`} >
         <div>
          <img src={other.image} alt='inu' />
          <p>{other.title}</p>
         </div>
       </Link>
         
        )}
  </div>
  )
}

export default OtherUserAnime