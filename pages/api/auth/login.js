import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '../../../lib/server/jwt'
import { serialize } from "cookie"

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            login(req, res)
            break
        default:
            res.setHeader('Allow', ['POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        // validate input
        if (!email || !password) {
            return res.status(200).json({ error: { message: 'Email and password are required' } })
        }

        const user = await User.findOne({ email })
        // check if user doesn't exist
        if (!user) {
            return res.status(200).json({ error: { message: 'Invalid credentials' } })
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(200).json({ error: { message: 'Invalid credentials' } })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        // Set the refresh token as a cookie, httpOnly to prevent XSS attacks
        const serializedRefresh = serialize("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
        res.setHeader("Set-Cookie", serializedRefresh)

        res.status(201).json({
            error: null,
            user: {
                _id: user._id,
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