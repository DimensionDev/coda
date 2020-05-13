import { to, Codec, decode, encode } from '..'
import { base1024Emojis as EMOJIS } from '../constants'

// "Maskbook" Contants
const MASKBOOK_HEX = '4d61736b626f6f6b'
const MASKBOOK_BASE_64 = 'TWFza2Jvb2s='
const MASKBOOK_UTF_8 = 'Maskbook'
// prettier-ignore
const MASKBOOK_BASE_1024 =
  '\ud83d\udc1f\ud83d\udd02' +
  '\ud83c\udfc1\ud83e\udd16' +
  '\ud83d\udca7\ud83d\ude8a' +
  '\ud83d\ude24\ud83c\udc04'
const SECRET_AES_WITH_LINK =
  'https://www.microsoft.com/%204/4.-bvXKJyn2SnRTSkdXk9aatF37jDhuOfTrDT/Zt/' +
  '5BRfy0ns2dyneAiWSOFi535LtFdTkwu1mO/ikGDqMZ8XJ2dYwy4whjCbV1lC7QL+hQl4W7w8' +
  'Sg479flZ9dmkPyxfpr0DhdZKEOasjUTRkyc3oWXxZP1MtW16YiUw79K4Dl1YUY7MoivrDBJl' +
  '+.toICTqhkmNdMA7rQ3C6OSw_=.rSgAIGWRKQtT9VjjzzoATLJCoYaqD48H.2Wt23rLnjW/g' +
  'xQc4C9iYgNWlySXoHarCj+ph6NeaJHyTRU9d8KDU28N359XDUA2sxn82ne/RdG57DYV5+sGD' +
  'Pw==.Auqv1q+v53lJseTRpSgQGQPN2OOOqPRD3rIIJMtqY9+i.0%40'

// Codec basic equal chain
function eqChain(codec: Uint8Array) {
  expect(to(codec, Codec.Buffer, Codec.Hex)).toBe(MASKBOOK_HEX)
  expect(to(codec, Codec.Buffer, Codec.UTF8)).toBe(MASKBOOK_UTF_8)
  expect(to(codec, Codec.Buffer, Codec.Base64)).toBe(MASKBOOK_BASE_64)
  expect(to(codec, Codec.Buffer, Codec.Base1024)).toBe(MASKBOOK_BASE_1024)
}

// Build Codec from hex
test('build codec from hex', () => {
  eqChain(to(MASKBOOK_HEX, Codec.Hex))
})

// Build Codec from utf-8
test('build codec from utf-8', () => {
  eqChain(to(MASKBOOK_UTF_8, Codec.UTF8))
})

// Build Codec from base64
test('build codec from base64', () => {
  eqChain(to(MASKBOOK_BASE_64, Codec.Base64))
})

// Build Codec from base-1024
test('build codec from base1024', () => {
  eqChain(to(MASKBOOK_BASE_1024, Codec.Base1024))
})

// Validate the chosen emojis
test('validate the chosen emojis', () => {
  expect(EMOJIS.length).toEqual(1024)
  expect(Array.from(EMOJIS.join('')).length).toEqual(1024)
})

// Real world AES example
test('real world AES example', () => {
  const decoded = to(SECRET_AES_WITH_LINK, Codec.UTF8)
  // check hex
  expect(areEqual(decode(encode(decoded, Codec.Hex), Codec.Hex), decoded)).toBe(true)
  // check base64
  expect(areEqual(decode(encode(decoded, Codec.Base64), Codec.Base64), decoded)).toBe(true)
  // check base1024
  expect(areEqual(decode(encode(decoded, Codec.Base1024), Codec.Base1024), decoded)).toBe(true)
})

function areEqual(a: Uint8Array, b: Uint8Array) {
  if (a.byteLength !== b.byteLength) return false
  return a.every((value, index) => value === b[index])
}
