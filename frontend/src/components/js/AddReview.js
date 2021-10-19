import React, {useState} from 'react'
import { toast } from "react-toastify";
import validator from 'validator'


const AddReview = ({animeHandler, animeList, account, anime_id}) => {
  const [rating, setRating] = useState('') 
  const [score, setScore] = useState('') 
  const [summary, setSummary] = useState('') 
  const [description, setDescription] = useState('') 
  
  const ratingHandler = e => {
    setRating(e.target.value)
  } 

  const scoreHandler = e => {
    setScore(e.target.value)
  }

  const summaryHandler = e => {
    setSummary(e.target.value)
  }

  const descriptionHandler = e => {
    setDescription(e.target.value)
  }

  const addReview = async () => {
    try {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          "description": description,
          "summary": summary,
          "rating": parseInt(rating),
          "score": parseInt(score),
          "user_id": account.account_id,
          "anime_id": anime_id

        }),
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${account.session_id}`

        }
      }

      if (validator.isEmpty(anime_id)){
        toast.error("Please Select Anime", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }
      else if (validator.isEmpty(rating)){
        toast.error("Please Enter Rating", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(score)){
        toast.error("Please Enter Score", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(summary)){
        toast.error("Please Enter Summary", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      }else if (validator.isEmpty(description)){
        toast.error("Please Enter Description", {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast'
        });
      } else{
        if (parseInt(score) < 0 || parseInt(score)  > 100) {
          toast.error("invalid score: please choose between 0 and 100", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        } else if (parseInt(rating) < 0 || parseInt(rating) > 5){
          toast.error("invalid rating: please choose between 1 and 5", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });
        } else{
          const response = await fetch('http://localhost:5000/user/add_review', config);
          const userInfo = await response.json();
          toast.success("New Review Added", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast'
          });

        }
        

      }
    }catch(e) {
      console.log(e)
    }
  }
  
  return (
    <div className='add-review'>
       <p>Add Review</p>
       <div className='review-input'>
       {animeHandler ?  <select onChange={animeHandler} placeholder='Status'>
              <option value>Anime Name</option>
              {animeList.map ((anime) => 
                <option value={anime.id}>{anime.title}</option>
              )}
              
            </select> : ""}
       <input type='number' placeholder='Rating'  onChange={ratingHandler} />
       <input type='number' placeholder='Score'  onChange={scoreHandler} />
       <input type='text' placeholder='Summary'  onChange={summaryHandler} />
       <textarea  placeholder='Description' rows="10" cols="100"  onChange={descriptionHandler}>
      </textarea>
       <button onClick={addReview}>submit</button>
       
    </div>
    
 </div>
  )
}

export default AddReview

