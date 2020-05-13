/**
 * Encode Uint8Array to utf8 string
 */
export function encode(input: Uint8Array) {
  return new TextDecoder().decode(input)
}

/**
 * Decode utf8 string to Uint8Array
 */
export function decode(input: string) {
  return new TextEncoder().encode(input)
}
