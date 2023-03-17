import React, {useState, useEffect}  from 'react'
import AnimeData from '../AnimeData';
import loading_gif from '../../images/13335.gif'
import error_gif from '../../images/tumblr_1522db257c8a8aadfd28391c265d19aa_b2d810c9_540.gif'


const UserAnimeDisplay = ({anime_id}) => {
  const [animeReview, setAnimeReview] = useState([])
  const [animeActivity, setAnimeActivity] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const recommendations = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/anime/recommendation/${anime_id}`);
      const info = await response.json()
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      setAnimeActivity(info.user_activity)
      setAnimeReview(info.review)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    recommendations()
  }, [])

  return (
    <div >    
      {isError ? <div className='rec'><img src={error_gif} alt='error_gif'/><h3>No Recommendations</h3></div> : (!isLoading ? <span>
      <h3>Similar Anime That Users Watched</h3>
      <AnimeData animeData={animeReview} style={'content-list'}/>
      
      <h3>Similar Anime That Users Reviewed</h3>
      <AnimeData animeData={animeActivity} style={'content-list'}/>
    </span>:
    <div>
      <img src={loading_gif} alt='loading_image'/> 
       <h3>Loading Anime.....</h3>

       </div>)
    
}

    </div>
    
  )

}

export default UserAnimeDisplay