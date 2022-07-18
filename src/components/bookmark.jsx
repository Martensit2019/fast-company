import React from "react"

const Bookmark = ({status, ...rest}) => {  

  return <div className="btn btn-outline-secondary" {...rest}><i className={'bi bi-bookmark' + (status ? '-fill' : '')}></i></div>
}

export default Bookmark