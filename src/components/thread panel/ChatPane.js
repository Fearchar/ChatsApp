import React from 'react'

import Message from './Message'

const ChatPane = ({ messages }) =>
  <div className="scrolls specify">
    {messages && messages.map(message =>
      <Message key={message._id} {...message} />
    ).reverse()}
  </div>

export default ChatPane
