import React from 'react'

const UserTopBar = ({ getRouterProps }) => {
  const { setRoute, goHome } = getRouterProps()

  return (
    <div className="level card">
      <div className="level-left" />
      <div className="level-right top-bar">
        <figure className="level-item image is-48x48 is-round">
          <img className="is-rounded" src="https://www.fillmurray.com/300/200" alt="Placeholder image" />
        </figure>
        <i
          className="fas fa-home fa-2x"
          onClick={goHome}
        />
        <i
          className="far fa-edit fa-2x"
          onClick={() => setRoute({ name: 'NewThreadPane' })}
        />
        {/* !!! Delete it's me temporary example */}
        <i
          className="fas fa-chevron-down fa-2x"
          onClick={() => setRoute({ name: 'ThreadBox', additonalProps: { itsMe: 'itsme' } })}
        />
      </div>
    </div>
  )
}

export default UserTopBar
