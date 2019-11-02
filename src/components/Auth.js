import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Form, Field } from './lib/Form'

const Auth = ({ page, history }) => {
  const [ fieldValues, setFieldValues ] = useState(/* { fieldName: fieldValue, } */)
  const [ fieldErrors, setFieldErrors ] = useState(/* { errorName: errorMessage } */)

  function sendForm(route, exitPath='') {
    axios.post(`${route}`, fieldValues)
      .then(res => {
        console.log(res.data.message)
        history.push(exitPath)
      })
      .catch(err => setFieldErrors(err.response.data.errors))
  }

  const attemptLogin = () => sendForm('/api/login', '/main')
  const attemptRegister = () => sendForm('/api/register', '/login')

  return (
    <main>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              ChatsApp
            </h1>
            <h2 className="subtitle">
              Another way to talk
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns is-desktop is-centered">
          <div className="column is-half">
            {page === 'login' ?
              <Form
                title="Login"
                hasBox={true}
                fieldSetter={setFieldValues}
                fields={[
                  new Field('Email', 'email', 'Enter email'),
                  new Field('Password', 'password', 'Enter password')
                ]}
                onSubmit={attemptLogin}
              >
                <button className="button is-info">Submit</button>
                <hr />
                <p className="has-text-centered">Not registered?</p>
                <Link to="/register">
                  <p className="has-text-centered">Sign Up</p>
                </Link>
              </Form> :
              <Form
                title="Register"
                hasBox={true}
                fieldSetter={setFieldValues}
                fields={[
                  new Field('Username', 'text', 'Enter username', 'name'),
                  new Field('Email', 'email', 'Enter email'),
                  new Field('Password', 'password', 'Enter password'),
                  new Field('Password Confirmation', 'password', 'Confirm password')
                ]}
                fieldErrors={fieldErrors}
                onSubmit={attemptRegister}
              >
                <button className="button is-info">Submit</button>
              </Form>
            }
          </div>
        </div>
      </section>
    </main>
  )
}

export default Auth
