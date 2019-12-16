import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AuthPage from './AuthPage'
import { Form, Field } from '../common/Form'
import Auth from '../../lib/Auth'

const Login = ({ history }) => {
  const [ fieldValues, setFieldValues ] = useState(null) /* { fieldName: fieldValue, } */
  const [ fieldErrors, setFieldErrors ] = useState(null) /* { errorName: "errorMessage" } */

  function attemptLogin() {
    axios.post('/api/login', fieldValues)
      .then(res => {
        Auth.token = res.data.token
        history.push('/main')
      })
      //!!! Unauthorized not setting properly
      .catch(err => setFieldErrors(err.response.data.errors))
  }

  return (
    <AuthPage>
      <Form
        title="Login"
        hasBox={true}
        buttonName="Submit"
        fields={[
          new Field('Email', 'email', 'Enter email'),
          new Field('Password', 'password', 'Enter password')
        ]}
        fieldErrors={fieldErrors}
        fieldSetter={setFieldValues}
        onSubmit={attemptLogin}
      >
        <hr />
        <p className="has-text-centered">Not registered?</p>
        <Link to="/register">
          <p className="has-text-centered">Sign Up</p>
        </Link>
      </Form>
    </AuthPage>
  )
}

export default Login
