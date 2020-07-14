import _Base1024EmojiAlphabet from './emojis.json'

// constants
export const Base1024EmojiAlphabet = expandPoints(_Base1024EmojiAlphabet)

function expandPoints(_points: string) {
  const values = _points.split(',').map((value) => Number.parseInt(value, 36))
  const points: number[] = Array(1024).fill(1)
  for (let i = 0; i < values.length; i += 2) {
    // [index, value, index, value, ...]
    points[values[i]] = values[i + 1]
  }
  for (let i = 1; i < points.length; i += 1) {
    points[i] = points[i - 1] + points[i]
  }
  return Array.from(String.fromCodePoint.apply(null, points))
}
