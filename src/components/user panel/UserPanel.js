import React from 'react'

import { PaneRouter, Routes } from './PaneRouter'
import UserTopBar from './UserTopBar'
import NewThreadPane from './panes/NewThreadPane'
import ContactsPane from './panes/ContactsPane'
import ContactDetailPane from './panes/ContactDetailPane'
import ThreadsPane from './panes/ThreadsPane'

const UserPanel = ({ imageUrl, threads, contacts, focusThread, setFocusThread }) =>
  <PaneRouter>
    <UserTopBar imageUrl={imageUrl} />

    <Routes>
      <NewThreadPane contacts={contacts} />
      <ContactsPane contacts={contacts} />
      {/* !!! ContactDetailPane dependant on extraProps */}
      <ContactDetailPane />
      <ThreadsPane
        threads={threads}
        focusThread={focusThread}
        setFocusThread={setFocusThread}
      />
    </Routes>
  </PaneRouter>

export default UserPanel
