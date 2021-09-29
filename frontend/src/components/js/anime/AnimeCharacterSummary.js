import React, {useState, useEffect} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const AnimeCharacterSummary = ({anime_id}) => {
  const [animeCharacters, setAnimeCharacters] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { url } = useRouteMatch();


  const animeCharacter = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/characters_list/${anime_id}`);
      const info = await response.json()
      console.log(info)
      setAnimeCharacters(info.anime_characters)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    animeCharacter()
  }, [])
  
  return (

      <div className='content-list'>
        {animeCharacters.map (char => 
        <Link to={`${url}/character-profile/${char.id}`}>
          <div>
            <img src={char.image} alt='inu' />
           <p>{char.name}</p>
          </div>
        </Link>
          
        )}

      
      </div>     
  )

}

 


export default AnimeCharacterSummary