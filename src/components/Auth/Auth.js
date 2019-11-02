import React from 'react'

const Auth = ({ children }) => {
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
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Auth
