import _Base1024Emojis from './emojis.blob.json'

// constants
export const base1024Emojis = expandPoints(expandBlob(_Base1024Emojis))

function expandBlob(blob: string) {
  const points: [number, number][] = []
  const buffer = Buffer.from(blob, 'base64')
  let offset = 0
  const basePoint = buffer.readUInt32BE(offset)
  offset += 4
  const level1Length = buffer.readUInt8(offset)
  offset += 1
  for (let i = 0; i < level1Length; i += 1) {
    const index = buffer.readUInt8(offset)
    offset += 1
    const value = buffer.readUInt8(offset)
    offset += 1
    points.push([index, value])
  }
  const level2Length = buffer.readUInt8(offset)
  offset += 1
  for (let i = 0; i < level2Length; i += 1) {
    const index = buffer.readUInt16BE(offset)
    offset += 2
    const value = buffer.readUInt8(offset)
    offset += 1
    points.push([index, value])
  }
  const level3Length = buffer.readUInt8(offset)
  offset += 1
  for (let i = 0; i < level3Length; i += 1) {
    const index = buffer.readUInt16BE(offset)
    offset += 2
    const value = buffer.readUInt16BE(offset)
    offset += 2
    points.push([index, value])
  }
  return { basePoint, points }
}

function expandPoints(meta: { basePoint: number; points: [number, number][] }) {
  const points: number[] = Array(1024).fill(1)
  meta.points.forEach(([index, value]) => (points[index] = value))
  return points
    .reduce((points: number[], point, index) => {
      points.push(points[index - 1] + point || point)
      return points
    }, [])
    .map((point) => String.fromCodePoint(meta.basePoint + point))
}
