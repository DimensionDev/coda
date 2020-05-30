import _Base1024EmojiAlphabet from './emojis.json'

// constants
export const Base1024EmojiAlphabet = expandPoints(_Base1024EmojiAlphabet)

function expandPoints([base, points]: string[]) {
  const parseBase36 = (value: string) => Number.parseInt(value, 36)
  const basePoint = parseBase36(base)
  const exapndPair = (points: number[], pair: string) => {
    const [index, value] = pair.split('-').map(parseBase36)
    points[index] = value
    return points
  }
  const restorePoint = (points: number[], point: number, index: number) => {
    points.push(points[index - 1] + point || point)
    return points
  }
  return points
    .split(',')
    .reduce(exapndPair, Array(1024).fill(1))
    .reduce(restorePoint, [])
    .map((point) => String.fromCodePoint(basePoint + point))
}
