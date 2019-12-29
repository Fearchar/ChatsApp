import React from 'react'

import lastItem from '../../../lib/lastItem'
import formatDate from '../../../lib/formatDate'

const ThreadBox = ({ thread, isFocus, setFocusThread }) => {
  const lastMessage = lastItem(thread.messages)

  return (
    <div
      className={`box ${isFocus ? 'is-info' : ''}`}
      onClick={() => setFocusThread(thread)}
    >
      <h3 className="has-text-weight-bold">{thread.name}</h3>
      <p>
        {thread.messages.length ?
          `${lastMessage.user.name}: ${lastMessage.content.slice(0, 20)}...`
          :
          '...'
        }
      </p>
      {lastMessage &&
        <small className="help has-text-right">{formatDate(lastMessage.createdAt)}</small>}
    </div>
  )
}

export default ThreadBox
