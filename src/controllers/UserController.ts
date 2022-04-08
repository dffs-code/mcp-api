import { Request, Response } from 'express'
import hashPassword from '../utils/hashPassword'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcrypt'

import User from '../schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async show (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = await User.findById(id)

    return res.json(user)
  }

  public async create (req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body
    await User.create({
      name,
      email,
      password: hashPassword(password)
    }, (error: any, user) => {
      if (error?.code === 11000) {
        return res.status(401).send('Email already used')
      } else if (error) {
        return res.status(400).send(error)
      } else {
        console.log(error)
        return res.status(201).send({
          token: generateToken(user.id)
        })
      }
    })
  }

  public async auth (req: Request, res: Response) {
    const {
      email,
      password
    } = req.body

    const user = await User.findOne({ email })

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(400).json({
          error: err
        })
      } else {
        if (result) {
          res.status(200).send({
            isCorrect: result,
            token: generateToken(user.id)
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

export default new UserController()
