import React from 'react'
import {fetchPopularTrendData} from './PopularTrendingAnime'
import AnimeData from '../AnimeData';
import Loading from '../Loading';
import {useQuery} from 'react-query'




const PopularAnime = () => {
  const {isLoading, data} = useQuery('popular', fetchPopularTrendData)
  if (isLoading){
    return <Loading />
  }
  return (
    <div className='popular'>
      <h2>Popular Anime</h2>
      <AnimeData animeData={data.popular} style='popular-anime' />
    </div> 
  )

}

export default PopularAnime