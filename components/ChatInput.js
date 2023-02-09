import { IconButton, Input, Icon, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'

const ChatInput = () => {
    const { sendMessage } = useChat()
    const [text, setText] = useState('')

    return (
        <Flex>
            <Input onChange={ (e) => setText(e.currentTarget.value) } value={ text } type='text' placeholder='Write a message..' /><IconButton onClick={ () => sendMessage(text) } icon={ <Icon h={ 5 } w={ 5 } color='white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </Icon>
            } variant='outline' />
        </Flex>
    )
}

export default ChatInput