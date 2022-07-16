import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    console.log('status');
    const newUsers = users.map((user) => ({
      ...user,
      isFavorite: false
    }))
    setUsers(newUsers)
  }

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
    </div>
  )
}

export default App
