import React from 'react'

import ChatPane from './ChatPane'
import ThreadTopBar from './ThreadTopBar'
import SendMessagePane from './SendMessagePane'

const ThreadPanel = ({ thread }) =>
  <div>
    <ThreadTopBar {...thread} />
    {thread && <ChatPane messages={thread.messages} />}
    {thread && <SendMessagePane threadId={thread._id} />}
  </div>

export default ThreadPanel
