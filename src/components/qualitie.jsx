import React from 'react'

const Qualitie = ({ quality }) => {
  const getBadgeClasses = (color) => {
    return 'badge m-1 bg-' + color
  }
  return <span className={getBadgeClasses(quality.color)} key={quality._id}>{quality.name}</span>
}

export default Qualitie
