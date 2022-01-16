import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
      maxlength: [20, 'Your name is up to 20 chars long'],
    },
    account: {
      type: String,
      required: [true, 'Please add your email or phone'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
      minlength: [6, 'Password must be at least 6 chars.']
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
    },
    role: {
      type: String,
      default: 'user', // admin
    },
    type: {
      type: String,
      defaul: 'normal', // fast
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IUser>('User', userSchema)
