import jsonwebtoken from 'jsonwebtoken'
import { key } from './config.js'

export const createToken = (data) => {
  return jsonwebtoken.sign(data, key, {
    expiresIn: '2h',
  })
}

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token']
  if (!token) res.sendStatus(403)
  else {
    try {
      req.data = jsonwebtoken.verify(token, key)
      next()
    } catch (e) {
      if (e instanceof jsonwebtoken.TokenExpiredError) res.sendStatus(408)
      else if (e instanceof jsonwebtoken.JsonWebTokenError) res.sendStatus(403)
      else res.sendStatus(400)
    }
  }
}

export const verifyToken2 = (token) => {
  jsonwebtoken.verify(token, key)
  return true
}
