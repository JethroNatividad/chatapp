import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            register(req, res)
            break
        default:
            res.status(400).json({ message: "Method not allowed!" })
            break
    }
}

async function register(req, res) {
    try {
        const { email, password, username } = req.body
        // validate input
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Username, Email, and password are required' })
        }

        // check if email is already in use
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const user = new User({
            email,
            password: hashedPassword,
            username,
        })
        await user.save()

        // create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // expires in 24 hours
        })

        res.status(201).json({
            message: 'Successfully registered',
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
            },
            token,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}