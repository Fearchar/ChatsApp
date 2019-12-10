/*!!!
More work needs to be done to this function to aviod the situation in which
multiple spaces/newlines at the beginning or end of message get replaced by a single
space/newline. See .replace on mdn.
*/
function cleanWhitespace(text) {
  console.log('!!!!', text)
  return text.replace(/^\n|\n$|\n{2,}|^ | $| {2,}/g, (match) => {
    console.log('match', `,${match},`)
    switch (match) {
      case '\n':
        return ''
      case '\n\n':
        return '\n'
      case ' ':
        return ''
      default:
        return ' '
    }
  })
}

module.exports = cleanWhitespace
