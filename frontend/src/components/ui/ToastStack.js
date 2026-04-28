import React from "react";
import { h } from "../../utils/h";
import { useToast } from "../../context/ToastContext";

const ToastStack = () => {
  const { toasts, removeToast } = useToast();

  return h(
    "div",
    { className: "toast-stack" },
    toasts.map((toast) =>
      h(
        "div",
        {
          key: toast.id,
          className: `toast-item toast-${toast.variant}`
        },
        [
          h(
            "div",
            {
              key: "content",
              className: "toast-content"
            },
            [
              h("strong", { key: "title" }, toast.title),
              h("p", { key: "message" }, toast.message)
            ]
          ),
          h(
            "button",
            {
              key: "button",
              type: "button",
              className: "toast-close",
              onClick: () => removeToast(toast.id)
            },
            "×"
          )
        ]
      )
    )
  );
};

export default ToastStack;

