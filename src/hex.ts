/**
 * Encode Uint8Array to hex string
 */
export function encode(input: Uint8Array): string {
  const reduceFn = (input: string, point: number) => input + point.toString(16).padStart(2, '0')
  return input.reduce(reduceFn, '')
}

/**
 * Decode hex string to Uint8Array
 */
export function decode(input: string): Uint8Array {
  const inputs = input.match(/.{1,2}/g)
  if (inputs === null) {
    return new Uint8Array()
  }
  return Uint8Array.from(inputs.map((point: string) => Number.parseInt(point, 16)))
}
