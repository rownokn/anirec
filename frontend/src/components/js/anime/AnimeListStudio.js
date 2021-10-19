import React from 'react'
import {useParams} from 'react-router-dom'
import AnimeData from '../AnimeData'
import Loading from '../Loading';
import {useQuery} from 'react-query'


const fetchAnimeStudio = async (studio_name) => {
  const response = await fetch(`http://localhost:5000/anime/anime_by_studio/${studio_name}`);
  return await response.json()
} 

const AnimeListStudio = () => {
  const { studio_name } = useParams();
  const {isLoading, data} = useQuery([studio_name], async () =>{
    const data = await fetchAnimeStudio(studio_name)
    return data
  })

  if (isLoading){
    return <Loading />
  }

  return (
    <div className='popular'>
      <h2>{studio_name}</h2>
      <AnimeData animeData={data} style='popular-anime' />
    </div>
  )
} 

export default AnimeListStudio