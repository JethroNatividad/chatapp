import Pusher from "pusher"


export default (req, res) => {
    const pusher = new Pusher({
        appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        useTLS: true
    })
    // Extract the user's ID from the request body
    const user_id = req.body.user_id

    // Use the user's ID to perform any necessary actions or lookups in the database
    // ...

    // Trigger the event on Pusher
    pusher.trigger('test', 'message:new', () => {
        console.log('triggered message:new')
        console.log(user_id)
    })

    // Send a response back to the client
    res.send(result)
}