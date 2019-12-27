import React, { useState } from 'react'

import { PaneRouter, Routes } from '../common/PaneRouter'
import UserTopBar from './UserTopBar'
import ThreadsPane from './ThreadsPane'
import NewThreadPane from './NewThreadPane'
import ThreadBox from './ThreadBox'

const UserPanel = ({ threads, contacts, focusThread, setFocusThread }) => {

  return (
    <>
      <PaneRouter>
        <UserTopBar />
        <Routes>
          <NewThreadPane contacts={contacts} />
          <ThreadsPane
            threads={threads}
            focusThread={focusThread}
            setFocusThread={setFocusThread}
          />
        </Routes>
      </PaneRouter>
    </>
  )
}
export default UserPanel
