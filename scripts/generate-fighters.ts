/// <reference types="node" />

import fs from "fs"
import path from "path"
import csv from "csv-parser"

const fighters: { id: number; name: string }[] = []

const root = process.cwd()

const csvPath = path.join(
  root,
  "data",
  "ufc-fighters-statistics.csv"
)

const outputPath = path.join(
  root,
  "sports-predictor-frontend",
  "data",
  "fighters.ts"
)

let id = 1

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row) => {
    if (row.name) {
      fighters.push({
        id: id++,
        name: row.name.trim(),
      })
    }
  })
  .on("end", () => {
    const fileContents = `export interface Fighter {
  id: number
  name: string
}

export const fighters: Fighter[] = ${JSON.stringify(fighters, null, 2)}
`

    fs.writeFileSync(outputPath, fileContents)
    console.log("fighters.ts generated successfully")
  })
