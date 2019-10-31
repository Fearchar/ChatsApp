import React from 'react'

const Form = ({ title, fields,  children }) => {
  return(
    <form className="box">
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

export default Form