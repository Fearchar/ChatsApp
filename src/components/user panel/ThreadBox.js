import React from 'react'

import lastItem from '../../lib/lastItem'
import formatDate from '../../lib/formatDate'

const ThreadBox = ({ thread, isFocus, setFocusThread }) => {
  const lastMessage = lastItem(thread.messages)

  return (
    <div
      className={`box ${isFocus ? 'is-info' : ''}`}
      onClick={() => setFocusThread(thread)}
    >
      <p className="has-text-weight-bold">{thread.name}</p>
      <p>
        {thread.messages.length ?
          `${lastMessage.user.name}: ${lastMessage.content.slice(0, 20)}...`
          :
          '...'
        }
      </p>
      <p className="help has-text-right">
        {thread.messages.length && formatDate(lastMessage.createdAt)}
      </p>
    </div>
  )
}

export default ThreadBox
