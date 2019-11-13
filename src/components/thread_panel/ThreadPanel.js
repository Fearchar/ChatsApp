import React from 'react'

import ChatPane from './ChatPane'

const ThreadPanel = ({ thread }) => {
  const threadUsers = thread && [ ...thread.admins, thread.participants ].map(user => `${user.name},`).join(' ')
  return (
    <div>
      <div className="level card top-bar">
        {thread &&
          <div className="level-left">
            <figure className="level-item image is-48x48 is-round">
              <img className="is-rounded" src="https://www.placecage.com/c/460/300" alt="Placeholder image" />
            </figure>
            <p className="level-item has-text-weight-bold">{thread.name}</p>
            <p className="level-item">{threadUsers}</p>
          </div>}
      </div>
      {thread &&
        <ChatPane thread={thread}/>}
    </div>

  )
}

export default ThreadPanel
