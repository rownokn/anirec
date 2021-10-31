import React, {useState, useEffect} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import AnimeData from './AnimeData';
import Loading from './Loading';
import validator from 'validator'
import { toast, ToastContainer } from "react-toastify";


const AdvancedSearch = () => {
  const [animeList, setAnimeList] = useState([])
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [tag, setTag] = useState('')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [season, setSeason] = useState('')
  const [format, setFormat] = useState('')
  const [status, setStatus] = useState('')
  const [studio, setStudio] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [genres, setGenres] = useState([])
  const [tags, setTags] = useState([])
  const [formats, setFormats] = useState([])
  const [statuses, setStatuses] = useState([])
  const [studios, setStudios] = useState([])
  const [disabledYear, setDisabledYear] = useState(false)


  const [isLoading, setIsLoading] = useState(false);

  const disableYear = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setDisabledYear(value)
    setYear("N/A")
  }

  const animeNameHandler = e => {
    setName(e.target.value)
  }

  const genreHandler = e => {
    setGenre(e.target.value)
  }

  const tagHandler = e => {
    setTag(e.target.value)
  }

  const yearHandler = e => {
    setYear(e.target.value)
  }

  const seasonHandler = e => {
    setSeason(e.target.value)
  }
  
  const formatHandler = e => {
    setFormat(e.target.value)
  }

  const statusHandler = e => {
    setStatus(e.target.value)
  }

  const studioHandler = e => {
    setStudio(e.target.value)
  }

  const startDateHandler = e => {
    setStartDate(e.target.value)
  }

  const endDateHandler = e => {
    setEndDate(e.target.value)
  }

  const getAnimeData = async() => {
    const response = await fetch(`http://localhost:8000/anime/advanced_anime_search`, {
      method: 'POST',
      body: JSON.stringify({
        "name": name,
        "genre": genre,
        "tag": tag,
        "year" : year,
        "season": season,
        "format" : format,
        "status" : status,
        "start_date" : startDate,
        "end_date" : endDate,
        "studio" : studio
      }),
      headers: {
        "Content-Type": 'application/json',
      }
    });
    const info = await response.json()
    return info;
  }

  const dropDown = async () => {
    const info = await getAnimeData()
    setGenres(info.dropdown.genre)
    setTags(info.dropdown.tag)
    setFormats(info.dropdown.format)
    setStatuses(info.dropdown.status)
    setStudios(info.dropdown.studio)
  }

  const anime = async () => {
    setIsLoading(true);
    try {
      
      const info = await getAnimeData()
      if (validator.isEmpty(name) && validator.isEmpty(genre) && validator.isEmpty(tag) && (validator.isEmpty(year) || year === 'N/A')
          && validator.isEmpty(season) && validator.isEmpty(format)
          && validator.isEmpty(status) && validator.isEmpty(studio)){
            toast.error("Please input Any of the field", {
              position: toast.POSITION.TOP_CENTER,
              className: 'toast'
            });
            setIsLoading(false) 
      }else {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
        setAnimeList(info.anime)
      }
      

    }catch (err){
      console.error(err)
 }

  }
  useEffect(() => {
    dropDown()
  }, [])

  return (
    <div className='advanced-search'>
        <div className='mobile-search'>
          <div className='header'><h4>Anime Search</h4></div>
          <label for='anime-name'>Name: </label>
          <input type='text' onChange={animeNameHandler} />
          <label for='genre-name'>Genre: </label>
          <select onChange={genreHandler}>
                <option></option>
                {
                  genres.map((genre, id) => 
                    <option key={id} value={genre}>{genre}</option>
                  )
                }
          </select>
          <label for='tag-name'>Tag: </label>
          <select onChange={tagHandler}>
                    <option></option>
                    {
                        tags.map((tag, id) => 
                          <option key={id} value={tag}>{tag}</option>
                        )
                    }
          </select>
          <label for='tag-name'>Studio: </label>
          <select onChange={studioHandler}>
                    <option></option>
                    {
                        studios.map((studio, id) => 
                          <option key={id} value={studio}>{studio}</option>
                        )
                    }
          </select>
          <label for='tag-name'>Season: </label>
          <select onChange={seasonHandler}>
                  <option></option>
                  <option value='FALL'>Fall</option>
                  <option value='WINTER'>Winter</option>
                  <option value='SUMMER'>Summer</option>
                  <option value='SPRING'>Spring</option>
          </select>
          <label for='tag-name'>Format: </label>
          <select onChange={formatHandler}>
                    <option></option>
                    {
                        formats.map((format, id) => 
                          <option key={id} value={format}>{format}</option>
                        )
                    }
          </select>
          <label for='tag-name'>Status: </label>
          <select onChange={statusHandler}>
                    <option></option>
                    {
                        statuses.map((status ,id) => 
                          <option key={id}  value={status}>{status}</option>
                        )
                    }
          </select>
          <label for='tag-name'>Date Release Range: </label>
          <div className='date'><input type='date' onChange={startDateHandler} /><span>TO</span> <input type='date' onChange={endDateHandler} /></div>
          <label for='tag-name'>Year: </label>
          {disabledYear ? <input id="rangeInput"  type='range' min='1970' max={new Date().getFullYear().toString()} onChange={yearHandler} disabled/> : <input id="rangeInput"  type='range' min='1970' max={new Date().getFullYear().toString()} onChange={yearHandler}/>}
          <div className='year-display'>
                <label>{disabledYear ? 'N/A' : year}</label>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; &nbsp; 
                <label>Disable Year:</label> <input type="checkbox" onChange={disableYear}/>
          </div>   
          <button className='submit' onClick={anime}>Submit</button>   

        </div>



        <table className='anime-search'>
          <tr>
            <th colspan="3" className='title'>Anime Search</th>
          </tr>
          <tr className='header'>
              <td>Name: </td>
              <td>Genre: </td>
              <td>Tag: </td>
          </tr>
          <tr className='input'>
              <td><input type='text' onChange={animeNameHandler} /></td>
              <td><select onChange={genreHandler}>
                <option></option>
                {
                  genres.map((genre, id) => 
                    <option key={id} value={genre}>{genre}</option>
                  )
                }
                </select>
              </td>
              <td><select onChange={tagHandler}>
                    <option></option>
                    {
                        tags.map((tag, id) => 
                          <option key={id} value={tag}>{tag}</option>
                        )
                    }
                  </select>
              </td>
          </tr>
          <tr className='header'>
              <td>Studio: </td>
              <td>Season: </td>
              <td>Format: </td>
          </tr>
          <tr className='input'>
              <td><select onChange={studioHandler}>
                    <option></option>
                    {
                        studios.map((studio, id) => 
                          <option key={id} value={studio}>{studio}</option>
                        )
                    }
                  </select>
              </td>
              <td><select onChange={seasonHandler}>
                  <option></option>
                  <option value='FALL'>Fall</option>
                  <option value='WINTER'>Winter</option>
                  <option value='SUMMER'>Summer</option>
                  <option value='SPRING'>Spring</option>
                </select></td>
                <td><select onChange={formatHandler}>
                    <option></option>
                    {
                        formats.map((format, id) => 
                          <option key={id} value={format}>{format}</option>
                        )
                    }
                  </select>
              </td>
          </tr>
          <tr className='header'>
              <td>Status:</td>
              <td colSpan="2">Year:</td>
          </tr>
          <tr className='input'>
              <td><select onChange={statusHandler}>
                    <option></option>
                    {
                        statuses.map((status , id) => 
                          <option key={id} value={status}>{status}</option>
                        )
                    }
                  </select>
              </td>
              <td className='year'>
                {disabledYear ? <input id="rangeInput"  type='range' min='1970' max={new Date().getFullYear().toString()} onChange={yearHandler} disabled/> : <input id="rangeInput"  type='range' min='1970' max={new Date().getFullYear().toString()} onChange={yearHandler}/>}

              </td>
              <td className='year-display'>
                {disabledYear ? 'N/A' : year}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; &nbsp; 
                Disable Year: <input type="checkbox" onChange={disableYear}/>
                </td>
          </tr>
          <tr className='header'>             
              <td colspan="2">Date Release Range:</td>
              <td></td>
          </tr>
          <tr className='input'>
              <td colspan="2" ><div className='date'><input type='date' onChange={startDateHandler} />&nbsp;&nbsp; <span>To</span> &nbsp;&nbsp; <input type='date' onChange={endDateHandler} /></div></td>
          </tr>
          <tr className='input'>
              <td><button className='submit' onClick={anime}>Submit</button></td>
              <td></td>
              <td></td>
              
          </tr>
        </table>
        
        <div className='popular'>
          {animeList ? (isLoading ? <Loading /> : <AnimeData animeData={animeList} style={'popular-anime'} />) : "" }
        </div>
        <ToastContainer />
    </div>
  
  )
}

export default AdvancedSearch