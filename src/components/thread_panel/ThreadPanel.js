import React from 'react'

import ChatPane from './ChatPane'
import ThreadTopBar from './ThreadTopBar'

const ThreadPanel = ({ thread }) => {

  return (
    <div>
      <ThreadTopBar {...thread} />
      {thread && <ChatPane messages={thread.messages}/>}
      <div className="level card">
        <div className="column is-1">
          <button className="button is-rounded">🙂</button>
        </div>
        <div className="column is-10">
          <textarea className="textarea" rows="4" placeholder="Type message" />
        </div>
        <div className="column is-10">
          <button className="button">send</button>
        </div>
      </div>
    </div>

  )
}

export default ThreadPanel
