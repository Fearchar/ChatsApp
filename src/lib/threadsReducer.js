const initialState = { threads: [] }

function threadsReducer(threads, action) {
  const threadsCopy = [ ...threads ]

  function threadIndex(thread) {
    return threadsCopy.findIndex(t => t._id === thread._id)
  }

  switch(action.type) {
    case 'thread:new': {
      threadsCopy.push(action.thread)
      return { threads: threadsCopy }
    }

    case 'thread:delete': {
      threadsCopy.splice(threadIndex(action.thread), 1)
      return { threads: threadsCopy }
    }

    case 'message:new': {
      threadsCopy[threadIndex(action.thread)].push(action.message)
      return { threads: threadsCopy }
    }

    case 'message:delete': {
      threadsCopy.splice(threadIndex(action.thread), 1)
      return { threads: threadsCopy }
    }

    default: {
      throw new Error()
    }
  }
}

export { threadsReducer, initialState }
