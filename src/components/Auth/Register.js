import React from 'react'

import Auth from './Auth'
import { Form, Field } from './lib/Form'

const Register = () => {
  return (
    <Auth>
      <Form
        title="Register"
        hasbox={true}
        fields={[
          new Field('Username', 'text', 'Enter username'),
          new Field('Email', 'email', 'Enter email'),
          new Field('Password', 'password', 'Enter password'),
          new Field('Password Confirmation', 'password', 'Confirm password')
        ]}
      />
    </Auth>
  )
}

export default Register
