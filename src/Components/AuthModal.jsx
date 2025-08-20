import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

/**
 * AuthModal
 * Props:
 * - open: boolean
 * - onClose: function
 * - defaultView: 'login' | 'register'
 */
export default function AuthModal({ open = false, onClose = () => {}, defaultView = "login" }) {
  const [view, setView] = useState(defaultView === "register" ? "register" : "login");

  useEffect(() => {
    setView(defaultView === "register" ? "register" : "login");
  }, [defaultView, open]);

  return (
    <Modal isOpen={!!open} onClose={onClose} isCentered size={{ base: "md", md: "lg" }} motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{view === "login" ? "Log in to 100acress" : ""}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {view === "login" ? (
            <LoginForm inModal onSwitchToRegister={() => setView("register")} />
          ) : (
            <SignupForm inModal onSwitchToLogin={() => setView("login")} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
