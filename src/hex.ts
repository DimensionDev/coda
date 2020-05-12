/**
 * Encode Uint8Array to hex string
 */
export function encode(u8a: Uint8Array): string {
  const reduceFn = (str: string, byte: number): string => {
    return str + Number(byte).toString(16).padStart(2, '0')
  }
  return u8a.reduce(reduceFn, '')
}

/**
 * Decode hex string to Uint8Array
 */
export function decode(hex: string): Uint8Array {
  const arr = hex.match(/.{1,2}/g)
  if (arr === null) {
    return new Uint8Array()
  }
  return Uint8Array.from(arr.map((char: string) => Number.parseInt(char, 16)))
}
