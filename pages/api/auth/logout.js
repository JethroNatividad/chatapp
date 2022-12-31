import { serialize } from "cookie"
import dbConnect from "../../../lib/dbConnect"
import Token from "../../../models/Token"


export default async function handler(req, res) {
    const { method } = req
    await dbConnect()

    switch (method) {
        case 'GET':
            return logout(req, res)
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function logout(req, res) {
    const refreshToken = req.cookie.refresh_token
    if (!refreshToken) {
        console.log('no refresh token so you are already logged out')
        return res.status(200).end('no refresh token so you are already logged out')
    }
    try {
        const tokenExists = await Token.findOne({ token: refreshToken })
        if (!tokenExists) {
            console.log('refresh token not found so you are already logged out')
            return res.status(403).end('refresh token not found so you are already logged out')
        }
        await tokenExists.remove()
        const serializedRefresh = serialize("refresh_token", null, { httpOnly: true, sameSite: "strict", path: "/" })
        const serializedAccess = serialize("access_token", null, { httpOnly: true, sameSite: "strict", path: "/" })
        res.setHeader('Set-Cookie', [serializedAccess, serializedRefresh])

        console.log("Logged out successfully")
        return res.status(200).end('Logged out successfully')
    } catch (error) {
        console.log(error)
        return res.status(403).end(error.message)
    }
}