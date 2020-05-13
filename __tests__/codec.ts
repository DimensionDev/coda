import { Codec } from '../src'
import { base1024Emojis as EMOJIS } from '../src/constants'

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
function eqChain(codec: Codec) {
  expect(codec.toHex()).toBe(MASKBOOK_HEX)
  expect(codec.toBase64()).toBe(MASKBOOK_BASE_64)
  expect(codec.toUtf8()).toBe(MASKBOOK_UTF_8)
  expect(codec.toBase1024()).toBe(MASKBOOK_BASE_1024)
}

// Build Codec from hex
test('build codec from hex', () => {
  eqChain(Codec.fromHex(MASKBOOK_HEX))
})

// Build Codec from base64
test('build codec from base64', () => {
  eqChain(Codec.fromBase64(MASKBOOK_BASE_64))
})

// Build Codec from utf-8
test('build codec from utf-8', () => {
  eqChain(Codec.fromUtf8(MASKBOOK_UTF_8))
})

// Build Codec from base-1024
test('build codec from base1024', () => {
  eqChain(Codec.fromBase1024(MASKBOOK_BASE_1024))
})

// Validate the chosen emojis
test('validate the chosen emojis', () => {
  expect(EMOJIS.length).toEqual(1024)
  expect(Array.from(EMOJIS.join('')).length).toEqual(1024)
})

// Real world AES example
test('real world AES example', () => {
  const codec = Codec.fromUtf8(SECRET_AES_WITH_LINK)
  // check hex
  const hex = codec.toHex()
  expect(Codec.fromHex(hex)).toEqual(codec)
  // check base64
  const b64 = codec.toBase64()
  expect(Codec.fromBase64(b64)).toEqual(codec)
  // check base1024
  const emojis = codec.toBase1024()
  expect(Codec.fromBase1024(emojis)).toEqual(codec)
})
