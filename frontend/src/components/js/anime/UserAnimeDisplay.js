import React, {useState, useEffect}  from 'react'
import AnimeRec from './AnimeRec';


const UserAnimeDisplay = ({anime_id}) => {
  const [animeReview, setAnimeReview] = useState([])
  const [animeActivity, setAnimeActivity] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recommendations = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/recommendation/${anime_id}`);
      const info = await response.json()
      console.log(info)
      setAnimeActivity(info.user_activity)
      setAnimeReview(info.review)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    recommendations()
  }, [])

  console.log(animeReview)
  return (
    <span>
      <p>Similmar Anime That Users Watched</p>
      <AnimeRec animeRec={animeReview}/>

      <p>Similmar Anime That Users Reviewed</p>
      <AnimeRec animeRec={animeActivity}/>   
          

    </span>
  )

}

export default UserAnimeDisplay