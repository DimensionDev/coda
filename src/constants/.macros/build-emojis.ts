#!/usr/bin/env npx ts-node
import { promises as fs } from 'fs'
import path from 'path'
import { source } from './twemojis.json'

const BLOB_PATH = path.join(__dirname, '..', 'emojis.json')

const points = source
  .filter((point) => point.length < 6)
  .map((point) => Number.parseInt(point, 16))
  .filter((point) => {
    const orignal = String.fromCodePoint(point)
    return orignal.codePointAt(0) === point && orignal.length === 2
  })
  .sort((a, b) => a - b)
  .slice(0, 1024)

function makeDifferencePairs(points: number[]) {
  const pairs = [0, points[0]]
  for (let i = 1; i < points.length; i++) {
    const value = points[i] - points[i - 1]
    if (value > 1) {
      pairs.push(i, value)
    }
  }
  return pairs
}

async function main() {
  const diffPoints = makeDifferencePairs(points).map((value: number) => value.toString(36))
  console.log('Diff Points:', diffPoints.length / 2)
  const data = JSON.stringify(diffPoints.join(','))
  await fs.writeFile(BLOB_PATH, data)
  console.log('Make blob table done')
}

main()
