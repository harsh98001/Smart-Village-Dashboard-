import React from "react";
import PageBanner from "../components/layout/PageBanner";
import AuthPanel from "../components/ui/AuthPanel";

const SignupPage = () =>
  <div>
  <PageBanner key="banner" chips={["Admin", "User", "First access"]} />
  <section key="body" className="auth-page-section">
    <div key="container" className="container auth-page-grid">
      <AuthPanel key="panel" mode="signup" />
    </div>
  </section>
</div>;

export default SignupPage;
