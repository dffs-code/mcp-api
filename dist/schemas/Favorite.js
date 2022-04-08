"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');





const FavoriteSchema = new (0, _mongoose.Schema)({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

exports. default = _mongoose.model('Favorite', FavoriteSchema)
