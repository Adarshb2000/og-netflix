import * as path from 'path'
import * as fs from 'fs'
import { tempPath } from './config.js'

const getVideos = (directory) => {
  const filesInDir = fs.readdirSync(directory)
  if (fs.statSync(path.join(directory, filesInDir[0])).isDirectory()) {
    const files = {}
    filesInDir.forEach((f) => {
      files[f] = getVideos(path.join(directory, f))
    })
    return files
  } else {
    return filesInDir.map((val) => {
      const id = 1e9 + Math.floor(Math.random() * 1e9)
      tempPath[id] = path.join(directory, val)
      return [val, id]
    })
  }
}

export { getVideos }
