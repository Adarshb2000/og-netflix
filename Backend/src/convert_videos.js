import { promisify } from 'util'
import { exec as nasdajnw } from 'child_process'
import fs from 'fs'
import path from 'path'

const exec = promisify(nasdajnw)

const convertVideos = async (directory) => {
  if (!directory) return
  const filesInDir = fs.readdirSync(directory)
  if (!filesInDir.length) return
  if (fs.statSync(path.join(directory, filesInDir[0])).isDirectory()) {
    await Promise.all(
      filesInDir.map(async (f) => {
        if (!(typeof f === 'string')) {
          console.log(typeof f === 'string')
          return
        }
        await convertVideos(path.join(directory, f))
      })
    )
  } else {
    filesInDir.forEach(async (file) => {
      const ext = file.split('.').splice(-1)[0].trim()
      if (ext !== 'mkv') return
      const name = file.replace('.mkv', '')
      try {
        console.log(`Found mkv file ${file}, converting.`)
        await exec(
          `ffmpeg -y -i '${directory + '/' + file}' -codec copy '${
            directory + '/' + name + '.mp4'
          }'`
        )
        console.log(`converted! Removing ${file}`)
        // await exec(`rm '${directory + '/' + file}'`)
        console.log(`Completed!`)
      } catch (e) {
        console.log(e)
        throw e
      }
    })
  }
}

export default convertVideos
