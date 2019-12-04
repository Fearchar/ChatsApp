import React, { useState, useRef } from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

const SendMessagePane = ({ threadId }) => {
  const [ content, setContent ] = useState('')
  const [ errors, setErrors ] = useState({ content: '' }) /* { content: "errorMessage" } */
  const contentRef = useRef(null)

  function handleChange({ target }) {
    setContent(target.value)
  }

  function sendMessage(e) {
    e.preventDefault()
    contentRef.current.value = ''
    axios.post(`api/threads/${threadId}/messages`, { content }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .catch(err => setErrors(err.response.data.errors))
  }

  errors.content = errors[Object.keys(errors)[0]]
  //!!! I need to make it so that the spacing around the text area doesn't change when the help text is added
  return (
    <form
      className="level card"
      onSubmit={sendMessage}
    >
      <div className="column is-11">
        <textarea
          ref={contentRef}
          className="textarea"
          name="content"
          rows="4"
          placeholder="Type message"
          onChange={handleChange}
        />
        {errors.content ?
          <p className="help is-danger">{errors.content}</p>
          :
          <br />
        }
      </div>
      <div className="column is-2">
        <button className="button">send</button>
      </div>
    </form>
  )
}

export default SendMessagePane
