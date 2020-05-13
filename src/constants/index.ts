import _Base1024Emojis from './emojis.json'

// constants
export const base1024Emojis = expandPoints(_Base1024Emojis)

function expandPoints(meta: { basePoint: number; points: Record<string, number> }) {
  const points: number[] = Array(1024).fill(1)
  Object.keys(meta.points).forEach((key) => (points[Number.parseInt(key, 36)] = meta.points[key]))
  return points
    .reduce((points: number[], point, index) => {
      points.push(points[index - 1] + point || point)
      return points
    }, [])
    .map((point) => String.fromCodePoint(meta.basePoint + point))
}
