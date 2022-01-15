import { Request, Response } from 'express'
import Users from '../models/userModel'
import argon2 from 'argon2'
import { generateActiveToken } from '../config/generateToken'
import { validateEmail } from '../middlewares/valid'
import sendMail from '../config/sendMail'
import { CLIENT_URL } from '../constants'

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body

      const user = await Users.findOne({ account })
      if (user) return res.status(400).json({ msg: 'Email or Phone number already exists.' })

      const passwordHash = await argon2.hash(password)

      const newUser = { name, account, password: passwordHash }

      const active_token = generateActiveToken({ newUser })

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
