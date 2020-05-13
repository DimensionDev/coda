/* eslint-disable no-bitwise */
import { base1024Emojis as EMOJIS } from './constants'

/**
 * Trim 0 caches while decoding base1024 to Uint8ARray
 */
function trimRight(input: Uint8Array): Uint8Array {
  for (let i = input.length; i > 0; i -= 1) {
    if (input[i - 1] !== 0) {
      return input.slice(0, i)
    }
  }
  return input
}

/**
 * Encode Uint8Array to base1024
 */
export function encode(input: Uint8Array): string {
  let output = ''
  for (let i = 0; i < input.length; i += 5) {
    const alpha = ((input[i] & 0xff) << 2) | (input[i + 1] >> 6)
    const beta = ((input[i + 1] & 0x3f) << 4) | (input[i + 2] >> 4)
    const gamma = ((input[i + 2] & 0xf) << 6) | (input[i + 3] >> 2)
    const delta = ((input[i + 3] & 0x3) << 8) | input[i + 4]
    output += [alpha, beta, gamma, delta].map((ch: number) => EMOJIS[ch]).join('')
  }
  return output
}

/**
 * Encode Uint8Array to base1024
 */
export function decode(input: string): Uint8Array {
  const source: number[] = Array.from(input).map((e: string) => EMOJIS.indexOf(e))

  const packet: number[] = []
  for (let i = 0; i < input.length; i += 4) {
    const alpha = source[i] >> 2
    const beta = ((source[i] & 0x3) << 6) | (source[i + 1] >> 4)
    const gamma = ((source[i + 1] & 0xf) << 4) | (source[i + 2] >> 6)
    const delta = ((source[i + 2] & 0x3f) << 2) | (source[i + 3] >> 8)
    const epsilon = source[i + 3] & 0xff
    packet.push(alpha, beta, gamma, delta, epsilon)
  }

  return trimRight(Uint8Array.from(packet))
}
