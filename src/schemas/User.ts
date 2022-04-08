import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document{
  email: string
  name: string
  password: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default model<UserInterface>('User', UserSchema)
