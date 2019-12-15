import React, { useState } from 'react'

import { Form, Field } from '../common/Form'
import ContactBox from './ContactBox'

const NewThreadPane = ({ contacts }) => {
  const [ fields, setFields ] = useState({})

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
          .map(contact => {
            console.log(contact)
            return (
              <ContactBox
                key={contact._id}
                {...contact}
              />)
          })}
      </div>
    </div>
  )
}

export default NewThreadPane
