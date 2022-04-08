"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _hashPassword = require('../utils/hashPassword'); var _hashPassword2 = _interopRequireDefault(_hashPassword);
var _generateToken = require('../utils/generateToken'); var _generateToken2 = _interopRequireDefault(_generateToken);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _User = require('../schemas/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
   async index (req, res) {
    const users = await _User2.default.find()

    return res.json(users)
  }

   async show (req, res) {
    const { id } = req.params
    const user = await _User2.default.findById(id)

    return res.json(user)
  }

   async create (req, res) {
    const { name, email, password } = req.body
    await _User2.default.create({
      name,
      email,
      password: _hashPassword2.default.call(void 0, password)
    }, (error, user) => {
      if (_optionalChain([error, 'optionalAccess', _ => _.code]) === 11000) {
        return res.status(401).send('Email already used')
      } else if (error) {
        return res.status(400).send(error)
      } else {
        console.log(error)
        return res.status(201).send({
          token: _generateToken2.default.call(void 0, user.id)
        })
      }
    })
  }

   async auth (req, res) {
    const {
      email,
      password
    } = req.body

    const user = await _User2.default.findOne({ email })

    _bcrypt2.default.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(400).json({
          error: err
        })
      } else {
        if (result) {
          res.status(200).send({
            isCorrect: result,
            token: _generateToken2.default.call(void 0, user.id)
          })
        } else {
          res.status(401).json({
            isCorrect: result,
            message: 'Invalid Password'
          })
        }
      }
    })
  }
}

exports. default = new UserController()
