import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

const Alert = ({
  isOpen,
  onClose,
  title = "Confirmation",
  body = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isCentered = true,
}) => {
  const cancelRef = useRef();

  // Set responsive width for the dialog (90% width on mobile, 500px on larger screens)
  const dialogWidth = useBreakpointValue({ base: "90%", sm: "500px" });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered={isCentered}
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxW={dialogWidth}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            {cancelText && (
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
            )}
            <Button colorScheme="red" onClick={onConfirm} ml={cancelText ? 3 : 0}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
