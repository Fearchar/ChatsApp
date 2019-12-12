import React from 'react'

import UserTopBar from './UserTopBar'
import ThreadsPanel from './ThreadsPanel'

const UserPanel = ({ threads, focusThread, setFocusThread }) =>
  <div>
    <UserTopBar />
    <ThreadsPanel
      threads={threads}
      focusThread={focusThread}
      setFocusThread={setFocusThread}
    />
  </div>

export default UserPanel
