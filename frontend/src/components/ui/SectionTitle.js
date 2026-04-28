import React from "react";
import { h } from "../../utils/h";

const SectionTitle = ({ eyebrow, title, description, align = "start" }) =>
  h("div", { className: `section-title text-${align}` }, [
    eyebrow
      ? h(
          "span",
          {
            key: "eyebrow",
            className: "section-eyebrow"
          },
          eyebrow
        )
      : null,
    h(
      "h2",
      {
        key: "title",
        className: "section-heading"
      },
      title
    ),
    description
      ? h(
          "p",
          {
            key: "description",
            className: "section-description"
          },
          description
        )
      : null
  ]);

export default SectionTitle;

