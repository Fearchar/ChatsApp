import React from 'react'

const ContactBox = ({ imgUrl, name }) =>
  <div className="level box">
    <div className="level-left">
      <figure className="level-item image is-48x48 is-round">
        <img
          className="is-rounded"
          src={imgUrl || 'https://www.fillmurray.com/300/200'}
          alt="User image"
        />
      </figure>
      <h3 className="level-item has-text-weight-bold">{name}</h3>
    </div>
  </div>

export default ContactBox
