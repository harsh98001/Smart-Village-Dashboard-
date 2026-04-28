import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { h } from "../../utils/h";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { primaryNavLinks, exploreLinks } from "../../data/navConfig";

const logoPath = "/images/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, openAuth, logoutUser, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link smart-nav-link active" : "nav-link smart-nav-link";

  const renderPrimaryItem = (item) => {
    if (item.type === "dropdown") {
      return h(
        "div",
        {
          key: item.label,
          className: `smart-dropdown ${dropdownOpen ? "show" : ""}`,
          onMouseEnter: () => setDropdownOpen(true),
          onMouseLeave: () => setDropdownOpen(false)
        },
        [
          h(
            "button",
            {
              key: "toggle",
              type: "button",
              className: "nav-link smart-nav-link dropdown-toggle smart-dropdown-toggle",
              onClick: () => setDropdownOpen((currentState) => !currentState)
            },
            item.label
          ),
          h(
            "div",
            {
              key: "menu",
              className: `smart-dropdown-menu ${dropdownOpen ? "show" : ""}`
            },
            exploreLinks.map((link) =>
              h(
                NavLink,
                {
                  key: link.to,
                  to: link.to,
                  className: "smart-dropdown-item",
                  onClick: () => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }
                },
                link.label
              )
            )
          )
        ]
      );
    }

    return h(
      NavLink,
      {
        key: item.to,
        to: item.to,
        className: navLinkClass,
        onClick: () => setMenuOpen(false)
      },
      item.label
    );
  };

  return h("header", { className: "site-header" }, [
    h("div", { key: "container", className: "container" }, [
      h("nav", { key: "nav", className: "navbar smart-navbar" }, [
        h("div", { key: "top", className: "smart-navbar-top" }, [
          h(
            Link,
            {
              key: "brand",
              to: "/",
              className: "smart-brand"
            },
            [
              h("div", { key: "placeholder", className: "logo-placeholder" }, [
                h("img", {
                  key: "image",
                  src: logoPath,
                  alt: "Smart Village Dashboard logo",
                  className: "brand-logo",
                  onError: (event) => {
                    event.currentTarget.style.display = "none";
                  }
                })
              ]),
              h("div", { key: "copy", className: "brand-copy" }, [
                h("strong", { key: "title" }, "Smart Village Dashboard"),
                h("span", { key: "subtitle" }, "Rural Governance Intelligence")
              ])
            ]
          ),
          h("div", { key: "topActions", className: "smart-navbar-top-actions" }, [
            user
              ? h(
                  "button",
                  {
                    key: "logout-floating",
                    type: "button",
                    className: "btn header-logout-button",
                    onClick: logoutUser
                  },
                  "Logout"
                )
              : null,
            h(
              "button",
              {
                key: "toggle",
                type: "button",
                className: "navbar-toggler smart-navbar-toggler",
                onClick: () => setMenuOpen((currentState) => !currentState)
              },
              "☰"
            )
          ])
        ]),
        h(
          "div",
          {
            key: "menu",
            className: `smart-navbar-menu ${menuOpen ? "open" : ""}`
          },
          [
            h(
              "div",
              {
                key: "links",
                className: "smart-nav-links"
              },
              primaryNavLinks.map(renderPrimaryItem)
            ),
            h(
              "div",
              {
                key: "actions",
                className: "smart-nav-actions"
              },
              [
                h(
                  NavLink,
                  {
                    key: "dashboard",
                    to: "/dashboard",
                    className: navLinkClass,
                    onClick: () => setMenuOpen(false)
                  },
                  "Dashboard"
                ),
                h(
                  NavLink,
                  {
                    key: "search",
                    to: "/search",
                    className: navLinkClass,
                    onClick: () => setMenuOpen(false)
                  },
                  "Search"
                ),
                h(
                  "button",
                  {
                    key: "theme",
                    type: "button",
                    className: "theme-toggle-button",
                    onClick: toggleTheme
                  },
                  theme === "light" ? "🌙" : "☀️"
                ),
                user
                  ? h("div", { key: "user", className: "user-badge-group" }, [
                      h(
                        NavLink,
                        {
                          key: "profile",
                          to: "/profile",
                          className: "user-profile-link",
                          onClick: () => setMenuOpen(false)
                        },
                        [
                          h("span", { key: "name", className: "user-name" }, user.name),
                          h(
                            "span",
                            { key: "role", className: "user-role" },
                            isAdmin ? "Admin" : "User"
                          )
                        ]
                      ),
                      h(
                        "button",
                        {
                          key: "logout-mobile",
                          type: "button",
                          className: "btn header-logout-button-mobile",
                          onClick: logoutUser
                        },
                        "Logout"
                      )
                    ])
                  : h(
                      "button",
                      {
                        key: "login",
                        type: "button",
                        className: "btn btn-smart-primary",
                        onClick: () => openAuth("login")
                      },
                      "Login"
                    )
              ]
            )
          ]
        )
      ])
    ])
  ]);
};

export default Header;
