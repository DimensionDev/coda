/** Encode Uint8Array to hex string */
export function encode(input: Uint8Array) {
  const reduceFn = (input: string, point: number) => input + point.toString(16).padStart(2, '0')
  return input.reduce(reduceFn, '')
}

/** Decode hex string to Uint8Array */
export function decode(input: string) {
  const points = input.match(/.{1,2}/g)
  if (points === null) {
    return new Uint8Array()
  }
  return Uint8Array.from(points.map((point) => Number.parseInt(point, 16)))
}
