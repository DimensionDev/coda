/* eslint-disable no-plusplus,no-bitwise */

function encodeToUTF7(input: string) {
  const output = new Uint8Array(input.length * 2)
  const view = new DataView(output.buffer)
  for (let offset = 0; offset < input.length; offset++) {
    view.setUint16(offset * 2, input.charCodeAt(offset))
  }
  return Buffer.from(output).toString('base64').replace(/=+$/, '')
}

function decodeFromUTF7(encoded: string) {
  const input = Buffer.from(encoded, 'base64')
  const output: number[] = []
  for (let offset = 0; offset < input.length; offset += 2) {
    output.push(input.readUInt16BE(offset))
  }
  return String.fromCharCode.apply(null, output)
}

function escapeReservedRegexStrings(items: string) {
  return items.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/** RFC 2152 */
const setD = 'A-Za-z0-9' + escapeReservedRegexStrings("'(),-./:?")
const setO = escapeReservedRegexStrings('!"#$%&*;<=>@[]^_\'{|}')
const setW = escapeReservedRegexStrings(' \r\n\t')

export function encode(input: string): string
export function encode(input: string, mask: string): string
export function encode(input: string, mask = '') {
  const re = new RegExp('[^' + setD + escapeReservedRegexStrings(mask) + ']+', 'g')
  return input.replace(re, (chunk) => '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-')
}

export const encodeAll = (input: string) => {
  const re = new RegExp('[^' + setW + setD + setO + ']+', 'g')
  return input.replace(re, (chunk) => '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-')
}

export const decode = (input: string) => {
  return input.replace(/\+([A-Za-z0-9/]*)-?/gi, (_, chunk) => (chunk === '' ? '+' : decodeFromUTF7(chunk)))
}
