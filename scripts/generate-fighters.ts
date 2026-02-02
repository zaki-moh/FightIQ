/// <reference types="node" />

import fs from "fs"
import path from "path"
import csv from "csv-parser"

type FighterRow = {
  name?: string
  gender?: string
}

const fighters: { id: number; name: string; gender: string }[] = []

const root = process.cwd()

const csvPath = path.join(
  root,
  "backend",
  "data",
  "ufc-fighters-statistics-with-gender.csv"
)

const outputPath = path.join(
  root,
  "frontend",
  "data",
  "fighters.ts"
)

let id = 1

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row: FighterRow) => {
    if (!row.name) return

    const name = row.name.trim()

    // normalize gender values
    const gender =
      row.gender?.toLowerCase().startsWith("f")
        ? "female"
        : "male"

    fighters.push({
      id: id++,
      name,
      gender,
    })
  })
  .on("end", () => {
    const fileContents = `export interface Fighter {
  id: number
  name: string
  gender: "male" | "female"
}

export const fighters: Fighter[] = ${JSON.stringify(fighters, null, 2)}
`

    fs.writeFileSync(outputPath, fileContents)
    console.log("fighters.ts generated successfully")
  })
