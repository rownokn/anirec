import React, {useState, useEffect}  from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import Loading from '../Loading'

const fetchCharacterBio = async (character_id) => {

  const response = await fetch(`http://localhost:8000/anime/character/${character_id}`);
  return await response.json()
} 


const CharacterProfile = () => {
  const { character_id } = useParams();

  const {isLoading, data} = useQuery([character_id], async () =>{
    const data = await fetchCharacterBio(character_id)
    return data.character
  })


  if (isLoading){
    return <Loading />
  }


  return (
    <div className='anime-summary'>
      <div className='ch-name'>
        <img src={data.image} alt='character'/>
        <p>{data.name}</p>
      </div>
      <div className='character-summary'>
        <p>{data.description}</p>
      </div>
      
    </div>
  )

}



export default CharacterProfile