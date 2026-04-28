import React, { useContext, useState } from "react";
import { h } from "../utils/h";

const ToastContext = React.createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const pushToast = (toast) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const nextToast = {
      id,
      title: toast.title || "Update",
      message: toast.message || "",
      variant: toast.variant || "info"
    };

    setToasts((currentToasts) => [...currentToasts, nextToast]);
    window.setTimeout(() => removeToast(id), toast.duration || 3600);
  };

  return h(
    ToastContext.Provider,
    {
      value: {
        toasts,
        pushToast,
        removeToast
      }
    },
    children
  );
};

export const useToast = () => useContext(ToastContext);

