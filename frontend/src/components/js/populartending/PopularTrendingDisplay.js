import React from 'react'
import {Link} from 'react-router-dom'
import Loading from '../Loading';
import AnimeData from '../AnimeData';
import {fetchPopularTrendData} from './PopularTrendingAnime'
import {useQuery} from 'react-query'



const PopulatTrendingDisplay = () => {
  const {isLoading, data} = useQuery('populartrend', fetchPopularTrendData)

  if (isLoading){
    return <Loading />
  }

  return (
      <div>
      <div class='anime-display'>
        <div class='popular'>
          <p class='header'>Popular Anime</p>

          <AnimeData animeData={data.popular.slice(0,6)} style={'popular-anime'} />

          <Link to='/more-popular-anime'> <p class='more'>View More Popular Anime</p></Link>
        </div>
          
        <div class='trend'>
          <p class='header'>Trending Anime</p>
          <AnimeData animeData={data.trend.slice(0,6)} style={'trending-anime'} />

         
          <Link to='/more-trending-anime'> <p class='more'>View More Trending Anime</p></Link>
         </div>
  
    </div>
      </div>
    )
  
}

export default PopulatTrendingDisplay