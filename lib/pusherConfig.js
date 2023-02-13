const pusherConfig = {
    // required pusherConfig props
    clientKey: process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,

    // optional if you'd like to trigger events. BYO endpoint.
    // see "Trigger Server" below for more info
    triggerEndpoint: "/pusher/trigger",

    // required for private/presence channels
    // also sends auth headers to trigger endpoint
    authEndpoint: "/pusher/auth",
    auth: {
        withCredentials: true,
    },
}

export default pusherConfig