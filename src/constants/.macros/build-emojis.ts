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

const diffPoints = points
  .map((point, index, points) => points[index] - points[index - 1] || point)
  .reduce((points: number[], value, index) => {
    if (value === 1) return points
    points.push(index, value)
    return points
  }, [])

console.log('Diff Points:', diffPoints.length / 2)

const toBase36 = (value: number) => value.toString(36)

const data = JSON.stringify(diffPoints.map(toBase36).join(','))

fs.writeFileSync(path.join(__dirname, '..', 'emojis.json'), data)

console.log('Make json format done')
