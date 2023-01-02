import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
  },
  attachments: [{
    type: String,
  }],
  seen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ]

},
  {
    timestamps: true,
  })

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
