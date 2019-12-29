import React, { useState } from 'react'

import { Form, Field } from '../../common/Form'

const AddContactPane = () => {
  const [ fields, setFields ] = useState(null)
  
  return (
    <Form
      title="Add Contact"
      hasBox={true}
      fields={[ new Field('', 'text', 'Search', 'search') ]}
      fieldSetter={setFields}
    />
  )
}

export default AddContactPane
