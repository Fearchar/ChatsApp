import React from 'react'
import moment from 'moment'

import ThreadBox from './ThreadBox'
import { Form, Field } from '../common/Form'

const ThreadsPanel = ({ threads }) => {
  function lastMessageSort(array) {

    return array.sort((threadA, threadB) => {
      const msA = threadA.messages.length &&
        moment(threadA.messages[0].createdAt).valueOf()
      const msB = threadB.messages.length &&
        moment(threadB.messages[0].createdAt).valueOf()

      return msB - msA
    })
  }

  return (
    <div>
      <Form fields={[ new Field('', 'text', 'Search') ]} />
      <div className="card scrolls">
        {threads && lastMessageSort(threads).map(thread =>
          <ThreadBox
            key={thread._id}
            thread={thread}
          />
        )}
      </div>
    </div>
  )
}

export default ThreadsPanel
