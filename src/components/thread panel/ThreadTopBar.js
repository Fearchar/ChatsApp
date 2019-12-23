import React from 'react'

import usersString from '../../lib/usersString'

const ThreadTopBar = ({ _id, name, admins, participants }) => {
  const threadUsers = _id && [ ...admins, ...participants ]
  const usersStr = threadUsers && usersString(threadUsers)

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
