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

const basePoint = Math.min(...points)

const diffPoints = points
  .map((point) => point - basePoint)
  .map((point, index, points) => points[index] - points[index - 1] || point)
  .reduce((prev: [number, number][], curr, index) => {
    if (curr === 1) return prev
    prev.push([index, curr])
    return prev
  }, [])

console.log('Base Point:', basePoint.toString(16))
console.log('Diff Points:', diffPoints)

fs.writeFileSync(path.join(__dirname, '..', 'emojis.json'), JSON.stringify({ basePoint, points: diffPoints }))
