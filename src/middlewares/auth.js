import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

export default (req, res, next) => {
  const authHeader = req.headers.authorization
  // verifica se existe o header na requisição
  if (!authHeader) { return res.status(401).send({ error: 'No Token Provided' }) }

  // separa o header em duas partes
  const parts = authHeader.split(' ')
  if (!parts.length === 2) { return res.status(401).send({ error: 'Token error' }) }

  // desestrutura o token e verifica se existe Bearer
  const [scheme, token] = parts
  if (!/^Bearer$/.test(scheme)) { return res.status(401).send({ error: 'Token malformed' }) }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) { return res.status(401).send({ error: 'Invalid Token' }) }

    req.userId = decoded.id
    return next()
  })
}
