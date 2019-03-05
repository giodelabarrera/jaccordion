import {isUndefined, isNumber, isString} from '../utils/unit'
import {
  throwErrorRequired,
  throwErrorType,
  throwErrorTagName
} from '../utils/throw-error'
import {isHTMLElement, isTagName} from '../utils/dom'

export function validateEntry({id, header, content}) {
  if (isUndefined(id)) throwErrorRequired('id')
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (!isNumber(id)) throwErrorType('id', 'number')
  if (!isString(header)) throwErrorType('header', 'string')
  if (!isString(content)) throwErrorType('content', 'string')
}

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
