import React, { useState } from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

const SendMessagePane = ({ threadId, addMessage }) => {
  const [ content, setContent ] = useState('')
  const [ errors, setErrors ] = useState({ content: '' }) /* { content: "errorMessage" } */

  function handleChange({ target }) {
    setContent(target.value)
  }

  function sendMessage(e) {
    e.preventDefault()
    axios.post(`api/threads/${threadId}/messages`, { content }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .catch(err => setErrors(err.response.data.errors))
  }

  return (
    <form
      className="level card"
      onSubmit={sendMessage}
    >
      <div className="column is-11">
        <textarea
          className="textarea"
          name="content"
          rows="4"
          placeholder="Type message"
          onChange={handleChange}
        />
        {errors && <p className="help">{errors.content}</p>}
      </div>
      <div className="column is-2">
        <button className="button">send</button>
      </div>
    </form>
  )
}

export default SendMessagePane
