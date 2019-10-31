import React from 'react'
import { Link } from 'react-router-dom'

import Form from './Form'

class Field {
  constructor(name, type, placeholder) {
    this.name = name
    this.type = type
    this.placeholder = placeholder
  }
}

const Login = () => {
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
            <Form
              title="Login"
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
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
