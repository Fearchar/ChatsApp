import React, { useEffect, useState } from 'react'
import axios from 'axios'

import UserThumbnail from '../UserThumbnail'

const ContactDetailPane = ({ contactId }) => {
  const [ contact, setContact ] = useState({})
  const { _id, name, email, imageUrl } = contact

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
        <UserThumbnail
          imageUrl={imageUrl}
          scale={'94x94'}
          isInlineBlock={true}
        />
        <h3 className="title is-3 has-text-weight-bold">{name}</h3>
        <h4 className="subtitle is-5">{email}</h4>
      </div>
    )
}

export default ContactDetailPane
