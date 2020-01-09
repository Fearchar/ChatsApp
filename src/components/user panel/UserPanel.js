import React from 'react'

import { PaneRouter, Routes } from './PaneRouter'
import UserTopBar from './UserTopBar'
import NewThreadPane from './panes/NewThreadPane'
import ContactsPane from './panes/ContactsPane'
import AddContactPane from './panes/AddContactPane'
import ContactDetailPane from './panes/ContactDetailPane'
import ThreadsPane from './panes/ThreadsPane'

const UserPanel = ({ user: { _id, imageUrl, threads, contacts }, focusThread, history, amendUser  }) =>
  <PaneRouter>
    <UserTopBar
      imageUrl={imageUrl}
      threads={threads}
      history={history}
    />

    <Routes>
      <NewThreadPane
        contacts={contacts}
      />
      <ContactsPane
        contacts={contacts}
      />
      <ContactDetailPane
        threads={threads}
      />
      <AddContactPane
        userId={_id}
        contacts={contacts}
      />
      <ThreadsPane
        threads={threads}
        focusThread={focusThread}
        amendUser={amendUser}
      />
    </Routes>
  </PaneRouter>

export default UserPanel
