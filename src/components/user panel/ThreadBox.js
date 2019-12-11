import React from 'react'

import lastItem from '../../lib/lastItem'

const ThreadBox = ({ thread, setFocusThread }) => {
  const lastMessage = lastItem(thread.messages)

  return (
    <div
      className="box"
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
    </div>
  )
}

export default ThreadBox
