import React, { useState } from 'react'

import { PaneRouter, Switch } from '../common/PaneRouter'
import UserTopBar from './UserTopBar'
import ThreadsPane from './ThreadsPane'
import NewThreadPane from './NewThreadPane'
import ThreadBox from './ThreadBox'

const UserPanel = ({ threads, contacts, focusThread, setFocusThread }) => {

  return (
    <>
      <PaneRouter>
        <UserTopBar />
        <Switch>
          <ThreadsPane
            threads={threads}
            focusThread={focusThread}
            setFocusThread={setFocusThread}
          />
          <NewThreadPane contacts={contacts} />
          <ThreadBox thread={threads[0]}/>
        </Switch>
      </PaneRouter>
    </>
  )
}
export default UserPanel
