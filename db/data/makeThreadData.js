function makeThreadData(users) {
  const userIds = users.map(user => user._id)
  const threadData = [
    {
      admins: [ userIds[0] ],
      participants: [ userIds[1] ],
      name: 'Seeded Thread1',
      messages: [
        {
          content: 'First message'
        }
      ]
    },
    {
      admins: [ userIds[0] ],
      participants: [ userIds[1] ],
      name: 'Seeded Thread2',
      messages: [
        {
          content: 'First message'
        }
      ]
    }
  ]

  return threadData
}


module.exports = makeThreadData
