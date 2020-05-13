/**
 * Encode Uint8Array to base64
 */
export function encode(input: Uint8Array): string {
  const decoded = new TextDecoder().decode(input)
  if (typeof atob !== 'undefined') {
    return btoa(decoded)
  }
  return Buffer.from(decoded, 'utf-8').toString('base64')
}

/**
 * Decode base64 to Uint8Array
 */
export function decode(input: string): Uint8Array {
  let decoded = ''
  if (typeof atob !== 'undefined') {
    decoded = atob(input)
  } else {
    decoded = Buffer.from(input, 'utf-8').toString('base64')
  }
  return new TextEncoder().encode(decoded)
}
