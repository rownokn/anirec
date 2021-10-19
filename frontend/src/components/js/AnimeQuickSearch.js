import React, {useState} from 'react'
import Modal from "./Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading'
import AnimeData from './AnimeData';

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
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
      setAnimeList(info.anime)

    }catch (err){
      console.error(err)
 }

  }
  
  return (
    <Modal title="Anime Search" onClose={() => setShow(false)} show={show}>
    <div class='quick-search-bar'>    
      <input type='text' placeholder='Search' onChange={animeNameHandler} /><button onClick={anime}><i><FontAwesomeIcon icon={faSearch} /></i></button>
    </div>

    {!isLoading ? (animeList ? <AnimeData animeData={animeList} style={'anime-data anime-quick-search-data'} setShow={() => setShow(false)} />: ""): <Loading/>}
          
       
    
    </Modal>

    
  )
}

export default AnimeQuickSearch