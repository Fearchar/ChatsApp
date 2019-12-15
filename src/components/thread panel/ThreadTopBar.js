import React from 'react'

import lastItem from '../../lib/lastItem'

const ThreadTopBar = ({ _id, name, admins, participants }) => {
  const threadUsers = _id && [ ...admins, ...participants ]
  const usersStr = threadUsers && threadUsers.map(user =>
    user !== lastItem(threadUsers) ? `${user.name},` : user.name
  ).join(' ')

  return (
    <div className="level card top-bar">
      {_id &&
        <div className="level-left">
          <figure className="level-item image is-48x48 is-round">
            <img
              className="is-rounded"
              src="https://www.placecage.com/c/460/300"
              alt="Placeholder image"
            />
          </figure>
          <h2 className="level-item has-text-weight-bold">{name}</h2>
          <p className="level-item">{usersStr}</p>
        </div>}
    </div>
  )
}

export default ThreadTopBar
