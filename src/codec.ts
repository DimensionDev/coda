import * as Hex from './hex'
import * as Utf8 from './utf8'
import * as Base64 from './base64'
import * as Base1024 from './base1024'

/**
 * Codec
 *
 * Encoding/Decoding string with Unicode code points(0 - 0x10FFFF).
 *
 * All data will be formated into `Uint8Array` while constructing Codec
 * class, for example, Let's format the word `Mask`:
 *
 * For `Base1024`:
 *
 * | Text |   Binary   | Index |
 * | ---- | ---------- | ----- |
 * |      | 0100110101 |  309  |
 * |      | 1000010111 |  535  |
 * |      | 0011011011 |  219  |
 *
 * For `UTF-8`: `[ 01001101, 01100001, 01110011, 01101011 ]`
 *
 * | Text |  Binary  | Index |
 * | ---- | -------- | ----- |
 * |  M   | 01001101 |  77   |
 * |  a   | 01100001 |  97   |
 * |  s   | 01110011 |  115  |
 * |  k   | 01101011 |  107  |
 *
 * For `Base64`: `[ 010011, 010110, 000101, 110011, 011010, 11 ]`
 *
 * | Text | Binary | Index |
 * | ---- | ------ | ----- |
 * |  T   | 010011 |  19   |
 * |  W   | 010110 |  22   |
 * |  F   | 000101 |  5    |
 * |  z   | 110011 |  51   |
 * |  a   | 011010 |  26   |
 * |  s   | 110000 |  48   |
 * |  =   | 000000 |       |
 *
 * For `hex`: `[ 0100, 1101, 0110, 0001, 0111, 0011, 0110, 1011 ]`
 *
 * | Text | Binary | Index |
 * | ---- | ------ | ----- |
 * |  4   |  0100  |   4   |
 * |  d   |  1101  |   13  |
 * |  6   |  0110  |   6   |
 * |  1   |  0001  |   1   |
 * |  7   |  0111  |   7   |
 * |  3   |  0011  |   3   |
 * |  6   |  0110  |   6   |
 * |  b   |  1011  |   11  |
 */
export enum Codec {
  Hex = 'Hex',
  UTF8 = 'UTF8',
  Base64 = 'Base64',
  Base1024 = 'Base1024',
  Buffer = 'Buffer',
}

export function to(input: string, inputCodec: Codec): Uint8Array // decode (shorthand)
export function to(input: string, inputCodec: Codec, outputCodec: Codec.Buffer): Uint8Array // decode
export function to(input: Uint8Array, inputCodec: Codec.Buffer, outputCodec: Codec): string // encode
export function to(input: Uint8Array, inputCodec: Codec.Buffer, outputCodec: Codec.Buffer): Uint8Array // copy
export function to(input: string, inputCodec: Codec, outputCodec: Codec): string // decode and encode
export function to(input: string | Uint8Array, inputCodec: Codec, outputCodec = Codec.Buffer): string | Uint8Array {
  if (isUint8Array(input) && inputCodec === Codec.Buffer) {
    return outputCodec === Codec.Buffer ? Uint8Array.from(input) : encode(input, outputCodec)
  } else if (typeof input === 'string') {
    if (outputCodec === Codec.Buffer) {
      return decode(input, inputCodec)
    } else if (inputCodec !== Codec.Buffer) {
      return encode(decode(input, inputCodec), outputCodec)
    }
  }
  throw new Error(`${Codec[inputCodec]} to ${Codec[outputCodec]} not supported`)
}

export function encode(input: Uint8Array, codec = Codec.Base64) {
  if (!isUint8Array(input)) {
    throw new Error('input type error')
  }
  switch (codec) {
    case Codec.Hex:
      return Hex.encode(input)
    case Codec.UTF8:
      return Utf8.encode(input)
    case Codec.Base64:
      return Base64.encode(input)
    case Codec.Base1024:
      return Base1024.encode(input)
  }
  throw new Error(`${Codec[codec]} not supported`)
}

export function decode(input: string, codec = Codec.Base64) {
  if (typeof input !== 'string') {
    throw new Error('input type error')
  }
  switch (codec) {
    case Codec.Hex:
      return Hex.decode(input)
    case Codec.UTF8:
      return Utf8.decode(input)
    case Codec.Base64:
      return Base64.decode(input)
    case Codec.Base1024:
      return Base1024.decode(input)
  }
  throw new Error(`${Codec[codec]} not supported`)
}

function isUint8Array(input: any): input is Uint8Array {
  return Object.prototype.toString.call(input) === '[object Uint8Array]'
}
