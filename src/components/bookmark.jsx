import React, {useState} from "react"

const Bookmark = () => {
  const [isAddFavorite, setIsAddFavorite] = useState(false)

  const addFavirite=()=>{
    setIsAddFavorite((prevState) => !prevState)
  }

  return <div className="btn btn-outline-secondary" onClick={addFavirite}><i className={'bi bi-bookmark' + (isAddFavorite ? '-fill' : '')}></i></div>  
}

export default Bookmark