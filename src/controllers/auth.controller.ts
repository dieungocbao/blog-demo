import argon2 from 'argon2'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { generateActiveToken } from '../config/generateToken'
import sendMail from '../config/sendMail'
import { ACTIVE_TOKEN_SECRET, CLIENT_URL } from '../constants'
import { IToken } from '../interfaces/user.interface'
import { validateEmail } from '../middlewares/valid'
import Users from '../models/userModel'

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await Users.findOne({ account })
      if (user) return res.status(400).json({ msg: 'Email or Phone number already exists.' })

      const passwordHash = await argon2.hash(password)

      const newUser = new Users({ name, account, password: passwordHash })
      await newUser.save()

      const active_token = generateActiveToken({ name, account })

      const url = `${CLIENT_URL}/active/${active_token}`

      if (validateEmail(account)) {
        sendMail(account, url, 'Verify your email address')
        return res.json({ msg: 'Success! Please check your email.' })
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ msg: err.message })
      }
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body
      const { account } = <IToken>jwt.verify(active_token, `${ACTIVE_TOKEN_SECRET}`)
      if (!account) {
        return res.status(400).json({ msg: 'Invalid authentication.' })
      }
      await Users.findOneAndUpdate({ account }, { $set: { isActive: true } }, { new: true })
      return res.json({ msg: 'Account has been activated!' })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ msg: err.message })
      }
    }
  },
  sendActiveEmail: async (req: Request, res: Response) => {
    try {
      const { account } = req.body
      const active_token = generateActiveToken({ account })
      const url = `${CLIENT_URL}/active/${active_token}`
      if (validateEmail(account)) {
        sendMail(account, url, 'Verify your email address')
        return res.json({ msg: 'Success! Please check your email.' })
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ msg: err.message })
      }
    }
  },
}

export default authController
