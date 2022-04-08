"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

exports. default = (password) => {
  const saltRounds = 10
  const salt = _bcrypt2.default.genSaltSync(saltRounds)
  const hashedPassword = _bcrypt2.default.hashSync(password, salt)
  return hashedPassword
}
