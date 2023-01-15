import { serialize } from 'cookie'
import { generateAccessToken, generateRefreshToken } from '../../../lib/server/jwt'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            register(req, res)
            break
        default:
            res.setHeader('Allow', ['POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function register(req, res) {
    try {
        const { email, password, username } = req.body
        // validate input
        if (!email || !password || !username) {
            return res.status(200).json({ error: { message: 'Username, Email, and password are required' } })
        }

        // check if email is already in use
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).json({ error: { message: 'Email already exists' } })
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

        const accessToken = generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        // Set the refresh token as a cookie, httpOnly to prevent XSS attacks
        const serializedRefresh = serialize("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
        res.setHeader("Set-Cookie", serializedRefresh)

        res.status(201).json({
            error: null,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
            accessToken,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }
}