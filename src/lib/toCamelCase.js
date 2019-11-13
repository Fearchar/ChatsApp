function toCamelCase(text) {
  text = text.toLowerCase()
  const textArray = text.split(' ')
  for (let i = 1; i < textArray.length; i++) {
    textArray[i] = textArray[i].slice(0, 1).toUpperCase() + textArray[i].slice(1, textArray[i].length)
  }
  return textArray.join('')
}

export default toCamelCase
