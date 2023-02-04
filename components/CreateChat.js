import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Stack, Flex, Box, Text
} from '@chakra-ui/react'
import { useCreateChat } from '../context/CreateChatContext'
import SearchUsers from './SearchUsers'


const CreateChat = () => {
    const { isOpen, onClose, selectedUsers, toggleSelectUser } = useCreateChat()

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a conversation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SearchUsers />
                    <Stack py='2' direction='row' overflowX='auto' >
                        { selectedUsers.map(user => (
                            <Flex cursor='pointer' onClick={ () => toggleSelectUser({ username: user.username, tag: user.tag, _id: user._id }) } alignItems='center' px={ 2 } rounded='lg' py={ 1 } _hover={ { bg: 'blue.600' } } bg='blue.700' key={ user.id }>
                                <Text>{ user.username }#{ user.tag }</Text>
                                <Box w={ 4 } h={ 4 }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Box>

                            </Flex>
                        )) }
                    </Stack>

                </ModalBody>
                <ModalFooter>
                    <Button disabled={ selectedUsers.length < 1 } w='full'>Create Chat</Button>

                </ModalFooter>


            </ModalContent>
        </Modal>
    )
}

export default CreateChat