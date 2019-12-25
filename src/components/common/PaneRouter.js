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

const Switch = ({ children, getRouterProps }) => {
  const { routerChildren, route, goBack } = getRouterProps(children)

  function makePane() {
    let Element = null
    let name = null

    for (const Pane of routerChildren) {
      if (route.name === Pane.type.name) {
        Element = Pane, name = Pane.type.name
        break
      }
    }

    Element = Element || routerChildren[0]
    console.log()
    name = name || routerChildren[0].type.name
    if (!history.length || lastItem(history).name !== name) {
      history.push({ name, additionalProps: route.additonalProps })
    }

    const Pane = () => React.cloneElement(Element, { ...route.additonalProps })

    return Pane
  }

  const Pane = makePane()

  return (
    <div
      className="box"
    >
      {history.length > 1 &&
        <i
          className="fas fa-chevron-left"
          onClick={goBack}
        />}
      <Pane />
    </div>
  )
}

export { PaneRouter, Switch }
