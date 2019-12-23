import React, { useState } from 'react'

import lastItem from '../../lib/lastItem'

class Pane {
  constructor(name, Component) {
    this.name = name
    this.Component = Component
  }
}

const PaneRouter = ({ panes }) => {
  const [ display, setDisplay ] = useState('') // { name: str, additonalProps }

  function displayComponent() {
    let Component = null

    for (const pane of panes) {
      if (display.name === pane.name) {
        Component = pane.Component
        break
      }
    }

    Component = Component && lastItem(panes)

    return <Component {...display.additonalProps} setDisplay={setDisplay} />
  }

  // function goBack() {
  //   setDisplay({ name: '', })
  // }

  return (
    <div
      className="box"
    >
      <i className="fas fa-chevron-left" />
      {displayComponent()}
    </div>
  )
}
export { Pane, PaneRouter }
