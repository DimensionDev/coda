/**
 * Encode Uint8Array to base64
 */
export function encode(u8a: Uint8Array): string {
  const str = new TextDecoder().decode(u8a)
  if (atob !== undefined) {
    return btoa(str)
  }
  return Buffer.from(str, 'utf-8').toString('base64')
}

/**
 * Decode base64 to Uint8Array
 */
export function decode(b64: string): Uint8Array {
  let u8a: string = ''
  if (atob !== undefined) {
    u8a = atob(b64)
  } else {
    u8a = Buffer.from(b64, 'utf-8').toString('base64')
  }
  return new TextEncoder().encode(u8a)
}
