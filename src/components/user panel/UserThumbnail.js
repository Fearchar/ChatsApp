import React from 'react'

const UserThumbnail = ({ imageUrl, scale, isInlineBlock }) =>
  <figure className={`level-item image is-${scale || '64x64'} is-round ${isInlineBlock ? 'is-inline-block' : ''}`}>
    <img
      className="is-rounded"
      src={imageUrl || 'https://static.thenounproject.com/png/538846-200.png'}
      alt="User image"
    />
  </figure>

export default UserThumbnail
