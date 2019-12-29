function filterContacts(contacts, searchStr) {
  const regex = new RegExp(searchStr, 'i')

  return !searchStr ? contacts : contacts.filter(contact => regex.test(contact.name))
}

export default filterContacts
