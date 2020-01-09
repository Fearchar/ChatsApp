function filterUsers(users, searchStr, ...excludeIds) {
  const regex = new RegExp(searchStr, 'i')

  users = users.filter(user => !excludeIds.includes(user._id))

  return !searchStr ? users : users.filter(contact => regex.test(contact.name))
}

export default filterUsers
