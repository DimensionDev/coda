#!/usr/bin/env npx ts-node
import fs from 'fs'
import path from 'path'
import { source } from './twemojis.json'

const points = source
  .filter((point) => point.length < 6)
  .map((point) => Number.parseInt(point, 16))
  .filter((point) => {
    const orignal = String.fromCodePoint(point)
    return orignal.codePointAt(0) === point && orignal.length === 2
  })
  .sort((a, b) => a - b)
  .slice(0, 1024)

const basePoint = points[0] - 1

const diffPoints = points
  .map((point) => point - basePoint)
  .map((point, index, points) => points[index] - points[index - 1] || point)
  .reduce((points: [number, number][], value, index) => {
    if (value === 1) return points
    points.push([index, value])
    return points
  }, [])

console.log('Base Point:', basePoint.toString(16))
console.log('Diff Points:', diffPoints.length)

function makeJSON() {
  const data = JSON.stringify({
    basePoint,
    points: diffPoints.map(([index, value]) => [index.toString(36), value]),
  })
  fs.writeFileSync(path.join(__dirname, '..', 'emojis.json'), data)
  console.log('Make json format done')
}

function makeBlob() {
  const buffer = Buffer.alloc(0x400)

  let offset = 0
  buffer.writeUInt32BE(basePoint)
  offset += 4
  const compact = diffPoints.filter(([index, value]) => value < 256 && index < 256, [])
  buffer.writeUInt8(compact.length, offset)
  offset += 1
  const normal = diffPoints.filter(([index, value]) => value > 256 || index > 256, [])
  buffer.writeUInt8(normal.length, offset)
  offset += 1
  compact.forEach(([index, value]) => {
    buffer.writeUInt8(index, offset)
    offset += 1
    buffer.writeUInt8(value, offset)
    offset += 1
  })
  normal.forEach(([index, value]) => {
    buffer.writeUInt16BE(index, offset)
    offset += 2
    buffer.writeUInt16BE(value, offset)
    offset += 2
  })
  fs.writeFileSync(
    path.join(__dirname, '..', 'emojis.blob.json'),
    JSON.stringify(buffer.slice(0, offset).toString('base64')),
  )
  console.log('Make blob format done')
}

makeJSON()
makeBlob()
