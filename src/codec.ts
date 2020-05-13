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
 *
 * @property {Point[]} points - Code points
 *
 * @method  toHex    - Convert code points to hex string
 * @method  toBase64 - Convert code points to base64 string
 * @method  toString - Convert code points to utf-16 string
 */
export class Codec {
  /**
   * Build `Codec` from hex string
   *
   * @param {string} input - hex string
   */
  static fromHex(input: string) {
    return new Codec(Hex.decode(input))
  }

  /**
   * Build `Codec` from usc2 string string
   *
   * @param {string} usc2  - the common javascript `string`
   */
  static fromUtf8(input: string) {
    return new Codec(Utf8.decode(input))
  }

  /**
   * Build `Codec` from base64 string
   *
   * @param {string} input - base64 string
   */
  static fromBase64(input: string) {
    return new Codec(Base64.decode(input))
  }

  /**
   * Build `Codec` from base1024 string
   *
   * @param {string} input - base1024 string
   */
  static fromBase1024(input: string) {
    return new Codec(Base1024.decode(input))
  }

  /**
   * `Codec` class is `Uint8Array` based
   */
  private buffer: Uint8Array

  /**
   * Generate `Codec` from `Uint8Array` directly
   *
   * @param {Uint8Array} buffer - construct Codec by bytes
   */
  constructor(buffer: Uint8Array) {
    this.buffer = Uint8Array.from(buffer)
  }

  /**
   * Return the byte array
   */
  public toBuffer() {
    return Uint8Array.from(this.buffer)
  }

  /**
   * Encoding `Codec` source to hex string
   */
  public toHex() {
    return Hex.encode(this.buffer)
  }

  /**
   * Encoding `Codec` source to utf-8 string
   */
  public toUtf8() {
    return Utf8.encode(this.buffer)
  }

  /**
   * Encoding `Codec` source to `base64` string
   */
  public toBase64() {
    return Base64.encode(this.buffer)
  }

  /**
   * Encoding `Codec` source to `base64` string
   */
  public toBase1024() {
    return Base1024.encode(this.buffer)
  }
}
