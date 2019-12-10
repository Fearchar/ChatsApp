import React from 'react'

const UserTopBar = () =>
  <div className="level card">
    <div className="level-left" />
    <div className="level-right top-bar">
      <figure className="level-item image is-48x48 is-round">
        <img className="is-rounded" src="https://www.fillmurray.com/300/200" alt="Placeholder image" />
      </figure>
      <i className="far fa-edit fa-2x"></i>
      <i className="fas fa-chevron-down fa-2x"></i>
    </div>
  </div>

export default UserTopBar
