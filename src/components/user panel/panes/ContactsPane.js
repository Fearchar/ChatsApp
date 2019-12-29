import React, { useState } from 'react'

import { Form, Field } from '../../common/Form'
import ContactBox from './ContactBox'
import filterContacts from '../../../lib/filterContacts'

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
        {filterContacts(contacts, fields.search)
          .map(contact =>
            <ContactBox
              key={contact._id }
              contact={contact}
              onClickFunction={() => setRoute(
                { name: 'ContactDetailPane', extraProps: { contactId: contact._id } }
              )}
            />)}
      </div>
    </>
  )
}

export default ContactsPane
