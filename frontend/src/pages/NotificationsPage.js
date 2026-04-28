import React, { useState } from "react";
import { h } from "../utils/h";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import PageBanner from "../components/layout/PageBanner";
import { formatDate } from "../utils/formatters";

const NotificationsPage = () => {
  const { isAdmin } = useAuth();
  const { notifications, publishNotification, deleteNotification } = useData();
  const { pushToast } = useToast();
  const [formState, setFormState] = useState({
    title: "",
    message: "",
    type: "broadcast",
    priority: "medium",
    audience: "all"
  });

  const submitNotification = async (event) => {
    event.preventDefault();

    try {
      await publishNotification(formState);
      pushToast({
        title: "Broadcast published",
        message: "The new alert is now visible across the dashboard.",
        variant: "success"
      });
      setFormState({
        title: "",
        message: "",
        type: "broadcast",
        priority: "medium",
        audience: "all"
      });
    } catch (error) {
      pushToast({
        title: "Publish failed",
        message: error.response?.data?.message || "Unable to publish the notification.",
        variant: "danger"
      });
    }
  };

  return h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Alerts", "Broadcasts", "Toasts"] }),
    h("section", { key: "body", className: "notifications-page-section" }, [
      h("div", { key: "container", className: "container dashboard-split-grid" }, [
        h("div", { key: "feed", className: "premium-card notification-feed-card" }, [
          h("h3", { key: "title" }, "Live updates and alerts"),
          h(
            "div",
            { key: "list", className: "notification-feed" },
            notifications.map((notification) =>
              h("article", { key: notification._id, className: "notification-card-item" }, [
                h("div", { key: "header", className: "notification-card-top" }, [
                  h("span", { key: "type", className: `pill-badge ${notification.type}` }, notification.type),
                  h("span", { key: "date", className: "small-label" }, formatDate(notification.createdAt))
                ]),
                h("strong", { key: "title" }, notification.title),
                h("p", { key: "message" }, notification.message),
                isAdmin
                  ? h(
                      "button",
                      {
                        key: "delete",
                        type: "button",
                        className: "btn btn-sm btn-outline-danger",
                        onClick: () => deleteNotification(notification._id)
                      },
                      "Delete"
                    )
                  : null
              ])
            )
          )
        ]),
        isAdmin
          ? h("div", { key: "form", className: "premium-card notification-form-card" }, [
              h("h3", { key: "title" }, "Admin broadcast panel"),
              h(
                "form",
                {
                  key: "formContent",
                  className: "admin-form-grid",
                  onSubmit: submitNotification
                },
                [
                  h("input", {
                    key: "title",
                    className: "form-control",
                    placeholder: "Notification title",
                    value: formState.title,
                    onChange: (event) =>
                      setFormState({ ...formState, title: event.target.value })
                  }),
                  h("textarea", {
                    key: "message",
                    className: "form-control",
                    placeholder: "Broadcast message",
                    rows: 5,
                    value: formState.message,
                    onChange: (event) =>
                      setFormState({ ...formState, message: event.target.value })
                  }),
                  h(
                    "select",
                    {
                      key: "type",
                      className: "form-select",
                      value: formState.type,
                      onChange: (event) =>
                        setFormState({ ...formState, type: event.target.value })
                    },
                    [
                      h("option", { key: "broadcast", value: "broadcast" }, "Broadcast"),
                      h("option", { key: "alert", value: "alert" }, "Alert"),
                      h("option", { key: "update", value: "update" }, "Update")
                    ]
                  ),
                  h(
                    "button",
                    {
                      key: "submit",
                      type: "submit",
                      className: "btn btn-smart-primary"
                    },
                    "Publish Notification"
                  )
                ]
              )
            ])
          : null
      ])
    ])
  ]);
};

export default NotificationsPage;
