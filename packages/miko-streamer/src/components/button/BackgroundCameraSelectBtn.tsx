import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import CameraSwitch from './cameraSelect/CameraSwitch';

const BackgroundCameraSelectBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button onClick={onOpen} size="sm" colorScheme="blackAlpha" opacity="0.8">
        Camera
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Camera Switch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CameraSwitch />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BackgroundCameraSelectBtn;
