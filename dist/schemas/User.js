"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');







const UserSchema = new (0, _mongoose.Schema)({
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

exports. default = _mongoose.model('User', UserSchema)
