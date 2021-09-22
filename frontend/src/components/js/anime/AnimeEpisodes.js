import React, {useState, useEffect} from 'react'

const AnimeEpisodes = ({anime_id}) => {
  const [animeEpisodes, setAnimeEpisodes] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const episodes = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/episodes/${anime_id}`);
      const info = await response.json()
      console.log(info)
      setAnimeEpisodes(info.anime_episodes)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    episodes()
  }, [])

  console.log(animeEpisodes)


  return (
    <div className='anime-summary'>
      <h2>Anime Episodes</h2>
      <ul>
        {animeEpisodes ? animeEpisodes.map((epi) => 
          <li>
            {epi.name}
          </li>
        ): "Episodes Not Available Please check other sites for the episodes of this anime"}
      </ul>
      Episodes can be watched on <b>Crunchyroll</b>
    </div>
  )
}

export default AnimeEpisodes