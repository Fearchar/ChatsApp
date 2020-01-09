import React, { useState } from 'react'
import moment from 'moment'

import ThreadBox from './ThreadBox'
import { Form, Field } from '../../common/Form'
import lastItem from '../../../lib/lastItem'

const ThreadsPane = ({ threads, focusThread, amendUser }) => {
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
    <>
      <Form
        title="Threads"
        className="has-background-grey-lighter"
        hasBox={true}
        fields={[ new Field('', 'text', 'Search', 'search') ]}
        fieldSetter={setFields}
      />
      <div className="box scrolls big-scroller has-background-grey-lighter">
        {threads && lastMessageSort(filterThreads(threads, fields))
          .map(thread =>
            <ThreadBox
              key={thread._id}
              thread={thread}
              isFocus={thread === focusThread}
              onClick={thread => amendUser({ type: 'focusThread:set', focusThread: thread })}
            />)}
      </div>
    </>
  )
}

export default ThreadsPane
