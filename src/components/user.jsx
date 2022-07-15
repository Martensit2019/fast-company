import React from 'react'
import Qualitie from './qualitie'
import Bookmark from './bookmark'



const User = ({ user, onDelete }) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <Qualitie quality={quality} key={quality._id} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} / 5</td>
        <td><Bookmark /></td>
        <td>
          {/* <button className="btn btn-danger"> */}
          <button className="btn btn-danger" onClick={()=>onDelete(user._id)}>
            {/* <button className="btn btn-danger" onClick={() => handleDelete(user._id)}> */}
            Удалить
          </button>
        </td>
      </tr>
    </>
  )
}

export default User
