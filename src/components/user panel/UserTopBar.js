import React from 'react'
import { toast } from 'react-toastify'

import UserThumbnail from './UserThumbnail'
import Auth from '../../lib/Auth'

const UserTopBar = ({ getRouterProps, imageUrl, history }) => {
  const { setRoute, goHome } = getRouterProps()

  function logout() {
    Auth.removeToken()
    history.push('/login')
    toast.success('You have successfully logged out.')
  }

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
        <i
          className="fas fa-user-plus fa-2x"
          onClick={() => setRoute({ name: 'AddContactPane' })}
        />
        <i
          className="fas fa-user-times fa-2x is-danger"
          onClick={logout}
        />
      </div>
    </div>
  )
}

export default UserTopBar
