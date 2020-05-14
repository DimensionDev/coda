import * as Hex from './hex'
import * as UTF8 from './utf8'
import * as Base64 from './base64'
import * as Base1024 from './base1024'

export enum Codec {
  /**
   * Let's format the word `Mask`:
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
   **/
  Hexadecimal = 'hex',
  /**
   * Let's format the word `Mask`:
   *
   * | Text |  Binary  | Index |
   * | ---- | -------- | ----- |
   * |  M   | 01001101 |  77   |
   * |  a   | 01100001 |  97   |
   * |  s   | 01110011 |  115  |
   * |  k   | 01101011 |  107  |
   **/
  UTF8 = 'utf8',
  /**
   * Let's format the word `Mask`:
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
   **/
  Base64 = 'base64',
  /**
   * Let's format the word `Mask`:
   *
   * | Text |   Binary   | Index |
   * | ---- | ---------- | ----- |
   * |      | 0100110101 |  309  |
   * |      | 1000010111 |  535  |
   * |      | 0011011011 |  219  |
   **/
  Base1024 = 'base1024',
}

export function encode(input: Uint8Array, codec = Codec.Base64) {
  if (!isUint8Array(input)) {
    throw new Error('input type error')
  }
  switch (codec) {
    case Codec.Hexadecimal:
      return Hex.encode(input)
    case Codec.UTF8:
      return UTF8.encode(input)
    case Codec.Base64:
      return Base64.encode(input)
    case Codec.Base1024:
      return Base1024.encode(input)
  }
}

export function decode(input: string, codec = Codec.Base64) {
  if (typeof input !== 'string') {
    throw new Error('input type error')
  }
  switch (codec) {
    case Codec.Hexadecimal:
      return Hex.decode(input)
    case Codec.UTF8:
      return UTF8.decode(input)
    case Codec.Base64:
      return Base64.decode(input)
    case Codec.Base1024:
      return Base1024.decode(input)
  }
}

function isUint8Array(input: any): input is Uint8Array {
  return Object.prototype.toString.call(input) === '[object Uint8Array]'
}
