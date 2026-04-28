import React from "react";
import { h } from "../../utils/h";
import { useAuth } from "../../context/AuthContext";
import AuthPanel from "../ui/AuthPanel";

const AuthModal = () => {
  const { user, showAuthModal, authView, closeAuth, setAuthView } = useAuth();

  if (!showAuthModal) {
    return null;
  }

  return h("div", { className: "auth-modal-backdrop" }, [
    h("div", { key: "window", className: "auth-modal-window" }, [
      user
        ? h(
            "button",
            {
              key: "close",
              type: "button",
              className: "auth-modal-close",
              onClick: closeAuth
            },
            "×"
          )
        : null,
      h(AuthPanel, {
        key: "panel",
        mode: authView,
        compact: true,
        onSwitch: setAuthView
      })
    ])
  ]);
};

export default AuthModal;

