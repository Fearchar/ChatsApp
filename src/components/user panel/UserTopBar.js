import React from 'react'

import UserThumbnail from './UserThumbnail'

const UserTopBar = ({ getRouterProps, imageUrl }) => {
  const { setRoute, goHome } = getRouterProps()

  return (
    <div className="level card">
      <div className="level-left" />
      <div className="level-right top-bar">
        <UserThumbnail
          imageUrl={imageUrl}
          scale={imageUrl ? '64x64' : '48x48'}
        />
        <i
          className="fas fa-home fa-2x"
          onClick={goHome}
        />
        <i
          className="far fa-edit fa-2x"
          onClick={() => setRoute({ name: 'NewThreadPane' })}
        />
        <i
          className="fas fa-user fa-2x"
          onClick={() => setRoute({ name: 'ContactsPane' })}
        />
        {/* !!! Not yet being used */}
        <i
          className="fas fa-user-plus fa-2x"
          onClick={() => setRoute({ name: 'NewContactPane' })}
        />
        {/* !!! Delete below it's me temporary example */}
        <i
          className="fas fa-chevron-down fa-2x"
          onClick={() => setRoute({ name: 'ThreadBox' })}
        />
      </div>
    </div>
  )
}

export default UserTopBar
