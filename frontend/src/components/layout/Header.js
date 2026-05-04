import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
      return <div key={item.label} className={`smart-dropdown ${dropdownOpen ? "show" : ""}`} onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
  <button key="toggle" type="button" className="nav-link smart-nav-link dropdown-toggle smart-dropdown-toggle" onClick={() => setDropdownOpen((currentState) => !currentState)}>
    {item.label}
  </button>
  <div key="menu" className={`smart-dropdown-menu ${dropdownOpen ? "show" : ""}`}>
    {exploreLinks.map((link) =>
                  <NavLink key={link.to} to={link.to} className="smart-dropdown-item" onClick={() => {
                        setMenuOpen(false);
                        setDropdownOpen(false);
                      }}>
      {link.label}
    </NavLink>
                )}
  </div>
</div>;
    }

    return <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={() => setMenuOpen(false)}>
  {item.label}
</NavLink>;
  };

  return <header className="site-header">
  <div key="container" className="container">
    <nav key="nav" className="navbar smart-navbar">
      <div key="top" className="smart-navbar-top">
        <Link key="brand" to="/" className="smart-brand">
          <div key="placeholder" className="logo-placeholder">
            <img key="image" src={logoPath} alt="Smart Village Dashboard logo" className="brand-logo" onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }} />
          </div>
          <div key="copy" className="brand-copy">
            <strong key="title">Smart Village Dashboard</strong>
            <span key="subtitle">Rural Governance Intelligence</span>
          </div>
        </Link>
        <div key="topActions" className="smart-navbar-top-actions">
          {user
                        ? <button key="logout-floating" type="button" className="btn header-logout-button" onClick={logoutUser}>Logout</button>
                        : null}
          <button key="toggle" type="button" className="navbar-toggler smart-navbar-toggler" onClick={() => setMenuOpen((currentState) => !currentState)}>☰</button>
        </div>
      </div>
      <div key="menu" className={`smart-navbar-menu ${menuOpen ? "open" : ""}`}>
        <div key="links" className="smart-nav-links">
          {primaryNavLinks.map(renderPrimaryItem)}
        </div>
        <div key="actions" className="smart-nav-actions">
          <NavLink key="dashboard" to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink key="search" to="/search" className={navLinkClass} onClick={() => setMenuOpen(false)}>Search</NavLink>
          <button key="theme" type="button" className="theme-toggle-button" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user
                            ? <div key="user" className="user-badge-group">
            <NavLink key="profile" to="/profile" className="user-profile-link" onClick={() => setMenuOpen(false)}>
              <span key="name" className="user-name">
                {user.name}
              </span>
              <span key="role" className="user-role">
                {isAdmin ? "Admin" : "User"}
              </span>
            </NavLink>
            <button key="logout-mobile" type="button" className="btn header-logout-button-mobile" onClick={logoutUser}>Logout</button>
          </div>
                            : <button key="login" type="button" className="btn btn-smart-primary" onClick={() => openAuth("login")}>Login</button>}
        </div>
      </div>
    </nav>
  </div>
</header>;
};

export default Header;
