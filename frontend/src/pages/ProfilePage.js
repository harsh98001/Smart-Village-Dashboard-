import React from "react";
import { h } from "../utils/h";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import PageBanner from "../components/layout/PageBanner";
import StatCard from "../components/ui/StatCard";
import { formatDate } from "../utils/formatters";
import { getCctvSummary } from "../utils/villageMetrics";

const ProfilePage = () => {
  const { user, isAdmin } = useAuth();
  const { overview, villages } = useData();
  const cctvSummary = getCctvSummary(villages.slice(0, 12));

  return h("div", null, [
    h(PageBanner, { key: "banner", chips: ["Account", "Role", "Access summary"] }),
    h("section", { key: "body", className: "profile-page-section" }, [
      h("div", { key: "container", className: "container profile-layout-grid" }, [
        h("div", { key: "card", className: "premium-card profile-card" }, [
          h("span", { key: "eyebrow", className: "section-eyebrow" }, "User profile"),
          h("h2", { key: "name", className: "section-heading" }, user?.name || "Guest User"),
          h("p", { key: "email", className: "section-description" }, user?.email || "Not logged in"),
          h("div", { key: "chips", className: "page-banner-chips" }, [
            h("span", { key: "role", className: "page-chip" }, isAdmin ? "Administrator" : "Normal User"),
            h("span", { key: "designation", className: "page-chip" }, user?.designation || "Community Observer"),
            h("span", { key: "state", className: "page-chip" }, user?.state || "India")
          ]),
          user?.createdAt
            ? h("p", { key: "created", className: "small-label" }, `Joined ${formatDate(user.createdAt)}`)
            : null,
          h("div", { key: "actions", className: "profile-bullet-list" }, [
            h("div", { key: "a1", className: "profile-bullet" }, isAdmin ? "You can publish alerts, manage villages, and update dashboard intelligence." : "You can explore village analytics, live AQI, and admin-posted updates."),
            h("div", { key: "a2", className: "profile-bullet" }, "Profile blocks are easy to edit from frontend/src/pages/ProfilePage.js."),
            h("div", { key: "a3", className: "profile-bullet" }, "The image slot on this page is ready for your custom visual.")
          ])
        ]),
        h("div", { key: "visual", className: "premium-card profile-visual-card" }, [
          h("div", { key: "image", className: "profile-image-slot public-image-frame" }, [
            h("img", {
              key: "visual",
              src: "/images/profile/user-profile-visual.jpg",
              alt: "Profile dashboard visual",
              className: "public-image",
              onError: (event) => {
                event.currentTarget.parentElement?.classList.add("is-missing");
              }
            }),
            h(
              "span",
              { key: "note", className: "media-fallback" },
              "Add /images/profile/user-profile-visual.jpg"
            )
          ])
        ]),
        h("div", { key: "stats", className: "stats-grid compact-grid" }, [
          h(StatCard, {
            key: "villages",
            icon: "🏘️",
            title: "Village coverage",
            value: overview.totalVillages,
            description: "Accessible village records inside the platform.",
            formatter: (value) => value,
            tone: "sky"
          }),
          h(StatCard, {
            key: "growth",
            icon: "📈",
            title: "Growth average",
            value: overview.averageGrowth,
            description: "Shared platform growth signal.",
            formatter: (value) => `${value}%`,
            tone: "orange"
          }),
          h(StatCard, {
            key: "literacy",
            icon: "📚",
            title: "Literacy average",
            value: overview.averageLiteracy,
            description: "A quick human development benchmark.",
            formatter: (value) => `${value}%`,
            tone: "green"
          }),
          h(StatCard, {
            key: "cctv",
            icon: "📹",
            title: "CCTV live feeds",
            value: cctvSummary.live,
            description: "Live running camera feeds across the monitored sample.",
            formatter: (value) => value,
            tone: "maroon"
          })
        ])
      ])
    ])
  ]);
};

export default ProfilePage;
