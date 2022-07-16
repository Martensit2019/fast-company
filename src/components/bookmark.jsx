import React, {useState} from "react"

const Bookmark = ({...rest}) => {
  const [isAddFavorite, setIsAddFavorite] = useState(false)

  const onToggleBookMark=()=>{
    setIsAddFavorite((prevState) => !prevState)
  }

  return <div className="btn btn-outline-secondary" onClick={onToggleBookMark}><i className={'bi bi-bookmark' + (isAddFavorite ? '-fill' : '')}></i></div>  
}

export default Bookmark