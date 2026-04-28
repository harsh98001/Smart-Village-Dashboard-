import React from "react";
import { h } from "../utils/h";
import PageBanner from "../components/layout/PageBanner";
import AuthPanel from "../components/ui/AuthPanel";

const SignupPage = () =>
  h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Admin", "User", "First access"] }),
    h("section", { key: "body", className: "auth-page-section" }, [
      h("div", { key: "container", className: "container auth-page-grid" }, [h(AuthPanel, { key: "panel", mode: "signup" })])
    ])
  ]);

export default SignupPage;
