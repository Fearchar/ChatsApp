function reducer(state, action) {
  const threads = [ ...state.threads ]

  function threadIndex(threadId) {
    return threads.findIndex(thread => thread._id === threadId)
  }

  switch(action.type) {
    case 'thread:new': {
      threads.push(action.thread)
      return { threads }
    }

    case 'thread:index': {
      return { threads: action.threads }
    }

    case 'thread:delete': {
      threads.splice(threadIndex(action.thread), 1)
      return { threads }
    }

    case 'message:new': {
      threads[threadIndex(action.threadId)].messages.push(action.message)
      return { threads }
    }

    case 'message:delete': {
      threads.splice(threadIndex(action.thread), 1)
      return { threads }
    }

    default: {
      throw new Error(`Unrecognised case in threadsReducer: "${action.type}"`)
    }
  }
}

export default reducer
