import React from 'react'
import {useParams} from 'react-router-dom'
import AnimeData from '../AnimeData'
import Loading from '../Loading';
import {useQuery} from 'react-query'


const fetchAnimeCategories = async (category_name) => {
  const response = await fetch(`http://localhost:8000/anime/anime_by_category/${category_name}`);
  return await response.json()
} 

const AnimeListCategories = () => {
  const { category_name } = useParams();

  const {isLoading, data} = useQuery([category_name], async () =>{
    const data = await fetchAnimeCategories(category_name)
    return data
  })

  if (isLoading){
    return <Loading />
  }

  return (
    <div className='popular'>
      <h2>{category_name}</h2>
      <AnimeData animeData={data} style='popular-anime' />
    </div> 
   
  )



} 

export default AnimeListCategories
