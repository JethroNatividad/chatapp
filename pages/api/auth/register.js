import dbConnect from '../../../lib/dbConnect'

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

async function register(req, res) {}
