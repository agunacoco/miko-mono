import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { FC } from 'react';

type P = {
  useDisclosureReturn: UseDisclosureReturn;
  text: {
    title: string;
    close?: string;
    confirm?: string;
  };
  href?: string;
  viewBtn?: boolean;
  onConfirm?: (...args: any[]) => void;
};

const ModalWrapper: FC<P> = ({ useDisclosureReturn, text, href, viewBtn = true, onConfirm, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosureReturn;
  return (
    <>
      {viewBtn && <Button onClick={onOpen}>Open Modal</Button>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{text.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {text.close && (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                {text.close}
              </Button>
            )}
            {href ? (
              <a href={href}>
                <Button variant="ghost">{text.confirm}</Button>
              </a>
            ) : (
              <Button variant="ghost" onClick={onConfirm}>
                {text.confirm}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
