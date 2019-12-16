import React, { useState } from 'react'
import axios from 'axios'

import { Form, Field } from '../common/Form'
import ContactBox from './ContactBox'

const NewThreadPane = ({ threads, contacts }) => {
  const [ fields, setFields ] = useState({})

  //!!! should probably change name
  function has121Thread(threads, contact) {
    return threads.some(thread => {
      const users = [ ...thread.participants, ...thread.admins ]
      return users.length < 3 && users.some(user => user.name === contact.name)
    })
  }

  function createThread(participants) {
  }

  //!!! should probably change name
  //!!! the logic to stop double threads should probably take place on the backend
  function contactThread(user, contact) {
    if (!has121Thread(user.threads, contact)) createThread(contact)
  }

  function filterContacts(contacts, { search }) {
    const regex = new RegExp(search, 'i')

    return !search ? contacts : contacts.filter(contact => regex.test(contact.name))
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
        {contacts && filterContacts(contacts, fields)
          .map(contact =>
            <ContactBox
              key={contact._id}
              {...contact}
            />)}
      </div>
    </div>
  )
}

export default NewThreadPane
