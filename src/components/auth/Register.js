import React, { useState } from 'react'
import axios from 'axios'

import AuthPage from './AuthPage'
import { Form, Field } from '../common/Form'

const Register = ({ history }) => {
  const [ fieldValues, setFieldValues ] = useState(null) /* { fieldName: fieldValue, } */
  const [ fieldErrors, setFieldErrors ] = useState(null) /* { errorName: errorMessage } */

  function attemptRegister() {
    axios.post('/api/register', fieldValues)
      .then(() => history.push('/login'))
      .catch(err => setFieldErrors(err.response.data.errors))
  }

  return (
    <AuthPage>
      <Form
        title="Register"
        hasBox={true}
        buttonName="Submit"
        fields={[
          new Field('Username', 'text', 'Enter username', 'name'),
          new Field('Email', 'email', 'Enter email'),
          new Field('Password', 'password', 'Enter password'),
          new Field('Password Confirmation', 'password', 'Confirm password')
        ]}
        fieldErrors={fieldErrors}
        fieldSetter={setFieldValues}
        onSubmit={attemptRegister}
      />
    </AuthPage>
  )
}

export default Register
