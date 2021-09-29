import React, {useState, useEffect}  from 'react'
import {Link} from 'react-router-dom'


const PopularTrendingAnime = () => {
  const [popularAnime, setPopularAnime] = useState([])
  const [trendingAnime, setTrendingAnime] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  const populartrend = async () => {
    setIsError(false);
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/anime/populartrend');
    const anime = await response.json()
    console.log(anime)
    setPopularAnime(anime.popular)
    setTrendingAnime(anime.trend)
   
  } 

  useEffect(() => {
    populartrend()
    
  }, [])

  return (
    <div class='anime-display'>
      <div class='popular'>
        <p class='header'>Popular Anime</p>
        <div class='popular_anime'>
        {popularAnime.slice(0,6).map((anime) => 
        <Link to={`/anime-profile/${anime.id}/anime-summary`}>
          <div>
            <img src={anime.image} alt='anime_cover' />
            <p className='title'>{anime.title}</p>
          </div>

        </Link>
          
        )}    
        </div>
        <p class='more'>View More Popular Anime</p>
      </div>
        
      <div class='trend'>
        <p class='header'>Trending Anime</p>
        <div class='trending_anime'>
        {trendingAnime.slice(0,6).map((anime) => 
         <Link to={`/anime-profile/${anime.id}/anime-summary`}>
            <div>
              <img src={anime.image} alt='anime_cover' />
              <p className='title'>{anime.title}</p>
            </div>

         </Link>
         
        )}
            
        </div>
        <p class='more'>View More Trending Anime</p>
       </div>

    </div>
  )


}

export default PopularTrendingAnime

