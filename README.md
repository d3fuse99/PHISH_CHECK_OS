# 🛡️ SENTINEL_OS (Phish Check OS)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active_v1.2.0-brightgreen?style=for-the-badge)

## 📌 About The Project

**SENTINEL_OS** is a modern, interactive web-based cybersecurity simulator designed to train users in identifying web threats, phishing attacks, and domain spoofing.

Users operate inside a simulated browser environment to inspect target URLs, SSL certificates, WHOIS registry data, email notification headers, and QR code payloads.

---

## 🛠️ Key Features

* 💻 **Modern Dashboard**: Fullscreen clean layout inspired by modern developer tools (Vercel, Linear, GitHub).
* 🔒 **SSL Certificate Viewer**: Click the lock icon to inspect certificate issuer, validity, and SHA-256 fingerprints.
* 🔍 **WHOIS Registry Modal**: Detailed domain registration data including registrar, creation dates, country, and privacy shield status.
* 📱 **QR Code Payload Inspector**: Click QR codes on Telegram/Discord logins to reveal hidden decoded URLs.
* 📩 **Email Notification Viewer**: Inspect incoming notification headers (`From:`, `Subject:`, `Body`) to detect spoofed senders.
* 🔍 **URL Structure Parser**: Interactive `URL SCAN` tool that color-codes protocol, subdomains, main domain, and path.
* ❓ **Inspection Guide**: Built-in 4-step checklist for spotting phishing indicators.
* 🚨 **CERT Threat Reporter**: Submit detected scam URLs to a simulated global blocklist.
* ⌨️ **Keyboard Shortcuts & Utilities**: Hotkeys (`1` Legit, `2` Phish, `Enter` Next), address bar URL copy tool, and PWA manifest.
* 📊 **Analytical Feedback**: Overall accuracy counter, log filters (`ALL`, `PASSED`, `FAILED`), and copyable threat report summary.
* 🌍 **Localization**: Full dual-language support (**English / Russian**).

---

## 🚀 How to Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/d3fuse99/PHISH_CHECK_OS.git
   ```
2. Open `index.html` in any modern web browser.
3. Choose an operation difficulty and start inspecting targets!

---

*Developed as a portfolio project showcasing modern frontend development, dynamic content handling, and cybersecurity basics.*