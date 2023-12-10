import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Link,
} from "@chakra-ui/react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WhitelistErrorPopup = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          You are not whitelisted. Please send an email to{" "}
          <Link textColor={"blue"} href="mailto:yehiatarek67@gmail.com">
            yehiatarek67@gmail.com
          </Link>{" "}
          to whitelist you.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WhitelistErrorPopup;
