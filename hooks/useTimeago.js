import {format} from 'timeago.js'

export default function useTimeago(timeago) {
  return format(timeago)
}