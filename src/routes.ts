import { Router } from 'express'

import UserController from './controllers/UserController'
import FavoriteController from './controllers/FavoriteController'
import authMiddleware from './middlewares/auth'

const routes = Router()

routes
  .post('/user', UserController.create)
  .post('/auth', UserController.auth)
  .get('/users/:id', UserController.show)
  .get('/users', UserController.index)
  .get('/favorites', authMiddleware, FavoriteController.indexAllByUser)
  .post('/favorite', authMiddleware, FavoriteController.create)
  .delete('/unfavorite/:movieId', authMiddleware, FavoriteController.delete)

export default routes
