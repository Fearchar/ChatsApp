import React from 'react'
import moment from 'moment'

import ThreadBox from './ThreadBox'
import { Form, Field } from '../common/Form'
import lastItem from '../../lib/lastItem'

const ThreadsPanel = ({ threads, setFocusThread }) => {
  function lastMessageSort(array) {

    return array.sort((threadA, threadB) => {
      const msA = threadA.messages.length &&
        moment(lastItem(threadA.messages).createdAt).valueOf()
      const msB = threadB.messages.length &&
        moment(lastItem(threadB.messages).createdAt).valueOf()

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
            setFocusThread={setFocusThread}
          />
        )}
      </div>
    </div>
  )
}

export default ThreadsPanel
