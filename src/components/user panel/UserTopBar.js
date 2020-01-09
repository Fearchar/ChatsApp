import React from 'react'
import { toast } from 'react-toastify'

import UserThumbnail from './UserThumbnail'
import Icon from '../common/Icon'
import Auth from '../../lib/Auth'

const UserTopBar = ({ getRouterProps, imageUrl, history }) => {
  const { setRoute, goHome } = getRouterProps()

  function logout() {
    Auth.removeToken()
    history.push('/login')
    toast.success('You have successfully logged out.')
  }

  return (
    <div className="level card top-bar has-background-grey-lighter">
      <div className="level-left" />
      <div className="level-right top-bar">
        {/*!!! imageUrl sizing doesn't work for tall images*/}
        <UserThumbnail
          imageUrl={imageUrl}
          scale={imageUrl ? '64x64' : '48x48'}
        />
        <Icon
          name="home"
          onClick={goHome}
        />
        <Icon
          name="edit"
          onClick={() => setRoute({ name: 'NewThreadPane' })}
        />
        <Icon
          name="users"
          onClick={() => setRoute({ name: 'ContactsPane' })}
        />
        <Icon
          name="user-plus"
          onClick={() => setRoute({ name: 'AddContactPane' })}
        />
        <Icon
          name="user-times"
          className="is-danger"
          onClick={logout}
        />
      </div>
    </div>
  )
}

export default UserTopBar
