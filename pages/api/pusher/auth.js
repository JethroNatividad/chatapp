import jwt from 'jsonwebtoken'
import dbConnect from '../../../lib/dbConnect'

export default async (req, res) => {
    // Extract the socket_id and channel_name from the query string
    const socket_id = req.query.socket_id
    const channel_name = req.query.channel_name
    const refreshToken = req.cookies.refresh_token

    try {
        dbConnect()
        const tokenExists = await Token.findOne({ token: refreshToken })
        if (!tokenExists) {
            console.log('refresh token not found')
            return res.status(403).end('refresh token not found')
        }

        // Verify the JWT token and retrieve the user's ID
        const decoded = jwt.verify(tokenExists.token, process.env.REFRESH_TOKEN_SECRET)
        const user_id = decoded.id

        // Generate an authentication token for the user
        const auth = pusher.authenticate(socket_id, channel_name, {
            user_id: user_id
        })

        // Send the authentication token back to Pusher
        res.send(auth)
    } catch (error) {

    }
}