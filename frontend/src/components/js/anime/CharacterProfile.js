import React, {useState, useEffect}  from 'react'
import {useParams} from 'react-router-dom'


const CharacterProfile = () => {
  const { character_id } = useParams();
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const character = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/character/${character_id}`);
      const info = await response.json()
      setProfile(info.character)

    }catch(err){
      setIsError(true)
    }
  }

  useEffect(() => {
    character()
  }, [])

  return (
    <div className='anime-summary'>
      <div className='ch-name'>
        <img src={profile.image} alt='character'/>
        <p>{profile.name}</p>
      </div>
      <div className='character-summary'>
        <p>{profile.description}</p>
      </div>
      
    </div>
  )

}



export default CharacterProfile