import React from 'react'
import { Link } from 'react-router-dom'

import Auth from './Auth'
import { Form, Field } from './lib/Form'

const Login = () => {
  return (
    <Auth>
      <Form
        title="Login"
        hasbox={true}
        fields={[
          new Field('Email', 'email', 'Enter email'),
          new Field('Password', 'password', 'Enter password')
        ]}
      >
        <hr />
        <p className="has-text-centered">Not registered?</p>
        <Link to="/register">
          <p className="has-text-centered">Sign Up</p>
        </Link>
      </Form>
    </Auth>
  )
}

export default Login
