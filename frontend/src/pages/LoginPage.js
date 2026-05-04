import React from "react";
import PageBanner from "../components/layout/PageBanner";
import AuthPanel from "../components/ui/AuthPanel";

const LoginPage = () =>
  <div>
  <PageBanner key="banner" chips={["Secure entry", "Role-based access"]} />
  <section key="body" className="auth-page-section">
    <div key="container" className="container auth-page-grid">
      <AuthPanel key="panel" mode="login" />
    </div>
  </section>
</div>;

export default LoginPage;

