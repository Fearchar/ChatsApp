import React from 'react'

const UserTopBar = ({ getRouterProps }) => {
  const { setRoute, goHome } = getRouterProps()

  return (
    <div className="level card">
      <div className="level-left" />
      <div className="level-right top-bar">
        <figure className="level-item image is-48x48 is-round">
          <img className="is-rounded" src="https://static.thenounproject.com/png/538846-200.png" alt="Placeholder image" />
        </figure>
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
          onClick={() => setRoute({ name: 'ThreadBox', addedProps: { itsMe: 'itsme' } })}
        />
      </div>
    </div>
  )
}

export default UserTopBar
