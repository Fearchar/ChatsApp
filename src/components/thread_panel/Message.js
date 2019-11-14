import React from 'react'

import Auth from '../../lib/Auth'

const Message = ({ user, content, createdAt }) => {
  const isClient = Auth.isClient(user)
  return (
    <div className="level">
      {isClient && <div className="level-left" />}
      <div className={`level-${isClient ? 'right' : 'left'}`}>
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
