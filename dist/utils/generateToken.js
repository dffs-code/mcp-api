"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _authjson = require('../config/auth.json'); var _authjson2 = _interopRequireDefault(_authjson);

exports. default = (id) => {
  return _jsonwebtoken2.default.sign({ id: id }, _authjson2.default.secret, {
    expiresIn: 604800
  })
}
