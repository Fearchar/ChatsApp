import React, { useState } from 'react'

import lastItem from '../../lib/lastItem'

const history = []

const PaneRouter = ({ children }) => {
  const [ route, setRoute ] = useState({ name: null }) // { name: str, additonalProps }

  function goBack() {
    history.pop()
    setRoute(lastItem(history))
  }

  function goHome() {
    history.splice(0)
    setRoute({ name: null })
  }

  //!!! Make useRoute custom hook which also handels history?
  function getRouterProps(children) {
    let routerChildren = children ? React.Children.toArray(children) : null

    routerChildren = routerChildren && routerChildren
      .map(child => React.cloneElement(child, { getRouterProps }))

    return {
      routerChildren,
      route,
      setRoute,
      goBack,
      goHome
    }
  }

  const { routerChildren } = getRouterProps(children)

  return (
    <>{routerChildren}</>
  )
}

const Routes = ({ children, getRouterProps }) => {
  const { routerChildren, route, goBack } = getRouterProps(children)

  function routerSwitch(routerChildren, route) {
    let Pane = null
    let paneName = null

    for (const Element of routerChildren) {
      if (route.name === Element.type.name) {
        Pane = Element, paneName = Element.type.name
        break
      }
    }

    Pane = Pane || lastItem(routerChildren)
    paneName = paneName || lastItem(routerChildren).type.name

    return { Pane, paneName }
  }

  function addPaneToHistory(history, paneName, extraProps) {
    if (!history.length || lastItem(history).name !== paneName) {
      history.push({ name: paneName, extraProps })
    }
  }

  function makePane() {
    const { Pane, paneName } = routerSwitch(routerChildren, route)

    addPaneToHistory(history, paneName, route.extraProps)

    return () => React.cloneElement(Pane, { ...route.extraProps })
  }

  const Pane = makePane()

  return (
    <div
      className="box"
    >
      {history.length > 1 &&
        <i
          className="fas fa-chevron-left fa-2x"
          onClick={goBack}
        />}
      <Pane />
    </div>
  )
}

export { PaneRouter, Routes }
