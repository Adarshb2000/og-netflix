import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'file-system'
import { createToken, verifyToken } from './jwt_auth.js'
import { getVideos } from './get_videos.js'
import { key, path, tempPath } from './config.js'

export const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/get-shows', verifyToken, (req, res) => {
  res.json(getVideos(path))
})

app.post('/auth', (req, res) => {
  const body = req.body
  if (body.username === 'blehh' && body.password === 'ILoveYou') {
    res.json({ token: createToken({ username: body.username }) })
  } else {
    res.sendStatus(403)
  }
})

app.get('/video/:id', (req, res) => {
  const range = req.headers.range
  if (!range) {
    res.status(400).send('requires Range header')
    console.log('no range')
  } else {
    const videoPath = tempPath[req.params.id]
    const videoSize = fs.statSync(videoPath).size
    const CHUNK_SIZE = 1e6
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Range': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': `video/${videoPath.split('.')[1]}`,
    }
    res.writeHead(206, headers)

    const videoStream = fs.createReadStream(videoPath, { start, end })
    videoStream.pipe(res)
  }
})

export const start = () => {
  app.listen(3000, () => {
    console.log(`listening at http://localhost:3000`)
  })
}
