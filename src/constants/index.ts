import _Base1024EmojiAlphabet from './emojis.json'

// constants
export const Base1024EmojiAlphabet = expandPoints(_Base1024EmojiAlphabet)

function expandPoints(_points: string) {
  const toInt = (value: string) => Number.parseInt(value, 36)
  const points = _points
    .split(',')
    .reduce((points: number[], pair: string) => {
      const [index, value] = pair.split('-').map(toInt)
      points[index] = value
      return points
    }, Array(1024).fill(1))
    .reduce((points: number[], point: number, index: number) => {
      points.push(points[index - 1] + point || point)
      return points
    }, [])
  return Array.from(String.fromCodePoint.apply(null, points))
}
