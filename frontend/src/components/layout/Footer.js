import React from "react";
import { Link } from "react-router-dom";
const Footer = () =>
  <footer className="site-footer">
  <div key="container" className="container">
    <div key="grid" className="footer-grid">
      <div key="about" className="footer-card">
        <h3 key="title">About</h3>
        <p key="text">Smart Village Dashboard a  platform for analytics, public service visibility, and rural growth coordination.</p>
      </div>
      <div key="links" className="footer-card">
        <h3 key="title">Quick Links</h3>
        <Link key="dashboard" to="/dashboard">Dashboard</Link>
        <Link key="reports" to="/reports">Reports</Link>
        <Link key="notifications" to="/notifications">Notifications</Link>
      </div>
      <div key="contact" className="footer-card">
        <h3 key="title">Contact</h3>
        <span key="mail">Harsh832019@gamil.com</span>
        <span key="phone">+91 9693967173</span>
        <span key="location">National Rural Governance Cell, India</span>
      </div>
    </div>
    <div key="copyright" className="footer-bottom">© 2026 Smart Village Dashboard. All rights reserved.</div>
  </div>
</footer>;

export default Footer;
