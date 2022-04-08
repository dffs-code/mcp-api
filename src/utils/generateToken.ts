import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

export default (id) => {
  return jwt.sign({ id: id }, authConfig.secret, {
    expiresIn: 604800
  })
}
