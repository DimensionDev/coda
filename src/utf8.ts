/**
 * Encode Uint8Array to utf8 string
 */
export function encode(u8a: Uint8Array): string {
  const decoder = new TextDecoder()
  return decoder.decode(u8a)
}

/**
 * Decode utf8 string to Uint8Array
 */
export function decode(utf8: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(utf8)
}
