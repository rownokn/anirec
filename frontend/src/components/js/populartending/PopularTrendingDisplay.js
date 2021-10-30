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
      <div className='anime-display'>
        <div className='popular'>
          <p className='header'>Popular Anime</p>

          <AnimeData animeData={data.popular.slice(0,6)} style={'popular-anime'} />

          <Link to='/more-popular-anime'> <p className='more'>View More Popular Anime</p></Link>
        </div>
          
        <div className='trend'>
          <p className='header'>Trending Anime</p>
          <AnimeData animeData={data.trend.slice(0,6)} style={'trending-anime'} />

         
          <Link to='/more-trending-anime'> <p className='more'>View More Trending Anime</p></Link>
         </div>
  
    </div>
      </div>
    )
  
}

export default PopulatTrendingDisplay