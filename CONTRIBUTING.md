# Contributing to SENTINEL_OS

Thank you for your interest in contributing to **SENTINEL_OS**! 

## How to Contribute

### 1. Adding New Phishing Scenarios & Brands
You can contribute new brands or phishing scenarios by submitting a pull request modifying `data.js`:
* Add brand metadata (Name, official domain, alternate domain, brand color, registrar, SSL issuer, country, creation date).
* Add realistic full-width layout templates (e.g. Google Drive, Instagram, PayPal, Amazon, Netflix, Spotify).
* Provide valid sender email addresses (`senderEmailSafe` / `senderEmailPhish`) and message bodies for the email preview inspector.
* Provide QR code payload URLs (`qrPayloadSafe` / `qrPayloadPhish`) for QR login inspections.
* Ensure scenarios include clear explanations in both English (`errEn`) and Russian (`errRu`).

### 2. UI/UX Improvements
* Ensure all CSS rules adhere to the dark theme palette defined in `style.css`.
* Do not import heavy external JavaScript libraries. Keep the project lightweight, responsive, and offline-first.

### 3. Submitting Pull Requests
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-brand-scenario`).
3. Commit your changes with clear messages.
4. Push to your branch and open a Pull Request.

Thank you for helping train users in identifying digital threats!