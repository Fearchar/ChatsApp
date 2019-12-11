import React from 'react'

import UserTopBar from './UserTopBar'
import ThreadsPanel from './ThreadsPanel'

const UserPanel = ({ threads, setFocusThread }) =>
  <div>
    <UserTopBar />
    <ThreadsPanel
      threads={threads}
      setFocusThread={setFocusThread}
    />
  </div>

export default UserPanel
