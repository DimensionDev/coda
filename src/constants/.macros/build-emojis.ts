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

const data = JSON.stringify({
  basePoint: basePoint.toString(36),
  points: diffPoints.map(([index, value]) => [index, value].map((item) => item.toString(36)).join('-')).join(','),
})
fs.writeFileSync(path.join(__dirname, '..', 'emojis.json'), data)
console.log('Make json format done')
