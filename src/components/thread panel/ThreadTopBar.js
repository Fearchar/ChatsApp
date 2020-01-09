import React from 'react'

import usersString from '../../lib/usersString'

const ThreadTopBar = ({ _id, name, admins, participants }) => {
  const threadUsers = _id && [ ...admins, ...participants ]
  const usersStr = threadUsers && usersString(threadUsers)

  return (
    <div className="level card top-bar has-background-grey-lighter">
      {_id &&
        <div className="level-left">
          <h2 className="level-item is-size-4 has-text-weight-bold">{name}</h2>
          <p className="level-item">{usersStr}</p>
        </div>}
    </div>
  )
}

export default ThreadTopBar
