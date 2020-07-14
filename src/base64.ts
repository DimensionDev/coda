/** Encode Uint8Array to base64 */
export function encode(input: Uint8Array): string {
  return Buffer.from(input).toString('base64')
}

/** Decode base64 to Uint8Array */
export function decode(input: string): Uint8Array {
  return Buffer.from(input, 'base64')
}
