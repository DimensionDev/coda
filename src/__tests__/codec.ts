import { Codec, decode, encode } from '..'
import { base1024Emojis as EMOJIS } from '../constants'

const TAIL = '\ud83c\udfad'
const codecs: Record<Codec, string> = {
  [Codec.UTF8]: 'Maskbook',
  [Codec.Hexadecimal]: '4d61736b626f6f6b',
  [Codec.Base64]: 'TWFza2Jvb2s=',
  // prettier-ignore
  [Codec.Base1024]: (
        '\ud83d\udc1f\ud83d\udd02\ud83c\udfc1\ud83e\udd16' +
        '\ud83d\udca7\ud83d\ude8a\ud83d\ude24'
    )
}

const SECRET_AES_WITH_LINK =
  'https://www.microsoft.com/%204/4.-bvXKJyn2SnRTSkdXk9aatF37jDhuOfTrDT/Zt/' +
  '5BRfy0ns2dyneAiWSOFi535LtFdTkwu1mO/ikGDqMZ8XJ2dYwy4whjCbV1lC7QL+hQl4W7w8' +
  'Sg479flZ9dmkPyxfpr0DhdZKEOasjUTRkyc3oWXxZP1MtW16YiUw79K4Dl1YUY7MoivrDBJl' +
  '+.toICTqhkmNdMA7rQ3C6OSw_=.rSgAIGWRKQtT9VjjzzoATLJCoYaqD48H.2Wt23rLnjW/g' +
  'xQc4C9iYgNWlySXoHarCj+ph6NeaJHyTRU9d8KDU28N359XDUA2sxn82ne/RdG57DYV5+sGD' +
  'Pw==.Auqv1q+v53lJseTRpSgQGQPN2OOOqPRD3rIIJMtqY9+i.0%40'

test('build codec', () => {
  for (const codec of Object.keys(codecs) as Codec[]) {
    const decoded = decode(codecs[codec], codec)
    expect(Buffer.from(decoded).toString('utf-8')).toEqual('Maskbook')
    const encoded = encode(decoded, codec)
    expect(encoded).toEqual(codecs[codec])
  }
})

// Validate the chosen emojis
test('validate the chosen emojis', () => {
  expect(EMOJIS.length).toEqual(1024)
  expect(Array.from(EMOJIS.join('')).length).toEqual(1024)
})

// Real world AES example
test('real world AES example', () => {
  const decoded = decode(SECRET_AES_WITH_LINK, Codec.UTF8)
  const codecs = [Codec.Hexadecimal, Codec.UTF8, Codec.Base64, Codec.Base1024]
  for (const codec of codecs) {
    expect(areEqual(decode(encode(decoded, codec), codec), decoded)).toBe(true)
  }
})

// Base1024 safe tail fuzz
test('base1024 safe tail fuzz', () => {
  const u8a = Uint8Array.from(
    Array(0xff)
      .fill(0)
      .map((_, i) => i)
      .reverse(),
  )
  const encoded = encode(u8a, Codec.Base1024)
  const decoded = decode(encoded, Codec.Base1024)
  expect(encoded.endsWith(TAIL)).toBe(true)
  expect(decoded).toEqual(u8a)
})

function areEqual(a: Uint8Array, b: Uint8Array) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((value, index) => value === b[index])
}
