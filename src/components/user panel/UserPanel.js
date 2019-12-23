import React, { useState } from 'react'

import UserTopBar from './UserTopBar'
import ThreadsPane from './ThreadsPane'
import NewThreadPane from './NewThreadPane'

const UserPanel = ({ threads, contacts, focusThread, setFocusThread }) => {
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
        <NewThreadPane contacts={contacts} />}
    </div>
  )
}
export default UserPanel
