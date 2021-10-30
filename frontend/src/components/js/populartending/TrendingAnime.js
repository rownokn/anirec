import AnimeData from '../AnimeData';
import Loading from '../Loading';
import {fetchPopularTrendData} from './PopularTrendingAnime'
import {useQuery} from 'react-query'


const TrendingAnime = () => {
  const {isLoading, data} = useQuery('popular', fetchPopularTrendData)

  if (isLoading){
    return <Loading />
  }

  return (
      <div className='trend'>
        <h2>Trending Anime</h2>
        <AnimeData animeData={data.trend} style='trending-anime' />
      </div>
  )

}

export default TrendingAnime