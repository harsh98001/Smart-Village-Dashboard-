import React from "react";
import { h } from "../../utils/h";
import usePageMeta from "../../hooks/usePageMeta";

const PageBanner = ({ chips = [] }) => {
  const meta = usePageMeta();

  return h("section", { className: "page-banner" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "inner", className: "page-banner-inner" }, [
        h("span", { key: "eyebrow", className: "section-eyebrow" }, meta.eyebrow),
        h("h1", { key: "title", className: "page-banner-title" }, meta.title),
        h("p", { key: "description", className: "page-banner-description" }, meta.description),
        chips.length
          ? h(
              "div",
              {
                key: "chips",
                className: "page-banner-chips"
              },
              chips.map((chip) => h("span", { key: chip, className: "page-chip" }, chip))
            )
          : null
      ])
    ])
  ]);
};

export default PageBanner;

