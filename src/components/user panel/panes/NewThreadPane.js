import React, { useState } from 'react'
import axios from 'axios'

import { Form, Field } from '../../common/Form'
import ContactBox from './ContactBox'
import Auth from '../../../lib/Auth'
import usersString from '../../../lib/usersString'
import filterContacts from '../../../lib/filterContacts'

const NewThreadPane = ({ contacts, getRouterProps }) => {
  const [ fields, setFields ] = useState({})
  const [ errors, setErrors ] = useState(null)
  const [ participants, setParticipants ] = useState([])
  const { goHome } = getRouterProps()

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
    const reqBody = { name, participants: participantIds }

    axios.post('/api/threads', reqBody, Auth.header)
      .then(goHome)
      .catch(err => setErrors(err.response.data.errors))
  }

  return (
    <>
      <Form
        title="New Thread"
        hasBox={true}
        fields={[
          new Field('', 'text', 'Enter name', 'name'),
          new Field('', 'text', 'Search contacts', 'search')
        ]}
        fieldSetter={setFields}
        fieldErros={errors}
        onSubmit={createThread}
      >
        {errors && errors.users && <p className="help is-danger">{errors.users}</p>}

        <h3 className="has-text-weight-bold">Group participants</h3>
        {!participants.length ?
          <p className="is-italic">Add contacts to group</p>
          :
          <p>{usersString(participants)}</p>}
        <br />
        <button
          className="button is-info"
        >Create group</button>
      </Form>

      <div className="card scrolls">
        {contacts && filterContacts(contacts, fields.search)
          .map(contact =>
            <ContactBox
              key={contact._id}
              contact={contact}
              isParticipant={participants.includes(contact)}
              onClickFunction={toggleContactInclusion}
            />)}
      </div>
    </>
  )
}

export default NewThreadPane
