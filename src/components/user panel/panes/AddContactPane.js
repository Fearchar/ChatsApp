import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import UserBox from './UserBox'
import { Form, Field } from '../../common/Form'
import Auth from '../../../lib/Auth'
import filterUsers from '../../../lib/filterUsers'

const AddContactPane = ({ userId, contacts }) => {
  const [ fields, setFields ] = useState({})
  const [ users, setUsers ] = useState(null)
  const [ focusUser, setFocusUser ] = useState(null)
  const contactIds = contacts ? contacts.map(user => user._id) : []

  useEffect(() => {
    axios.get('/api/users', Auth.header)
      .then(res => setUsers(res.data))
      // !!! What to do with err?
      .catch(err => console.log(err))
  }, [])

  function toggleFocusUser(user) {
    if (user !== focusUser) {
      setFocusUser(user)
    } else {
      setFocusUser(null)
    }
  }

  function addContact() {

    if (focusUser && contactIds.includes(focusUser._id)) {
      toast.error(`You have already added ${focusUser.name} as a contact.`)
      return
    } else if (!focusUser) {
      return
    }

    axios.put('/api/userAddContact', { contactId: focusUser._id }, Auth.header)
      .then(() => {
        toast.success(`${focusUser.name} has been added to your contacts`)
      })
      // !!! What to do with err?
      .catch(err => console.log(err))

  }

  return (
    <>
      <Form
        title="Add Contact"
        hasBox={true}
        fields={[ new Field('', 'text', 'Search', 'search') ]}
        fieldSetter={setFields}
        onSubmit={addContact}
      >

        <h3 className="has-text-weight-bold">Contact</h3>
        {!focusUser ?
          <p className="is-italic">None</p>
          :
          <p>{focusUser.name}</p>}
        {/*!!! errors && errors.users && <p className="help is-danger">{errors.users}</p>*/}
        <br />
        <button
          className="button is-info"
        >Add</button>

      </Form>

      <div className="box scrolls medium-big-scroller has-background-grey-lighter">
        {!users ?
          <p>Loading ...</p>
          :
          filterUsers(users, fields.search, userId)
            .map(user =>
              <UserBox
                key={user._id }
                user={user}
                highlight={user === focusUser}
                onClickFunction={() => toggleFocusUser(user)}
              />)}
      </div>
    </>
  )
}

export default AddContactPane
