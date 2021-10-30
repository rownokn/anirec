import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {useQuery} from 'react-query'
import Loading from '../Loading'
import loading_gif from '../../images/13335.gif'


const fetchAnimeReview = async (anime_id) => {
  const response = await fetch(`http://localhost:8000/anime/reviews/${anime_id}`);
  return await response.json()
} 

const AnimeReviews = ({anime_id}) => {
  const { url } = useRouteMatch();
  const {isLoading, data} = useQuery([anime_id], async () =>{
    const data = await fetchAnimeReview(anime_id)
    return data
  })

  if (isLoading){
    return <Loading />
  }

  return (
    <div className='anime-summary anime-reviews'>

      <h2>Anime Reviews</h2>
      <Link to={`${url}/add_anime_review`}><button>Add Review </button></Link>
      {data.anime_reviews ? (data.anime_reviews.length  ? data.anime_reviews.map((rev, id) => 
        <div key={id} className='reviews'>
          <div className='title'>
          <span className='score'>Score: {rev.score}%</span>
          <span className='summary'><p>{rev.sumary}</p></span>
          </div>
          <div className='body'><p dangerouslySetInnerHTML={{__html: rev.description}} /></div>
        </div>
        
      ): <div><img src={loading_gif} alt='loading' /> <h3>No Review</h3></div>):<div><img src={loading_gif} alt='loading' /> <h3>No Review</h3></div>}

    </div>
  )
}

export default AnimeReviews