import React, { useState } from 'react'

import lastItem from '../../lib/lastItem'

class Pane {
  constructor(path, Element) {
    this.path = path
    this.Element = Element
  }
}

const history = []
let setRoute = null

const PaneRouter = ({ panes }) => {
  let route = null
  ;[ route, setRoute ] = useState({ path: null }) // { path: str, additonalProps }

  function generatePaneElement() {
    let Element = null
    let path = null

    for (const pane of panes) {
      if (route.path === pane.path) {
        ({ Element, path } = pane)
        break
      }
    }

    Element = Element || panes[0].Element
    path = path || panes[0].path
    if (!history.length || lastItem(history).path !== path) history.push({ path, additionalProps: route.additonalProps })

    return () => React.cloneElement(Element, { ...route.additonalProps })
  }

  function goBack() {
    history.pop()
    setRoute({ ...history[0] })
    console.log('goBack', history)
  }

  const PaneElement = generatePaneElement()
  console.log(history)

  return (
    <div
      className="box"
    >
      {history.length > 1 &&
        <i
          className="fas fa-chevron-left"
          onClick={goBack}
        />}
      <PaneElement />
    </div>
  )
}

export { Pane, PaneRouter, setRoute }
