import React from 'react'

const ContactBox = ({
  contact, contact: { name, imgUrl },
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
        <figure className="level-item image is-48x48 is-round">
          {/* !!! Change stock photo for users without img */}
          <img
            className="is-rounded"
            src={imgUrl || 'https://static.thenounproject.com/png/538846-200.png'}
            alt="User image"
          />
        </figure>
        <h3 className="level-item has-text-weight-bold">{shortName}</h3>
      </div>
    </div>
  )
}

export default ContactBox
