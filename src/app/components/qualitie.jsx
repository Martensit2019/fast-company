import React from 'react'

const Qualitie = ({ color, name }) => {
  const getBadgeClasses = (color) => {
    return 'badge m-1 bg-' + color
  }
  return <span className={getBadgeClasses(color)}>{name}</span>
}

export default Qualitie
