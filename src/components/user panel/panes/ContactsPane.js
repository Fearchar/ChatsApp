import React, { useState } from 'react'

import { Form, Field } from '../../common/Form'
import UserBox from './UserBox'
import filterUsers from '../../../lib/filterUsers'

const ContactsPane = ({ contacts, getRouterProps }) => {
  const [ fields, setFields ] = useState({})
  const { setRoute } = getRouterProps()

  return (
    <>
      <Form
        title="Contacts"
        hasBox={true}
        buttonName="Add contact"
        fields={[
          new Field('', 'text', 'Search current contacts', 'search')
        ]}
        fieldSetter={setFields}
      />
      <div className="card scrolls">
        {filterUsers(contacts, fields.search)
          .map(contact =>
            <UserBox
              key={contact._id }
              user={contact}
              onClickFunction={() => setRoute(
                { name: 'ContactDetailPane', extraProps: { contactId: contact._id } }
              )}
            />)}
      </div>
    </>
  )
}

export default ContactsPane
