import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from '@chakra-ui/react'

const CreateConversation = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a conversation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Hi
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateConversation