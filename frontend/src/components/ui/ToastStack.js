import React from "react";
import { useToast } from "../../context/ToastContext";

const ToastStack = () => {
  const { toasts, removeToast } = useToast();

  return <div className="toast-stack">
  {toasts.map((toast) =>
        <div key={toast.id} className={`toast-item toast-${toast.variant}`}>
    <div key="content" className="toast-content">
      <strong key="title">
        {toast.title}
      </strong>
      <p key="message">
        {toast.message}
      </p>
    </div>
    <button key="button" type="button" className="toast-close" onClick={() => removeToast(toast.id)}>×</button>
  </div>
      )}
</div>;
};

export default ToastStack;

