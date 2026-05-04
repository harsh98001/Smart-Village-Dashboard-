import React from "react";
import { useAuth } from "../../context/AuthContext";
import AuthPanel from "../ui/AuthPanel";

const AuthModal = () => {
  const { user, showAuthModal, authView, closeAuth, setAuthView } = useAuth();

  if (!showAuthModal) {
    return null;
  }

  return <div className="auth-modal-backdrop">
  <div key="window" className="auth-modal-window">
    {user
            ? <button key="close" type="button" className="auth-modal-close" onClick={closeAuth}>×</button>
            : null}
    <AuthPanel key="panel" mode={authView} compact onSwitch={setAuthView} />
  </div>
</div>;
};

export default AuthModal;

