import {isUndefined, isNumber} from '../utils/unit'
import {
  throwErrorRequired,
  throwErrorType,
  throwErrorTagName
} from '../utils/throw-error'
import {isTagName, isHTMLElement} from '../utils/dom'

export function validateItem({id, header, content}, toCreate = false) {
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (toCreate) {
    if (id && !isNumber(id)) throwErrorType('id', 'number')
  } else {
    if (isUndefined(id)) throwErrorRequired('id')
    if (!isNumber(id)) throwErrorType('id', 'number')
  }

  if (!isHTMLElement()(header)) throwErrorType('header', 'HTMLElement')
  else if (!isTagName('dt')(header)) throwErrorTagName('header', 'dt')

  if (!isHTMLElement()(content)) throwErrorType('content', 'HTMLElement')
  else if (!isTagName('dd')(content)) throwErrorTagName('content', 'dd')
}

// export function isValidItem({id, header, content}) {
//   let valid = true

//   if (isUndefined(header)) valid = false
//   if (isUndefined(content)) valid = false

//   if (!isNumber(id)) valid = false

//   if (!isHTMLElement()(header)) valid = false
//   else if (!isTagName('dt')(header)) valid = false

//   if (!isHTMLElement()(content)) valid = false
//   else if (!isTagName('dd')(content)) valid = false

//   return valid
// }

// export function throwErrorItem(id) {
//   throwError(`item with ${id} must have the valid model of item`)
// }
