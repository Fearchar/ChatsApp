import moment from 'moment'

function formatDate(date) {
  return moment(date).format('D-MMM-YY hh:mm')
}

export default formatDate
