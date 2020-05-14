import _Base1024Emojis from './emojis.json'

// constants
export const base1024Emojis = expandPoints(expandBlob(_Base1024Emojis))

function expandBlob(meta: { basePoint: string; points: string }) {
  const parseBase36 = (value: string) => Number.parseInt(value, 36)
  return {
    basePoint: parseBase36(meta.basePoint),
    points: meta.points.split(',').map((item) => item.split('-').map(parseBase36)),
  }
}

function expandPoints(meta: { basePoint: number; points: number[][] }) {
  const points: number[] = Array(1024).fill(1)
  meta.points.forEach(([index, value]) => (points[index] = value))
  return points
    .reduce((points: number[], point, index) => (points.push(points[index - 1] + point || point), points), [])
    .map((point) => String.fromCodePoint(meta.basePoint + point))
}
