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

    // find the counter document
    const counter = await Counter.findOne({ name: 'users' })

    if (!counter) {
      // create a new counter document
      const newCounter = new Counter({
        name: 'users',
        count: 1,
      })
      await newCounter.save()
      this.tag = `${newCounter.count}`
    } else {
      // increment the counter
      counter.count = counter.count + 1
      await counter.save()
      this.tag = `${counter.count}`
    }
  }
  next()
})

export default mongoose.models.User || mongoose.model('User', UserSchema)