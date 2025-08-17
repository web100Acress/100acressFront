import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function AuthModal({ open, onClose, defaultView = "register" }) {
  const [view, setView] = useState(defaultView);

  // When modal opens with a different defaultView, sync internal state
  React.useEffect(() => {
    if (open) setView(defaultView);
  }, [open, defaultView]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{view === "register" ? "Create your account" : "Login to your account"}</Title>
          <CloseBtn onClick={onClose} aria-label="Close">×</CloseBtn>
        </Header>
        <Body>
          {view === "register" ? (
            <SignupForm inModal onSwitchToLogin={() => setView("login")} />
          ) : (
            <LoginForm inModal onSwitchToRegister={() => setView("register")} />
          )}
        </Body>
      </ModalContainer>
    </Overlay>
  );
}

export default AuthModal;

// Styles inspired by prior modal work: blur backdrop, fade-in, responsive
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 180ms ease;
`;

const ModalContainer = styled.div`
  width: min(640px, 92vw);
  max-height: 88vh;
  overflow: auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  border-top: 4px solid #e53935;
  animation: ${slideIn} 200ms ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f3f4f6;
  background: linear-gradient(90deg, #e53935, #c62828);
  color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
`;

const CloseBtn = styled.button`
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 160ms ease, transform 120ms ease;
  &:hover { background: rgba(255,255,255,0.2); }
  &:active { transform: scale(0.98); }
`;

const Body = styled.div`
  padding: 8px 12px 0 12px;
`;

// Footer and external switch link removed to avoid duplicate prompts; forms contain their own toggle links
