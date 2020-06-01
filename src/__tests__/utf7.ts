import { encode, decode } from '../utf7'

const table = {
  basic: {
    'urn:Maskbook:ProfileLocator:2:weibo.com:来去之间': 'urn:Maskbook:ProfileLocator:2:weibo.com:+Z2VTu05LlfQ-',
  },
}

for (const name of Object.keys(table)) {
  describe('#encode', () => {
    it(name, () => {
      for (const orignal of Object.keys(table[name])) {
        expect(encode(orignal)).toEqual(table[name][orignal])
      }
    })
  })
  describe('#decode', () => {
    it(name, () => {
      for (const orignal of Object.keys(table[name])) {
        expect(decode(table[name][orignal])).toEqual(orignal)
      }
    })
  })
}
