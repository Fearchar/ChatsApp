import React from 'react'

import Message from './Message'

const ChatPane = ({ messages }) => {

  return (
    <div
      className="scrolls specify"
    >
      {messages && messages.map(message =>
        <Message
          key={message._id}
          {...message}
        />)}
    </div>
  )
}

export default ChatPane
