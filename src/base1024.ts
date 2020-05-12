/* eslint-disable no-bitwise */
import { base1024Emojis as EMOJIS } from './constants'

/**
 * Trim 0 caches while decoding base1024 to Uint8ARray
 */
function trimRight(u8a: Uint8Array): Uint8Array {
  for (let i = u8a.length; i > 0; i -= 1) {
    if (u8a[i - 1] !== 0) {
      return u8a.slice(0, i)
    }
  }
  return u8a
}

/**
 * Encode Uint8Array to base1024
 */
export function encode(u8a: Uint8Array): string {
  let result: string = ''
  for (let i = 0; i < u8a.length; i += 5) {
    const alpha = ((u8a[i] & 0xff) << 2) | (u8a[i + 1] >> 6)
    const beta = ((u8a[i + 1] & 0x3f) << 4) | (u8a[i + 2] >> 4)
    const gamma = ((u8a[i + 2] & 0xf) << 6) | (u8a[i + 3] >> 2)
    const delta = ((u8a[i + 3] & 0x3) << 8) | u8a[i + 4]
    result += [alpha, beta, gamma, delta].map((char: number) => EMOJIS[char]).join('')
  }

  return result
}

/**
 * Encode Uint8Array to base1024
 */
export function decode(b1024: string): Uint8Array {
  const source: number[] = Array.from(b1024).map((e: string) => EMOJIS.indexOf(e))

  let bytes: number[] = []
  for (let i = 0; i < b1024.length; i += 4) {
    const alpha = source[i] >> 2
    const beta = ((source[i] & 0x3) << 6) | (source[i + 1] >> 4)
    const gamma = ((source[i + 1] & 0xf) << 4) | (source[i + 2] >> 6)
    const delta = ((source[i + 2] & 0x3f) << 2) | (source[i + 3] >> 8)
    const epsilon = source[i + 3] & 0xff
    bytes = bytes.concat([alpha, beta, gamma, delta, epsilon])
  }

  return trimRight(Uint8Array.from(bytes))
}
