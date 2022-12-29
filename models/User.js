import mongoose from 'mongoose'
import Counter from './Counter'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  tag: {
    type: String,
    unique: true,
  }
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('tag')) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'users' },
      { $inc: { count: 1 } },
      { new: true }
    )
    this.tag = counter.count
  }
  next()
})

export default mongoose.models.User || mongoose.model('User', UserSchema)