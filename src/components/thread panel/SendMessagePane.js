import React, { useState, useRef } from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

const SendMessagePane = ({ threadId }) => {
  const [ content, setContent ] = useState('')
  const [ errors, setErrors ] = useState({ content: '' }) /* { content: "errorMessage" } */
  const contentRef = useRef(null)

  function handleChange({ target }) {
    setContent(target.value)
    setErrors({ content: '' })
  }

  function sendMessage(e) {
    e.preventDefault()
    contentRef.current.value = ''
    setContent('')

    //!!! Need to eject unauthorised users.
    axios.post(`api/threads/${threadId}/messages`, { content }, Auth.header)
      .catch(err => {
        console.log(err)
        const errors = err.response.data.errors
        const content = errors[Object.keys(errors)[0]]
        setErrors({ content })
      })
  }

  function handleEnter(e) {
    if (e.key === 'Enter' && !e.shiftKey) sendMessage(e)
  }

  /* !!!
      - I need to make it so that the spacing around the text area doesn't change when the help text is added
  */
  return (
    <form
      className="level card"
      onSubmit={sendMessage}
    >
      <div className="column is-10">
        <textarea
          ref={contentRef}
          className="textarea"
          name="content"
          rows="4"
          placeholder="Type message"
          onChange={handleChange}
          onKeyPress={handleEnter}
        />
        {errors.content ?
          <p className="help is-danger">{errors.content}</p>
          :
          <br />
        }
      </div>
      <div className="column is-2 has-text-centered">
        <button className="button">send</button>
      </div>
    </form>
  )
}

export default SendMessagePane
