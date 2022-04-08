"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _Favorite = require('../schemas/Favorite'); var _Favorite2 = _interopRequireDefault(_Favorite);

class FavoriteController {
   async indexAllByUser (req, res) {
    const { userId } = req
    const favorites = await _Favorite2.default.find({ user: userId })

    return res.json(favorites)
  }

   async create (req, res) {
    const { movieId } = req.body
    const { userId } = req
    const existingFavorite = await _Favorite2.default.findOne({ movieId, user: userId })

    if (existingFavorite) {
      return res.status(200).send(existingFavorite)
    } else {
      const favorite = await _Favorite2.default.create({ movieId, user: userId })
      return res.status(201).send(favorite)
    }
  }

   async delete (req, res) {
    const { movieId } = req.params
    const { userId } = req
    const existingFavorite = await _Favorite2.default.findOneAndDelete({ movieId, user: userId })

    return res.status(200).send(existingFavorite)
  }
}

exports. default = new FavoriteController()
