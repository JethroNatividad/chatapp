import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fetch from 'isomorphic-unfetch'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            logout(req, res)
            break
        default:
            res.status(400).json({ message: "Method not allowed!" })
            break
    }
}

async function logout(req, res) {
    try {
        // Extract the jti claim from the auth token
        const { jti } = jwt.decode(req.cookies.authToken)

        // Invalidate the jti in the blacklist
        await fetch(`api/auth/blacklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jti }),
            credentials: 'include',
        })

        // Clear the auth token cookie
        res.clearCookie('authToken')

        res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}