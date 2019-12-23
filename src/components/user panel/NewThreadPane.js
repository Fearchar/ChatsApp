import React, { useState } from 'react'
import axios from 'axios'

import { Form, Field } from '../common/Form'
import ContactBox from './ContactBox'
import Auth from '../../lib/Auth'
import usersString from '../../lib/usersString'

const NewThreadPane = ({ contacts }) => {
  const [ fields, setFields ] = useState({})
  const [ errors, setErrors ] = useState(null)
  const [ participants, setParticipants ] = useState([])

  function toggleContactInclusion(contact) {
    const participantIndex = participants.findIndex(p => p.name === contact.name)
    const result = [ ...participants ]

    if (participantIndex === -1) {
      result.push(contact)
    } else {
      result.splice(participantIndex, 1)
    }

    setParticipants(result)
  }

  function createThread() {
    const participantIds = participants.map(participant => participant._id)
    const name = fields.name
    const reqBody = { name, participantIds }

    axios.post('/api/threads', reqBody, Auth.header)
      .catch(err => setErrors(err.response.data.errors))
  }

  function filterContacts(contacts, { search }) {
    const regex = new RegExp(search, 'i')

    return !search ? contacts : contacts.filter(contact => regex.test(contact.name))
  }

  return (
    <div>
      <Form
        title="New Group"
        hasBox={true}
        buttonName="Create group"
        fields={[
          new Field('', 'text', 'Enter name', 'name'),
          new Field('', 'text', 'Search contacts', 'search')
        ]}
        fieldSetter={setFields}
        fieldErros={errors}
      />

      <div className="box">
        <h3 className="has-text-weight-bold">Group participants</h3>
        {!participants.length ?
          <p className="is-italic">Add contacts to group</p>
          :
          <p>{usersString(participants)}</p>}
      </div>

      <div className="card scrolls">
        {contacts && filterContacts(contacts, fields)
          .map(contact =>
            <ContactBox
              key={contact._id}
              contact={contact}
              isParticipant={participants.includes(contact)}
              toggleContactInclusion={toggleContactInclusion}
            />)}
      </div>
    </div>
  )
}

export default NewThreadPane
