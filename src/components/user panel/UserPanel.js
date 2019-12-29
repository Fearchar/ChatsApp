import React from 'react'

import { PaneRouter, Routes } from './PaneRouter'
import UserTopBar from './UserTopBar'
import NewThreadPane from './panes/NewThreadPane'
import ContactsPane from './panes/ContactsPane'
import ContactDetailPane from './panes/ContactDetailPane'
import ThreadsPane from './panes/ThreadsPane'

const UserPanel = ({ imageUrl, threads, contacts, focusThread, amendUser }) =>
  <PaneRouter>
    <UserTopBar imageUrl={imageUrl} threads={threads} />

    <Routes>
      <NewThreadPane
        contacts={contacts}
      />
      <ContactsPane contacts={contacts} />
      <ContactDetailPane
        threads={threads}
      />
      <ThreadsPane
        threads={threads}
        focusThread={focusThread}
        amendUser={amendUser}
      />
    </Routes>
  </PaneRouter>

export default UserPanel
