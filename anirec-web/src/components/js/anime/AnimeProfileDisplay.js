import React, {useState, useEffect} from 'react'
import AnimeNavBar from './AnimeNavBar'
import AnimeProfileDashboard from './AnimeProfileDashboard'
import AnimeActivty from './AnimeActivity';
import ManageFavorites from './ManageFavorites';
import default_banner_image from '../../images/wp5195565-ps4-anime-girl-wallpapers.jpg'
import {Link} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import reactImageSize from 'react-image-size';



const AnimeProfileDisplay = ({animeInfo, userActivity, setUserActivity, recommendation, genre, studio, anime_id, account, activtiesExist, setActivitiesExist, favExist, setFavExist}) => {
  const [hght, setHght] = useState(0)
  
  const getHeight = async () => {
    const {height } = await reactImageSize(animeInfo.cover_image)
    setHght(height)
  }

  useEffect(() => {
    getHeight()
  })

  const content = () => {
    if (hght > 331){
      const mystyle = {
        marginTop: '-12.0%'
      }
        return <div className='content' style={mystyle}>
        {animeInfo.character ? <AnimeProfileDashboard 
                                  animeInfo={animeInfo} 
                                  anime_id={anime_id} 
                                  recommendation={recommendation}  
                                /> : ""}
      </div>
    
    }
    else if (hght > 289 && hght < 330){
      const mystyle = {
        marginTop: '-10%'
      }
        return <div className='content' style={mystyle}>
        {animeInfo.character ? <AnimeProfileDashboard 
                                  animeInfo={animeInfo} 
                                  anime_id={anime_id} 
                                  recommendation={recommendation}  
                                /> : ""}
      </div>
    
    }else if (hght > 251 && hght < 290) {
      const mystyle = {
        marginTop: '-7%'
      }
      return <div className='content' style={mystyle}>
      {animeInfo.character ? <AnimeProfileDashboard 
                                animeInfo={animeInfo} 
                                anime_id={anime_id} 
                                recommendation={recommendation}  
                              /> : ""}
    </div>
    }else if (hght > 226 && hght < 252) {
      const mystyle = {
        marginTop: '-6%'
      }
      return <div className='content' style={mystyle}>
      {animeInfo.character ? <AnimeProfileDashboard 
                                animeInfo={animeInfo} 
                                anime_id={anime_id} 
                                recommendation={recommendation}  
                              /> : ""}
    </div>
    }else if (hght > 200 && hght < 226) {
      const mystyle = {
        marginTop: '-3%'
      }
      return <div className='content' style={mystyle}>
      {animeInfo.character ? <AnimeProfileDashboard 
                                animeInfo={animeInfo} 
                                anime_id={anime_id} 
                                recommendation={recommendation}  
                              /> : ""}
    </div>
    }
    
    else {
      return <div className='content'>
      {animeInfo.character ? <AnimeProfileDashboard 
                                animeInfo={animeInfo} 
                                anime_id={anime_id} 
                                recommendation={recommendation}  
                              /> : ""}
    </div>
     
  
    }

  }





  
 

  

  return (
    <div className='anime-container'>
      <div className='image-container'>
        {animeInfo.banner_image !== null ? <img src={animeInfo.banner_image} alt='banner_image'/>: <img src={default_banner_image} alt='def_banner_image'/>}
      </div>
      <AnimeNavBar anime_id={anime_id}/>
   
      <div className='profile-image'>
        <img src={animeInfo.cover_image} alt='cover_image'/>
      </div>
      <div className='contents'>

          <div className='profile-content'>
              <div className='activity'>
                <AnimeActivty anime_id={anime_id} 
                              animeInfo={animeInfo} 
                              userActivity={userActivity} 
                              setUserActivity={setUserActivity} 
                              account={account} 
                              activtiesExist={activtiesExist} 
                              setActivitiesExist={setActivitiesExist} /> 
                <h1>favorites</h1>
                <ManageFavorites anime_id={anime_id} 
                                 account={account} 
                                 exist={favExist} 
                                 setExist={setFavExist} />
                <ToastContainer />
              </div>

              <div className='anime-info'>
                <h2>Anime Details</h2>
                <p>Name: { animeInfo.name}</p>
                <p>English Name: {animeInfo.eng_title ? animeInfo.eng_title : "N/A"}</p>
                <p>Japanese Name: {animeInfo.jap_name}</p>
                <p>Status: {animeInfo.status}</p>
                <p>Format: {animeInfo.format}</p>
                <p>Episodes: {animeInfo.episodes}</p>
                <p>Average Score: {animeInfo.average_score ? animeInfo.average_score: "N/A"}</p>
                <p>Aired: {(animeInfo.start_date || animeInfo.end_date ) ? new Date(animeInfo.start_date).toLocaleDateString("en-US")  + " - " +  (animeInfo.end_date ? new Date(animeInfo.end_date).toLocaleDateString("en-US"): "ONGOING"): "TBA"} </p>
                <p>Season: {animeInfo.season}</p>

                <div><strong>Genres:</strong>
                  <ul style={{listStyle: 'none'}}>
                    {genre.map((genre,id) => 
                      <Link key={id} to={`/anime-categories/${genre}`}><li>{genre}</li></Link>
                      )}
                  </ul>
                </div>
                <div><strong>Studios:</strong>
                  <ul style={{listStyle: 'none'}}>
                    {studio.map((studio,id) => 
                      <Link key={id} to={`/anime-studio/${studio}`}><li>{studio}</li></Link>
                      )}
                  </ul>
                </div>
              </div>



          </div>


          {content()}

      </div>
    
     
      

   </div>
  )
}

export default AnimeProfileDisplay
