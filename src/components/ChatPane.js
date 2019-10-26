import React from 'react'

import Message from './Message'

const ChatPane = () => {
  return (
    <div>
      <div className="level">
        <div className="level-left">
          < Message />
        </div>
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-right">
          < Message />
        </div>
      </div>
    </div>
  )
}

export default ChatPane
