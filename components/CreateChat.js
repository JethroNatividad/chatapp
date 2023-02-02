import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button
} from '@chakra-ui/react'
import { useCreateChat } from '../context/CreateChatContext'


const CreateChat = () => {
    const { isOpen, onClose } = useCreateChat()
    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a conversation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Lorem, ipsum.
                </ModalBody>


            </ModalContent>
        </Modal>
    )
}

export default CreateChat