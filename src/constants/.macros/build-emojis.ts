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
  const level1 = diffPoints.filter(([index, value]) => index < 256 && value < 256)
  buffer.writeUInt8(level1.length, offset)
  offset += 1
  level1.forEach(([index, value]) => {
    buffer.writeUInt8(index, offset)
    offset += 1
    buffer.writeUInt8(value, offset)
    offset += 1
  })
  const level2 = diffPoints.filter(([index, value]) => index > 256 && value < 256)
  buffer.writeUInt8(level2.length, offset)
  offset += 1
  level2.forEach(([index, value]) => {
    buffer.writeUInt16BE(index, offset)
    offset += 2
    buffer.writeUInt8(value, offset)
    offset += 1
  })
  const level3 = diffPoints.filter(([index, value]) => index > 256 && value > 256)
  buffer.writeUInt8(level3.length, offset)
  offset += 1
  level3.forEach(([index, value]) => {
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
