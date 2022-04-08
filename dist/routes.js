"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _FavoriteController = require('./controllers/FavoriteController'); var _FavoriteController2 = _interopRequireDefault(_FavoriteController);
var _auth = require('./middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = _express.Router.call(void 0, )

routes
  .post('/user', _UserController2.default.create)
  .post('/auth', _UserController2.default.auth)
  .get('/users/:id', _UserController2.default.show)
  .get('/users', _UserController2.default.index)
  .get('/favorites', _auth2.default, _FavoriteController2.default.indexAllByUser)
  .post('/favorite', _auth2.default, _FavoriteController2.default.create)
  .delete('/unfavorite/:movieId', _auth2.default, _FavoriteController2.default.delete)

exports. default = routes
