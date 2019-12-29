function userReducer(user, action) {
  const threads = [ ...user.threads ]

  function threadIndex(threadId) {
    return threads.findIndex(thread => thread._id === threadId)
  }

  switch(action.type) {
    case 'user:index': {

      return { ...action.user, focusThread: action.user.threads[0] }
    }

    case 'thread:new': {
      const thread = action.thread

      threads.push(thread)

      return { ...user, threads, focusThread: thread }
    }

    case 'focusThread:set': {

      return { ...user, focusThread: action.focusThread }
    }

    // !!! Probably no use case
    // case 'thread:index': {
    //   return { threads: action.threads, ...user }
    // }

    // !!! Not yet using
    // case 'thread:delete': {
    //   threads.splice(threadIndex(action.thread), 1)
    //   return { threads, ...user }
    // }

    case 'message:new': {
      threads[threadIndex(action.threadId)].messages.push(action.message)

      return { ...user, threads }
    }

    default: {
      throw new Error(`Unrecognised case in threadsReducer: "${action.type}"`)
    }
  }
}

export default userReducer
