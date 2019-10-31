import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Message from './Message'

const ChatPane = ({ socket }) => {
  const [ thread, setThread ] = useState(null)

  useEffect(() => {
    axios.get('/api/threads/5daf1f1a33a71d3a10b68cc9')
      .then(res => {
        setThread(res.data)
        socket.emit('thread:join', '5daf1f1a33a71d3a10b68cc9')
      })
    socket.on('message:new', message => {
      setThread(thread => {
        thread.messages.push(message)
        return thread
      })
    })
  })
  
  return (
    <div>
      {thread && thread.messages.map(message =>
        <Message key={message._id} {...message} />
      )}
    </div>
  )
}

export default ChatPane
