import React from 'react'

import Message from './Message'

const ChatPane = ({ thread }) =>
  <div className="scrolls specify">
    {thread && thread.messages.map(message =>
      <Message key={message._id} {...message} />
    ).reverse()}
  </div>

export default ChatPane
