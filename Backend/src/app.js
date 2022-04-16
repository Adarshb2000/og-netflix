import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import { createToken, verifyToken, verifyToken2 } from './jwt_auth.js'
import { getVideos } from './get_videos.js'
import { host, key, password, port, path, tempPath } from './config.js'
import convertVideos from './convert_videos.js'

export const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('YOOO')
})

app.post('/auth', (req, res) => {
  const body = req.body
  if (body.password === password) {
    res.json({ token: createToken({ username: body.username }) })
  } else {
    res.sendStatus(403)
  }
})

app.get('/reload-feed', verifyToken, async (req, res) => {
  try {
    await convertVideos(path)
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

app.get('/get-videos', verifyToken, (req, res) => {
  res.json(getVideos(path))
  console.log(tempPath)
})

app.get('/video/:vid/:token', (req, res) => {
  const { vid, token } = req.params
  try {
    verifyToken2(token)
  } catch (err) {
    res.sendStatus(408)
    return
  }
  const range = req.headers.range
  if (!range) {
    res.status(400).send('requires range headers')
    return
  }
  const videoPath = tempPath[vid]
  const videoSize = fs.statSync(videoPath).size

  const CHUNK_SIZE = 10 ** 6
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  const contentLength = end - start + 1
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Range': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  }

  res.writeHead(206, headers)
  const videoStream = fs.createReadStream(videoPath, { start, end })

  videoStream.pipe(res)
})

export const start = () => {
  app.listen(port, host, () => {
    console.log(`listening at http://${host}:${port}`)
  })
}
