import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ContactDetailPane = ({ contactId }) => {
  const [ contact, setContact ] = useState({})
  const { _id, name, email, imgUrl } = contact

  useEffect(() => {
    function fetchFullContact() {
      axios.get(`/api/users/${contactId}`)
        .then(res => setContact(res.data))
    }

    fetchFullContact()
  }, [ contactId ])

  return !_id ?
    <h2>Loading ...</h2>
    :
    (
      <div className="box has-text-centered">
        <figure className="image is-128x128">
          {/* !!! Change stock photo for users without img */}
          <img
            src={imgUrl || 'https://static.thenounproject.com/png/538846-200.png'}
            alt="User image"
          />
        </figure>
        <h3>{name}</h3>
        <h4>{email}</h4>
      </div>
    )
}

export default ContactDetailPane
