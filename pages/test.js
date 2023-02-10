import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
let socket

const Test = () => {
    const [input, setInput] = useState('')
    const [res, setRes] = useState('')

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket')
            socket = io()

            socket.on('connect', () => {
                console.log('connected')
            })

            socket.on('update-input', msg => {
                setInput(msg)
            })
        }
        socketInitializer()

    }, [])

    return (

        <div>
            <p>Test Page</p>
            <p>{ res }</p>
            <input
                placeholder="Type something"
                value={ input }
                onChange={ onChangeHandler }
            />
            <button onClick={ () => {
                socket.emit('input-change', input)
            } }>Send test</button>
        </div>
    )
}

export default Test