import React from 'react'

const SearchStatus = ({ length }) => {

  const renderPhrase = (num) => {
    const lastOne = Number(num.toString().slice(-1))
    if (num > 4 && num < 15) return 'человек'
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека'
    if (lastOne === 1) return 'человек'
    return 'человек'
  }

  return (
    <>
      <span className={'badge bg-' + (length ? 'primary' : 'danger') + ' fs-4'}>
        {length ? `${length} ${renderPhrase(length)} тусанет с тобой сегодня` : 'Никто с тобой не тусанет'}
      </span>
    </>
  )
}

export default SearchStatus
