import {isUndefined, isString} from '../utils/unit'
import {throwErrorRequired, throwErrorType} from '../utils/throw-error'

export function getElementBySelector(selector) {
  if (isUndefined(selector)) throwErrorRequired('selector')
  if (!isString(selector)) throwErrorType('selector', 'string')

  return document.querySelector(selector)
}
