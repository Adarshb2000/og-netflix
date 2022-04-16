import path from 'path'
import fs from 'fs'
import { tempPath } from './config.js'
import hashFunction from './hash-function.js'

const getVideos = (directory) => {
  const filesInDir = fs.readdirSync(directory)
  if (fs.statSync(path.join(directory, filesInDir[0])).isDirectory()) {
    const files = {}
    filesInDir.forEach((f) => {
      files[f] = getVideos(path.join(directory, f))
    })
    return files
  } else {
    return filesInDir.map((file) => {
      const id = hashFunction(directory + '/' + file)
      tempPath[id] = path.join(directory, file)
      return [file, id]
    })
  }
}

export { getVideos }
