import React from 'react'

import toCamelCase from '../../lib/toCamelCase'

class Field {
  constructor(label, type, placeholder, name=label) {
    this.label = label
    this.type = type
    this.placeholder = placeholder
    this.name = toCamelCase(name)
  }
}

const Form = ({ title, hasBox, fields, fieldErrors, fieldSetter, onSubmit, children }) => {
  function handleChange({ target }) {
    fieldSetter(fields => ({ ...fields, [target.name]: target.value }))
  }

  return (
    <form
      className={`${hasBox ? 'box' : ''}`}
      onSubmit={e => {
        e.preventDefault()
        onSubmit(e)
      }}
    >
      {title && <h2 className="title">{title}</h2>}
      {fields.map((field, i) =>
        <div
          key={i}
          className="field"
        >
          <label className="label">{field.label}</label>
          <div className="control">
            <input
              name={field.name}
              className="input"
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          </div>
          {fieldErrors && <p className="help is-danger">{fieldErrors[field.name]}</p>}
        </div>
      )}
      {children}
    </form>
  )
}

export { Form, Field }
