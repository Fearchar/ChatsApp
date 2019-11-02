import React from 'react'

class Field {
  constructor(name, type, placeholder) {
    this.name = name
    this.type = type
    this.placeholder = placeholder
  }
}

const Form = ({ title, hasbox, fields, children }) => {
  return (
    <form className={`${hasbox ? 'box' : ''}`}>
      {title && <h2 className="title">{title}</h2>}
      {fields.map((field, i) =>
        <div
          key={i}
          className="field"
        >
          <label className="label">{field.name}</label>
          <div className="control">
            <input
              className="input"
              type={field.type}
              placeholder={field.placeholder}
            />
          </div>
        </div>
      )}
      {children}
    </form>
  )
}

export { Form, Field }
