/* eslint-disable no-bitwise */
import { Base1024EmojiAlphabet as EMOJIS } from './constants'

/**
 * Trim 0 caches while decoding Base1024Emoji to Uint8ARray
 */
const TAIL = '\ud83c\udfad'

/**
 * Encode Uint8Array to Base1024Emoji
 */
export function encode(input: Uint8Array): string {
  const points: number[] = []
  const remainder = input.length % 5
  const safe = input.length - remainder
  for (let i = 0; i <= safe; i += 5) {
    const alpha = ((input[i] & 0xff) << 2) | (input[i + 1] >> 6)
    const beta = ((input[i + 1] & 0x3f) << 4) | (input[i + 2] >> 4)
    const gamma = ((input[i + 2] & 0xf) << 6) | (input[i + 3] >> 2)
    const delta = ((input[i + 3] & 0x3) << 8) | input[i + 4]
    if (i < safe) {
      points.push(alpha, beta, gamma, delta)
    } else if (i >= safe && remainder !== 0) {
      points.push(...[alpha, beta, gamma, delta].slice(0, input.length - safe))
    }
  }

  // Check the last 8 empty bits
  const res = points
    .slice(0, points.length)
    .map((emoji) => EMOJIS[emoji])
    .join('')
  return res + (remainder === 4 ? TAIL : '')
}

/**
 * Encode Uint8Array to Base1024Emoji
 */
export function decode(input: string): Uint8Array {
  let tail = false
  if (input.endsWith(TAIL)) {
    input = input.slice(0, input.length - TAIL.length)
    tail = true
  }

  // Decode input string
  const points = Array.from(input).map((emoji: string) => EMOJIS.indexOf(emoji))
  const remainder = points.length % 4
  const safe = points.length - remainder
  const source: number[] = []
  for (let i = 0; i <= safe; i += 4) {
    const alpha = points[i] >> 2
    const beta = ((points[i] & 0x3) << 6) | (points[i + 1] >> 4)
    const gamma = ((points[i + 1] & 0xf) << 4) | (points[i + 2] >> 6)
    const delta = ((points[i + 2] & 0x3f) << 2) | (points[i + 3] >> 8)
    const epsilon = points[i + 3] & 0xff
    if (i < safe) {
      source.push(alpha, beta, gamma, delta, epsilon)
    } else if (i >= safe && remainder !== 0) {
      source.push(...[alpha, beta, gamma, delta, epsilon].slice(0, remainder))
    }
  }

  return Uint8Array.from(source.slice(0, tail ? source.length - 1 : source.length))
}
