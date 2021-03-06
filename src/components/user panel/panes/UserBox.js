import React from 'react'

import UserThumbnail from '../UserThumbnail'

const UserBox = ({
  user, user: { name, imageUrl },
  highlight,
  onClickFunction
}) => {
  const shortName = name.length <= 20 ? name : `${name.slice(0, 15)} ...`

  return (
    <div
      className={`level box ${highlight ? 'is-info' : ''}`}
      onClick={() => onClickFunction(user)}
    >
      <div className="level-left">
        <UserThumbnail imageUrl={imageUrl} />
        <h3 className="level-item has-text-weight-bold">{shortName}</h3>
      </div>
    </div>
  )
}

export default UserBox
