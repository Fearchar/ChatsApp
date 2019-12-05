import React from 'react'

const ThreadTopBar = ({ _id, name, admins, participants }) => {
  const threadUsers = _id && [ ...admins, ...participants ]
  const usersStr = _id && threadUsers.map((user, i) =>
    i !== threadUsers.length - 1 ? `${user.name},` : user.name
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
          <p className="level-item has-text-weight-bold">{name}</p>
          <p className="level-item">{usersStr}</p>
        </div>}
    </div>
  )
}

export default ThreadTopBar
