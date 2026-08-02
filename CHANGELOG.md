# Changelog

All notable changes to the **SENTINEL_OS** project will be documented in this file.

## [1.2.0] - 2026-08-02

### Added
* **Interactive WHOIS Registry Viewer**: Modal popup showing domain creation date, country, and registrar info.
* **QR Code Payload Scanner**: Inspect decoded session-stealer links embedded inside Telegram/Discord QR logins.
* **Inspection Guide Modal**: Built-in 4-step phishing detection checklist (`❓ GUIDE`).
* **CERT Scam Reporter**: One-click threat reporting (`🚨 REPORT SCAM`).

### Changed
* Overhauled dashboard UI to a clean, full-width layout inspired by Vercel/Linear.
* Completely removed legacy EXP counters and arbitrary health bar mechanics.

## [1.1.0] - 2026-07-31

### Added
* **SSL Certificate Viewer Modal**: Clickable lock icon to inspect certificate details.
* **Email Notification Inspector**: Preview incoming email headers and sender addresses.
* **URL Scan Inspector**: Interactive color-coded URL domain syntax parser.
* **Copy Analysis Report**: Export final threat report summary to clipboard.
* **PWA Web Manifest**: Integrated `manifest.json` for web app installation.