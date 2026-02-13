import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

export default function AuthModal({ open = false, onClose = () => { }, defaultView = "login" }) {
  const [view, setView] = useState(defaultView === "register" ? "register" : "login");
  const location = useLocation();
  useEffect(() => {
    setView(defaultView === "register" ? "register" : "login");
  }, [defaultView, open]);

  useEffect(() => {
    const closeListener = () => onClose();
    try {
      window.addEventListener('closeAuthModal', closeListener);
    } catch (_) { }
    return () => {
      try {
        window.removeEventListener('closeAuthModal', closeListener);
      } catch (_) { }
    };
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const path = location?.pathname || '';
    if (path.startsWith('/auth/signup/otp-verification')) {
      onClose();
    }
  }, [location?.pathname, onClose, open]);

  return (
    <Modal
      isOpen={!!open}
      onClose={onClose}
      size={{ base: "xs", md: "sm" }}
      motionPreset="scale"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.55)"
        backdropFilter="blur(4px)"
      />
      <ModalContent
        marginTop={{ base: "60px", md: "80px", lg: "100px" }}
        marginBottom="40px"
        maxH="calc(100vh - 140px)"
        sx={{
          '@media screen and (max-height: 700px)': {
            marginTop: '40px',
            marginBottom: '20px',
            maxH: 'calc(100vh - 80px)',
          },
          '@media screen and (max-height: 600px)': {
            marginTop: '30px',
            marginBottom: '15px',
            maxH: 'calc(100vh - 60px)',
          }
        }}
      >
        
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
