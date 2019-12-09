import React from 'react'

import MessagesPane from './MessagesPane'
import ThreadTopBar from './ThreadTopBar'
import SendMessagePane from './SendMessagePane'

const ThreadPanel = ({ thread }) =>
  <div>
    <ThreadTopBar {...thread} />
    {thread && <MessagesPane messages={thread.messages} />}
    {thread && <SendMessagePane threadId={thread._id} />}
  </div>

export default ThreadPanel
