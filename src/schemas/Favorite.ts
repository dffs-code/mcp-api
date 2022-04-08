import { Schema, model, Document } from 'mongoose'

interface FavoriteInterface extends Document{
  movieId: string
}

const FavoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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

export default model<FavoriteInterface>('Favorite', FavoriteSchema)
