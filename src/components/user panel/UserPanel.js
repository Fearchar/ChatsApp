import React from 'react'

import UserTopBar from './UserTopBar'
import { Form, Field } from '../common/Form'

const UserPanel = ({ threads }) =>
  <div>
    <UserTopBar />
    <div>
      <Form fields={[ new Field('', 'text', 'Search') ]} />
    </div>
    <div className="card scrolls">
      {threads && threads.map(thread => {
        const lastMessage = thread.messages[thread.messages.length - 1]
        return <div
          className="box"
          key={thread._id}
        >
          <p className="has-text-weight-bold">{thread.name}</p>
          <p>
            {thread.messages[0] ?
              `${lastMessage.user.name}: ${lastMessage.content.slice(0, 10)}`
              :
              '...'
            }
          </p>
        </div>
      }).reverse()}
    </div>
  </div>

export default UserPanel
