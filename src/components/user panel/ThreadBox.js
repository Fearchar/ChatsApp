import React from 'react'

const ThreadBox = ({ thread }) => {
  const lastMessage = thread.messages[thread.messages.length - 1]

  return (
    <div className="box" >
      <p className="has-text-weight-bold">{thread.name}</p>
      <p>
        {thread.messages.length ?
          `${lastMessage.user.name}: ${lastMessage.content.slice(0, 10)}`
          :
          '...'
        }
      </p>
    </div>
  )
}

export default ThreadBox
