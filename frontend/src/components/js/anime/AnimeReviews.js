import React, {useState, useEffect} from 'react'

const AnimeReviews = ({anime_id}) => {
  const [animeReview, setAnimeReview] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reviews = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/reviews/${anime_id}`);
      const info = await response.json()
      setAnimeReview(info.anime_reviews)
      
    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    reviews()
  }, [])

  console.log(animeReview)
  return (
    <div className='anime-summary anime-reviews'>

      <h2>Anime Reviews</h2>
      {animeReview.map((rev) => 
        <div className='reviews'>
          <div className='title'>
          <span className='score'>Score: {rev.score}%</span>
          <span className='summary'><p dangerouslySetInnerHTML={{__html: rev.sumary}} /></span>
          </div>
          <div className='body'>{rev.description}</div>
        </div>
        
      )}

    </div>
  )
}

export default AnimeReviews