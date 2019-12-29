import React from 'react'

import UserThumbnail from '../UserThumbnail'

const ContactBox = ({
  contact, contact: { name, imageUrl },
  isParticipant,
  onClickFunction
}) => {
  const shortName = name.length <= 20 ? name : `${name.slice(0, 20)} ...`

  return (
    <div
      className={`level box ${isParticipant ? 'is-info' : ''}`}
      onClick={() => onClickFunction(contact)}
    >
      <div className="level-left">
        <UserThumbnail imageUrl={imageUrl} />
        <h3 className="level-item has-text-weight-bold">{shortName}</h3>
      </div>
    </div>
  )
}

export default ContactBox
