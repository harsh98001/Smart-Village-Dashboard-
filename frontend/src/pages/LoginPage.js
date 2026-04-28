import React from "react";
import { h } from "../utils/h";
import PageBanner from "../components/layout/PageBanner";
import AuthPanel from "../components/ui/AuthPanel";

const LoginPage = () =>
  h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Secure entry", "Role-based access"] }),
    h("section", { key: "body", className: "auth-page-section" }, [
      h("div", { key: "container", className: "container auth-page-grid" }, [h(AuthPanel, { key: "panel", mode: "login" })])
    ])
  ]);

export default LoginPage;

