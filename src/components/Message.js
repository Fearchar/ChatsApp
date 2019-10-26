import React from 'react'

const Message = ({ message }) => {
  message = {
    _id: '5db03128fb12a5443351525c',
    content: 'I\'m WORK!',
    user: {
      name: 'Jerry'
    },
    createdAt: '2019-10-23T10:53:28.953Z',
    updatedAt: '2019-10-23T10:53:28.953Z'
  }
  return (
    <div className="box">
      <p>{message.user.name}</p>
      <p>{message.content}</p>
      <p className="has-text-right">{message.createdAt}</p>
    </div>
  )
}

export default Message
