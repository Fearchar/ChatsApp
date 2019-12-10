function newLineNodes(text, nodeCallback) {
  return text.split('\n').map(nodeCallback)
}

export default newLineNodes
