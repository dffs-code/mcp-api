import { Request, Response } from 'express'
import Favorite from '../schemas/Favorite'

class FavoriteController {
  public async indexAllByUser (req: Request, res: Response): Promise<Response> {
    const { userId } = req
    const favorites = await Favorite.find({ user: userId })

    return res.json(favorites)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { movieId } = req.body
    const { userId } = req
    const existingFavorite = await Favorite.findOne({ movieId, user: userId })

    if (existingFavorite) {
      return res.status(200).send(existingFavorite)
    } else {
      const favorite = await Favorite.create({ movieId, user: userId })
      return res.status(201).send(favorite)
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { movieId } = req.params
    const { userId } = req
    const existingFavorite = await Favorite.findOneAndDelete({ movieId, user: userId })

    return res.status(200).send(existingFavorite)
  }
}

export default new FavoriteController()
