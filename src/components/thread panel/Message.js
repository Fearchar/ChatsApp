import React from 'react'

import Auth from '../../lib/Auth'
import newLineNodes from '../../lib/newLineNodes'
import formatDate from '../../lib/formatDate'

const Message = ({ user, content, createdAt }) => {
  const isClient = Auth.isClient(user)

  return (
    <div className="level">
      {isClient && <div className="level-left" />}
      <div className={`level-${isClient ? 'right' : 'left'}`}>
        <div className={`box ${isClient ? 'is-primary' : 'is-info'}`}>
          <p>{user.name}</p>
          {newLineNodes(content, (paragraph, i)=>
            <p key={i}>{paragraph}</p>
          )}
          <p className="has-text-right help">{formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
