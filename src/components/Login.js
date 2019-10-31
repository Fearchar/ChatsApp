import React from 'react'
import { Link } from 'react-router-dom'

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
            <form className="box">
              <h2 className="title">Login</h2>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <hr />
              <p className="has-text-centered">Not registered?</p>
              <Link to="/register">
                <p className="has-text-centered">Sign Up</p>
              </Link>

            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
