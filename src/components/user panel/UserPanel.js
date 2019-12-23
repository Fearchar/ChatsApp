import React, { useState } from 'react'

import { PaneRouter, Pane, setRoute } from '../common/PaneRouter'
import UserTopBar from './UserTopBar'
import ThreadsPane from './ThreadsPane'
import NewThreadPane from './NewThreadPane'

const UserPanel = ({ threads, contacts, focusThread, setFocusThread }) => {

  return (
    <div>
      <UserTopBar setRoute={setRoute} />
      <PaneRouter
        panes={[
          new Pane('ThreadsPane',
            <ThreadsPane
              threads={threads}
              focusThread={focusThread}
              setFocusThread={setFocusThread}
            />),
          new Pane('NewThreadPane',
            <NewThreadPane contacts={contacts} />)
        ]}
      />
    </div>
  )
}
export default UserPanel
