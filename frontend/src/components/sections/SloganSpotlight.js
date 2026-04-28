import React from "react";
import { h } from "../../utils/h";
import SectionTitle from "../ui/SectionTitle";

const slogans = [
  "Smarter villages begin with visible data, trusted services, and local action.",
  "Growth looks stronger when agriculture, roads, energy, CCTV, and AQI live in one dashboard.",
  "A premium governance platform should tell a story, not just show a list of cards."
];

const SloganSpotlight = () =>
  h("section", { className: "landing-slogan-section" }, [
    h("div", { key: "container", className: "container" }, [
      h("div", { key: "card", className: "slogan-spotlight-card premium-card" }, [
        h("div", { key: "copy", className: "slogan-spotlight-copy" }, [
          h(SectionTitle, {
            key: "title",
            eyebrow: "Vision Block",
            title: "Smart villages grow best when the dashboard speaks like a mission, not a spreadsheet",
            description:
              "This break section is placed after the first six village cards to improve flow and make the landing page feel more curated."
          }),
          h(
            "div",
            {
              key: "list",
              className: "slogan-pill-grid"
            },
            slogans.map((slogan) => h("div", { key: slogan, className: "slogan-pill" }, slogan))
          )
        ]),
        h("div", { key: "image", className: "slogan-image-slot public-image-frame" }, [
          h("img", {
            key: "visual",
            src: "public/images/cartoon.png",
            alt: "Smart village slogan visual",
            className: "public-image",
            onError: (event) => {
              event.currentTarget.parentElement?.classList.add("is-missing");
            }
          }),
          h(
            "span",
            { key: "note", className: "media-fallback" },
            "Add /images/landing/smart-slogan.jpg"
          )
        ])
      ])
    ])
  ]);

export default SloganSpotlight;
