import React from 'react'

const Message = ({ user, content, createdAt }) => {
  return (
    <div className="level">
      <div className="level-left" />
      <div className="level-right">
        <div className="box">
          <p>{user.name}</p>
          <p>{content}</p>
          <p className="has-text-right">{createdAt}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
