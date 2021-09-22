import React, {useEffect, useState} from 'react'

const AnimeTags = ({anime_id}) => {
  const [animeTags, setAnimeTags] = useState([])
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tags = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/anime/tags/${anime_id}`);
      const info = await response.json()
      console.log(info)
      setAnimeTags(info.anime_tags)

    }catch (err){
      setIsError(true)
    }
  }

  useEffect(() => {
    tags()
  }, [])


  return (
    <div className='anime-summary'>
      <h2>Anime Tags</h2>
      <ul>
        {animeTags.map((tags) => 
          <li>
            {tags.name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default AnimeTags