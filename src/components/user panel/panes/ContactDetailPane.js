import React, { useEffect, useState } from 'react'
import axios from 'axios'

import UserThumbnail from '../UserThumbnail'
import ThreadBox from './ThreadBox'
import Auth from '../../../lib/Auth'

const ContactDetailPane = ({ contactId, threads, getRouterProps }) => {
  const [ contact, setContact ] = useState({})
  const { _id, name, email, imageUrl } = contact
  const { setRoute } = getRouterProps()

  useEffect(() => {
    function fetchFullContact() {
      axios.get(`/api/users/${contactId}`, Auth.header)
        .then(res => setContact(res.data))
    }

    fetchFullContact()
  }, [ contactId ])

  function contactThreads(threads) {
    return threads
      .filter(thread => [ ...thread.admins, ...thread.participants ]
        .some(user => user.name === contact.name )
      )
  }

  return !_id ?
    <h2>Loading ...</h2>
    :
    (
      <>
        <div className="box has-text-centered">
          <h2 className="title is-3">Contact Details</h2>
          <UserThumbnail
            imageUrl={imageUrl}
            scale={'94x94'}
            isInlineBlock={true}
          />
          <h3 className="title is-3 has-text-weight-bold">{name}</h3>
          <h4 className="subtitle is-5">{email}</h4>
        </div>
        <h3 className="title is-4 has-text-centered">Shared Threads</h3>
        <div className="card scrolls">
          {contactThreads(threads).map(thread =>
            <ThreadBox
              key={thread._id}
              thread={thread}
              onClick={() => setRoute({ name: 'ThreadsPane' })}
            />
          )}
        </div>
      </>
    )
}

export default ContactDetailPane
