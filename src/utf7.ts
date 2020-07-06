import * as Base64 from './base64'

/* eslint-disable no-plusplus,no-bitwise */
function encodeToUTF7(input: string) {
  const output = new Uint8Array(input.length * 2)
  const view = new DataView(output.buffer)
  for (let offset = 0; offset < input.length; offset++) {
    view.setUint16(offset * 2, input.charCodeAt(offset))
  }
  return Base64.encode(output).replace(/=+$/, '')
}

function decodeFromUTF7(encoded: string) {
  const input = Base64.decode(encoded)
  const output: number[] = []
  for (let offset = 0; offset < input.length; offset += 2) {
    output.push(((input[offset] & 255) << 8) + (input[offset + 1] & 255))
  }
  return String.fromCharCode.apply(null, output)
}

function escapeReserved(items: string) {
  return items.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export function encode(input: string, reserved = "'(),-./:?") {
  const re = new RegExp(`[^A-Za-z0-9${escapeReserved(reserved)}]+`, 'g')
  return input.replace(re, toUTF7)
}

export function decode(input: string) {
  const re = /\+([A-Za-z0-9/]*)-?/gi
  return input.replace(re, fromUTF7)
}

function fromUTF7(_: string, match: string) {
  if (match === '') {
    return '+'
  }
  return decodeFromUTF7(match)
}

function toUTF7(chunk: string) {
  let block = ''
  if (chunk !== '+') {
    block = encodeToUTF7(chunk)
  }
  return `+${block}-`
}
