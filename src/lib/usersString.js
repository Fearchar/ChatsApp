import lastItem from './lastItem'

function usersString(users) {
  return users.reduce((str, user)  =>
    user !== lastItem(users) ? str + `${user.name}, ` : str + user.name
  , '')
}

export default usersString
