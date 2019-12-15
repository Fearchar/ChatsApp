import React, { useState } from 'react'

import UserTopBar from './UserTopBar'
import ThreadsPane from './ThreadsPane'
import NewThreadPane from './NewThreadPane'

const UserPanel = ({ threads, focusThread, setFocusThread }) => {
  const [ display, setDisplay ] = useState('ThreadsPane')

  return (
    <div>
      <UserTopBar setDisplay={setDisplay} />
      {display === 'ThreadsPane' &&
        <ThreadsPane
          threads={threads}
          focusThread={focusThread}
          setFocusThread={setFocusThread}
        />}
      {display === 'NewThreadPane' &&
        <NewThreadPane />}
    </div>
  )
}
export default UserPanel
