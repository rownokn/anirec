import React, {useState} from 'react'
import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const AnimeQuickSearch = ({setShow, show}) => {
  const [animeList, setAnimeList] = useState([])
  const [animeName, setAnimeName] = useState("")
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const animeNameHandler = e => {
    setAnimeName(e.target.value)
  }

  const anime = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/quick_search/${animeName}`);
      const info = await response.json()
      setAnimeList(info.anime)

    }catch (err){
      setIsError(true)
    }

  }
  
  return (
    <Modal title="Anime Search" onClose={() => setShow(false)} show={show}>
    <div class='quick-search-bar'>    
      <input type='text' placeholder='Search' onChange={animeNameHandler} /><button onClick={anime}><i><FontAwesomeIcon icon={faSearch} /></i></button>
    </div>
    <div className='anime-data anime-quick-search-data'>

          {animeList ? animeList.map((anime) => 
                
                 <Link to={`/anime-profile/${anime.id}/anime-summary`} onClick={() => setShow(false)}>
                   <div>
                    <img src={anime.cover_image} alt='inu' />
                    <p className='title'>{anime.name} </p>
                   </div>
                  </Link>
               
             ) : ""}
          
       
     </div>
    </Modal>
  )
}

export default AnimeQuickSearch