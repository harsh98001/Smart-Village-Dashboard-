import React, { useState } from "react";
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

  return <div>
  <PageBanner key="banner" chips={["Alerts", "Broadcasts", "Toasts"]} />
  <section key="body" className="notifications-page-section">
    <div key="container" className="container dashboard-split-grid">
      <div key="feed" className="premium-card notification-feed-card">
        <h3 key="title">Live updates and alerts</h3>
        <div key="list" className="notification-feed">
          {notifications.map((notification) =>
                        <article key={notification._id} className="notification-card-item">
            <div key="header" className="notification-card-top">
              <span key="type" className={`pill-badge ${notification.type}`}>
                {notification.type}
              </span>
              <span key="date" className="small-label">
                {formatDate(notification.createdAt)}
              </span>
            </div>
            <strong key="title">
              {notification.title}
            </strong>
            <p key="message">
              {notification.message}
            </p>
            {isAdmin
                              ? <button key="delete" type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteNotification(notification._id)}>Delete</button>
                              : null}
          </article>
                      )}
        </div>
      </div>
      {isAdmin
                ? <div key="form" className="premium-card notification-form-card">
        <h3 key="title">Admin broadcast panel</h3>
        <form key="formContent" className="admin-form-grid" onSubmit={submitNotification}>
          <input key="title" className="form-control" placeholder="Notification title" value={formState.title} onChange={(event) =>
                                setFormState({ ...formState, title: event.target.value })} />
          <textarea key="message" className="form-control" placeholder="Broadcast message" rows={5} value={formState.message} onChange={(event) =>
                                setFormState({ ...formState, message: event.target.value })} />
          <select key="type" className="form-select" value={formState.type} onChange={(event) =>
                                  setFormState({ ...formState, type: event.target.value })}>
            <option key="broadcast" value="broadcast">Broadcast</option>
            <option key="alert" value="alert">Alert</option>
            <option key="update" value="update">Update</option>
          </select>
          <button key="submit" type="submit" className="btn btn-smart-primary">Publish Notification</button>
        </form>
      </div>
                : null}
    </div>
  </section>
</div>;
};

export default NotificationsPage;
