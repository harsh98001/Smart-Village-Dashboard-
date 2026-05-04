import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const initialSignupState = {
  name: "",
  email: "",
  password: "",
  role: "user",
  state: "",
  designation: ""
};

const AuthPanel = ({ mode = "login", compact = false, onSuccess, onSwitch }) => {
  const navigate = useNavigate();
  const { loginUser, signupUser, loading } = useAuth();
  const { pushToast } = useToast();
  const [loginForm, setLoginForm] = useState({
    email: mode === "login" ? "admin@smartvillage.in" : "",
    password: mode === "login" ? "Admin@123" : ""
  });
  const [signupForm, setSignupForm] = useState(initialSignupState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response =
      mode === "login" ? await loginUser(loginForm) : await signupUser(signupForm);

    if (!response.success) {
      pushToast({
        title: "Authentication error",
        message: response.message,
        variant: "danger"
      });
      return;
    }

    pushToast({
      title: mode === "login" ? "Welcome back" : "Account created",
      message:
        mode === "login"
          ? "You are now inside the Smart Village Dashboard."
          : "Your Smart Village access has been activated.",
      variant: "success"
    });

    if (onSuccess) {
      onSuccess(response.data);
    }

    navigate("/");
  };

  const isLogin = mode === "login";

  return <div className={compact ? "auth-panel compact" : "auth-panel"}>
  <div key="header" className="auth-panel-header">
    <span key="eyebrow" className="section-eyebrow">Secure access</span>
    <h2 key="title" className="section-heading">
      {isLogin ? "Enter the governance dashboard" : "Create your dashboard account"}
    </h2>
    <p key="description" className="section-description">
      {isLogin
                  ? "Use the seeded admin account to test CRUD, broadcasts, and analytics flows."
                  : "Choose the right access role and continue to the landing experience."}
    </p>
  </div>
  <form key="form" className="auth-form" onSubmit={handleSubmit}>
    {(
              isLogin
              ? [
                  <input key="email" className="form-control" type="email" placeholder="Email address" value={loginForm.email} onChange={(event) =>
                      setLoginForm({ ...loginForm, email: event.target.value })} />,
                  <input key="password" className="form-control" type="password" placeholder="Password" value={loginForm.password} onChange={(event) =>
                      setLoginForm({ ...loginForm, password: event.target.value })} />,
                  <div key="hint" className="auth-hint">Demo admin: admin@smartvillage.in / Admin@123</div>
                ]
              : [
                  <input key="name" className="form-control" type="text" placeholder="Full name" value={signupForm.name} onChange={(event) =>
                      setSignupForm({ ...signupForm, name: event.target.value })} />,
                  <input key="email" className="form-control" type="email" placeholder="Email address" value={signupForm.email} onChange={(event) =>
                      setSignupForm({ ...signupForm, email: event.target.value })} />,
                  <input key="password" className="form-control" type="password" placeholder="Password" value={signupForm.password} onChange={(event) =>
                      setSignupForm({ ...signupForm, password: event.target.value })} />,
                  <div key="row" className="auth-form-row">
      <select key="role" className="form-select" value={signupForm.role} onChange={(event) =>
                              setSignupForm({ ...signupForm, role: event.target.value })}>
        <option key="user" value="user">Normal User</option>
        <option key="admin" value="admin">Admin</option>
      </select>
      <input key="state" className="form-control" type="text" placeholder="State" value={signupForm.state} onChange={(event) =>
                            setSignupForm({ ...signupForm, state: event.target.value })} />
    </div>,
                  <input key="designation" className="form-control" type="text" placeholder="Designation" value={signupForm.designation} onChange={(event) =>
                      setSignupForm({ ...signupForm, designation: event.target.value })} />
                ]
            ).concat([
              <button key="submit" type="submit" className="btn btn-smart-primary auth-submit" disabled={loading}>
      {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Login to Platform"
                      : "Create Account"}
    </button>
            ])}
  </form>
  <div key="footer" className="auth-panel-footer">
    {isLogin
              ? <span key="message">
      Need an account? 
      {onSwitch
                        ? <button key="switch" type="button" className="inline-link-button" onClick={() => onSwitch("signup")}>Signup here</button>
                        : <Link key="link" to="/signup">Signup here</Link>}
    </span>
              : <span key="message">
      Already registered? 
      {onSwitch
                        ? <button key="switch" type="button" className="inline-link-button" onClick={() => onSwitch("login")}>Login here</button>
                        : <Link key="link" to="/login">Login here</Link>}
    </span>}
  </div>
</div>;
};

export default AuthPanel;
