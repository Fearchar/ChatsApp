import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UserBox from './UserBox'
import { Form, Field } from '../../common/Form'
import Auth from '../../../lib/Auth'
import usersString from '../../../lib/usersString'
import filterUsers from '../../../lib/filterUsers'

const AddContactPane = () => {
  const [ fields, setFields ] = useState({})
  const [ users, setUsers ] = useState(null)
  const [ focusUsers, setFocusUsers ] = useState([])

  useEffect(() => {
    axios.get('/api/users', Auth.header)
      .then(res => setUsers(res.data))
      // !!! What to do with err?
      .catch(err => console.log(err))
  }, [])

  function toggleUser() {

  }

  return (
    <>
      <Form
        title="Add Contact"
        hasBox={true}
        fields={[ new Field('', 'text', 'Search', 'search') ]}
        fieldSetter={setFields}
      >

        <h3 className="has-text-weight-bold">Contacts</h3>
        {!focusUsers.length ?
          <p className="is-italic">Add contact</p>
          :
          <p>{usersString(focusUsers)}</p>}
        {/*!!! errors && errors.users && <p className="help is-danger">{errors.users}</p>*/}
        <br />
        <button
          className="button is-info"
        >Add Contacts</button>

      </Form>

      <div className="card scrolls">
        {filterUsers(users || [], fields.search)
          .map(user =>
            <UserBox
              key={user._id }
              user={user}
              onClickFunction={() => setFocusUsers(...focusUsers, user)}
            />)}
      </div>
    </>
  )
}

export default AddContactPane
