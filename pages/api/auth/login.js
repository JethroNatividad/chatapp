import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            login(req, res)
            break
        default:
            res.status(400).json({ message: "Method not allowed!" })
            break
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        // validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email, and password are required' })
        }

        const user = await User.findOne({ email })
        // check if user doesn't exist
        if (!user) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // expires in 24 hours
        })

        res.status(201).json({
            message: 'Successfully logged in',
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