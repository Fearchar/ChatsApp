function filterUsers(users, searchStr) {
  const regex = new RegExp(searchStr, 'i')

  return !searchStr ? users : users.filter(contact => regex.test(contact.name))
}

export default filterUsers
