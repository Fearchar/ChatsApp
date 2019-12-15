import React, { useState } from 'react'
import moment from 'moment'

import ThreadBox from './ThreadBox'
import { Form, Field } from '../common/Form'
import lastItem from '../../lib/lastItem'

const ThreadsPane = ({ threads, focusThread, setFocusThread }) => {
  const [ fields, setFields ] = useState({})

  function lastMessageSort(array) {

    return array.sort((threadA, threadB) => {
      const aMs = threadA.messages.length &&
        moment(lastItem(threadA.messages).createdAt).valueOf()
      const bMs = threadB.messages.length &&
        moment(lastItem(threadB.messages).createdAt).valueOf()

      return bMs - aMs
    })
  }

  function filterThreads(threads, { search }) {
    const regex = new RegExp(search, 'i')

    return !search ? threads : threads.filter(thread => {
      return (
        regex.test(thread.name) ||
        thread.participants.some(p => regex.test(p.name)) ||
        thread.admins.some(a => regex.test(a.name))
      )
    })
  }

  return (
    <div>
      <Form
        hasBox={true}
        buttonName="Search"
        fields={[ new Field('', 'text', 'Search', 'search') ]}
        fieldSetter={setFields}
      />
      <div className="card scrolls">
        {threads && lastMessageSort(filterThreads(threads, fields))
          .map(thread =>
            <ThreadBox
              key={thread._id}
              thread={thread}
              isFocus={thread === focusThread}
              setFocusThread={setFocusThread}
            />)}
      </div>
    </div>
  )
}

export default ThreadsPane
