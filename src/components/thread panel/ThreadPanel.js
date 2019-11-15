import React from 'react'

import ChatPane from './ChatPane'
import ThreadTopBar from './ThreadTopBar'
import SendMessagePane from './SendMessagePane'

const ThreadPanel = ({ thread, addMessage }) =>
  <div>
    <ThreadTopBar {...thread} />
    {thread && <ChatPane messages={thread.messages}/>}
    {thread && <SendMessagePane
      threadId={thread._id}
      addMessage={addMessage}
    />}
  </div>

export default ThreadPanel
