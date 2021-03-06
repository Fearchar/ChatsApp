import React, { useRef, useEffect } from 'react'

import Message from './Message'

const MessagesPane = ({ messages }) => {
  const scrollDummyRef = useRef(null)
  useEffect(() => {
    scrollDummyRef.current.scrollIntoView()
  })

  return (
    <div className="scrolls bigger-scroller has-background-white-ter">
      {messages && messages.map(message =>
        <Message
          key={message._id}
          {...message}
        />
      )}
      <div ref={scrollDummyRef}></div>
    </div>
  )
}

export default MessagesPane
