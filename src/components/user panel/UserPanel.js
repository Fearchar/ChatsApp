import React from 'react'

import UserTopBar from './UserTopBar'
import ThreadsPanel from './ThreadsPanel'

const UserPanel = ({ threads }) =>
  <div>
    <UserTopBar />
    <ThreadsPanel threads={threads} />
  </div>

export default UserPanel
