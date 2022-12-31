import jwt from 'jsonwebtoken'
import Token from './models/Token'

function generateAccessToken(user) {
    const { id } = user
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    })
}

async function generateRefreshToken(user) {
    const { id } = user
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
    // save refresh token to database
    const token = new Token({ token: refreshToken })
    await token.save()

    return refreshToken
}

export { generateAccessToken, generateRefreshToken }