import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  is_group_chat: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  last_message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
},
  {
    timestamps: true,
  }
)

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
