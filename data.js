const i18n = {
    en: {
        title: "SENTINEL_OS",
        subtitle: "Interactive Cybersecurity Threat & Phishing Simulator",
        hero_badge: "SECURITY SIMULATOR",
        hero_title: "Identify Web Threats Before They Strike",
        select_level: "Select Operation Difficulty:",
        easy: "EASY", 
        medium: "MEDIUM", 
        hard: "DIFFICULT",
        easy_desc: "Unsecured HTTP connections, fake top-level domains, and obvious visual errors.",
        medium_desc: "Subdomain tricks, authentication spoofing, and Browser-in-the-Browser (BitB) popups.",
        hard_desc: "Typosquatting, character replacement, header manipulation, and content anomalies.",
        start_op: "START OPERATION",
        score: "CORRECT:",
        accuracy_label: "OVERALL ACCURACY",
        tools: "INSPECTOR TOOLS:",
        url_scan: "URL SCAN",
        whois: "WHOIS", ssl: "SSL", headers: "HEADERS",
        question: "Is this a phishing attempt?",
        btn_legit: "[1] LEGITIMATE", btn_phish: "[2] PHISHING",
        btn_next: "NEXT TARGET [ENTER]",
        btn_menu: "RETURN TO MENU",
        correct: "✔ ANALYSIS CORRECT", wrong: "✖ ANALYSIS INCORRECT",
        comp_title: "THREAT ANALYSIS REPORT",
        report_header: "SYSTEM BEHAVIORAL ANALYSIS",
        reset: "RESET PROGRESS",
        abort: "EXIT",
        ssl_cert_title: "🔒 Security Certificate Viewer"
    },
    ru: {
        title: "SENTINEL_OS",
        subtitle: "Интерактивный симулятор анализа киберугроз и фишинга",
        hero_badge: "СИМУЛЯТОР БЕЗОПАСНОСТИ",
        hero_title: "Распознавайте веб-угрозы до того, как они нанесут удар",
        select_level: "Выберите сложность операции:",
        easy: "ЛЕГКО", 
        medium: "СРЕДНИЙ", 
        hard: "СЛОЖНЫЙ",
        easy_desc: "Незащищенные HTTP-соединения, поддельные домены и базовые визуальные ошибки.",
        medium_desc: "Подмена поддоменов, манипуляции с авторизацией и Browser-in-the-Browser (BitB) атаки.",
        hard_desc: "Тайпосквоттинг, подмена символов, манипуляции с заголовками и аномалии в контенте.",
        start_op: "НАЧАТЬ ОПЕРАЦИЮ",
        score: "ВЕРНО:",
        accuracy_label: "ОБЩАЯ ТОЧНОСТЬ",
        tools: "ИНСТРУМЕНТЫ:",
        url_scan: "URL SCAN",
        whois: "WHOIS", ssl: "SSL", headers: "ЗАГОЛОВКИ",
        question: "Это фишинговая атака?",
        btn_legit: "[1] БЕЗОПАСНО", btn_phish: "[2] ФИШИНГ",
        btn_next: "СЛЕДУЮЩАЯ ЦЕЛЬ [ENTER]",
        btn_menu: "В МЕНЮ",
        correct: "✔ АНАЛИЗ ВЕРЕН", wrong: "✖ ОШИБКА АНАЛИЗА",
        comp_title: "ОТЧЕТ АНАЛИЗА УГРОЗ",
        report_header: "ПОВЕДЕНЧЕСКИЙ АНАЛИЗ СИСТЕМЫ",
        reset: "СБРОСИТЬ ПРОГРЕСС",
        abort: "ВЫЙТИ",
        ssl_cert_title: "🔒 Просмотр SSL-сертификата"
    }
};

const brands = [
    { name: "Steam", domain: "steampowered.com", altDomain: "steamcommunity.com", color: "#66c0f4", type: "steam", registrar: "Valve Corporation", sslIssuer: "DigiCert SHA2 High Assurance" },
    { name: "Telegram", domain: "telegram.org", altDomain: "t.me", color: "#24A1DE", type: "telegram", registrar: "MarkMonitor Inc.", sslIssuer: "DigiCert Global Root CA" },
    { name: "Discord", domain: "discord.com", altDomain: "discord.gg", color: "#5865F2", type: "discord", registrar: "Cloudflare, Inc.", sslIssuer: "Cloudflare Inc ECC CA-3" },
    { name: "DHL", domain: "dhl.com", altDomain: "dhl.de", color: "#FFCC00", type: "dhl", registrar: "Lexsynergy Limited", sslIssuer: "DigiCert Global CA" },
    { name: "Gmail", domain: "google.com", altDomain: "accounts.google.com", color: "#EA4335", type: "google", registrar: "MarkMonitor Inc.", sslIssuer: "GTS CA 1C3" },
    { name: "PayPal", domain: "paypal.com", altDomain: "paypal.me", color: "#0079C1", type: "paypal", registrar: "MarkMonitor Inc.", sslIssuer: "DigiCert SHA2 Extended" },
    { name: "Amazon", domain: "amazon.com", altDomain: "aws.amazon.com", color: "#FF9900", type: "amazon", registrar: "MarkMonitor Inc.", sslIssuer: "DigiCert Global Root CA" },
    { name: "Netflix", domain: "netflix.com", altDomain: "netflix.net", color: "#E50914", type: "netflix", registrar: "MarkMonitor Inc.", sslIssuer: "DigiCert Global CA" },
    { name: "Spotify", domain: "spotify.com", altDomain: "spotify.link", color: "#1DB954", type: "spotify", registrar: "MarkMonitor Inc.", sslIssuer: "DigiCert Global Root CA" },
    { name: "Google Drive", domain: "drive.google.com", altDomain: "docs.google.com", color: "#4285F4", type: "google_drive", registrar: "MarkMonitor Inc.", sslIssuer: "GTS CA 1C3" },
    { name: "Instagram", domain: "instagram.com", altDomain: "ig.me", color: "#E1306C", type: "instagram", registrar: "RegistrarSafe, LLC", sslIssuer: "DigiCert High Assurance" }
];

function getLayout(scenario, lang) {
    const brand = scenario.brand;
    let badgeHtml = scenario.hasFakeBadge ? `<div class="fake-ssl-badge">🔒 100% Verified SSL Secure Connection</div>` : "";
    let timerHtml = scenario.hasTimer ? `<div class="urgent-timer">⏱️ Session expires in: <span id="timer-count">04:59</span></div>` : "";
    
    let btnLoginText = scenario.hasVisualDefect ? (lang === 'en' ? 'Sgn In Now' : 'Ввойти в систему') : (lang === 'en' ? 'Sign In' : 'Войти');

    if (scenario.isBitb) {
        return `
            <div class="bitb-wrapper">
                <div class="bitb-window">
                    <div class="bitb-header">
                        <span class="bitb-title">Sign in with ${brand.name}</span>
                        <span class="bitb-fake-url">🔒 https://${brand.domain}/oauth/authorize</span>
                    </div>
                    <div class="bitb-body">
                        ${badgeHtml}
                        <h3 style="color:${brand.color}; margin-bottom:15px;">${brand.name} OAuth</h3>
                        <input type="text" class="fs-input" placeholder="Username / Email">
                        <input type="password" class="fs-input" placeholder="Password">
                        <button class="fs-btn" style="background:${brand.color}">${btnLoginText}</button>
                    </div>
                </div>
            </div>`;
    }

    if (brand.type === "google_drive") {
        return `
            <div class="drive-page">
                <div class="drive-card">
                    <div style="font-size:2.2rem; margin-bottom:10px;">📁</div>
                    <h3 style="margin-bottom:10px;">${lang==='en'?'Document Access Request':'Запрос доступа к документу'}</h3>
                    <p style="color:#5f6368; font-size:0.85rem; margin-bottom:15px;">Confidential_Financial_Report_2026.pdf</p>
                    ${timerHtml}
                    ${badgeHtml}
                    <input type="text" class="fs-input" placeholder="Google Email" style="background:#fff; color:#000; border-color:#dadce0;">
                    <input type="password" class="fs-input" placeholder="Password" style="background:#fff; color:#000; border-color:#dadce0;">
                    <button class="fs-btn" style="background:#1a73e8; color:#fff;">${btnLoginText}</button>
                </div>
            </div>`;
    }

    if (brand.type === "instagram") {
        return `
            <div class="ig-page">
                <div class="ig-card">
                    <div class="fs-logo" style="color:#E1306C; font-style:italic;">Instagram</div>
                    <p style="color:#ed4956; font-weight:bold; font-size:0.85rem; margin-bottom:12px;">⚠️ Copyright Violation Warning</p>
                    ${timerHtml}
                    ${badgeHtml}
                    <p style="color:#8e8e8e; font-size:0.8rem; margin-bottom:15px;">Verify ownership within 24 hours to prevent account deletion.</p>
                    <input type="text" class="fs-input" placeholder="Phone number, username, or email" style="background:#121212; border-color:#363636;">
                    <input type="password" class="fs-input" placeholder="Password" style="background:#121212; border-color:#363636;">
                    <button class="fs-btn" style="background:#0095f6;">${btnLoginText}</button>
                </div>
            </div>`;
    }

    if (brand.type === "netflix") {
        return `
            <div class="fs-body" style="background:#000;">
                <div class="fs-box" style="background:#141414; border-color:#333;">
                    <div class="fs-logo" style="color:#E50914; font-size:2.2rem; font-weight:900;">NETFLIX</div>
                    ${timerHtml}
                    ${badgeHtml}
                    <p style="color:#aaa; font-size:0.85rem; margin-bottom:15px;">${lang==='en'?'Update your billing details to maintain subscription.':'Обновите платежные данные для продления подписки.'}</p>
                    <input type="text" class="fs-input" placeholder="Email or Phone Number">
                    <input type="password" class="fs-input" placeholder="Password">
                    <button class="fs-btn" style="background:#E50914;">${btnLoginText}</button>
                </div>
            </div>`;
    }

    if (brand.type === "spotify") {
        return `
            <div class="fs-body" style="background:#121212;">
                <div class="fs-box" style="background:#000; border-color:#282828;">
                    <div class="fs-logo" style="color:#1DB954;">Spotify</div>
                    ${timerHtml}
                    ${badgeHtml}
                    <p style="color:#b3b3b3; font-size:0.85rem; margin-bottom:15px;">${lang==='en'?'Confirm account details for Spotify Premium.':'Подтвердите аккаунт для Spotify Premium.'}</p>
                    <input type="text" class="fs-input" placeholder="Email address or username">
                    <input type="password" class="fs-input" placeholder="Password">
                    <button class="fs-btn" style="background:#1DB954; color:#000;">${btnLoginText}</button>
                </div>
            </div>`;
    }

    if (brand.type === "paypal") {
        return `
            <div class="paypal-page">
                <div class="paypal-card">
                    <div class="paypal-logo">PayPal</div>
                    ${timerHtml}
                    ${badgeHtml}
                    <h3 style="margin-bottom:10px;">${lang==='en'?'Authorize Payment':'Подтвердите платеж'}</h3>
                    <p style="color:#666; font-size:0.85rem; margin-bottom:15px;">Merchant: Gaming Service Inc. ($149.99)</p>
                    <input type="text" class="fs-input" placeholder="Email / Mobile Number" style="background:#fff; color:#000; border-color:#ccc;">
                    <input type="password" class="fs-input" placeholder="Password" style="background:#fff; color:#000; border-color:#ccc;">
                    <button class="fs-btn" style="background:#0079C1; color:#fff;">${btnLoginText}</button>
                </div>
            </div>`;
    }

    if (brand.type === "amazon") {
        return `
            <div class="amazon-page">
                <div class="amazon-header">amazon</div>
                <div class="amazon-body">
                    <div class="amazon-card">
                        <h3>${lang==='en'?'Verify Shipping Address':'Подтвердите адрес доставки'}</h3>
                        <p style="font-size:0.85rem; color:#555; margin:10px 0;">Order #408-291039-102931 requires verification.</p>
                        ${timerHtml}
                        ${badgeHtml}
                        <input type="text" class="fs-input" placeholder="Email or mobile phone number" style="background:#fff; color:#000; border-color:#888;">
                        <input type="password" class="fs-input" placeholder="Amazon Password" style="background:#fff; color:#000; border-color:#888;">
                        <button class="fs-btn" style="background:#FF9900; color:#000;">${btnLoginText}</button>
                    </div>
                </div>
            </div>`;
    }

    if (brand.type === "steam") {
        return `
            <div class="steam-page">
                <div class="steam-header">
                    <div class="steam-logo-text">STEAM</div>
                    <div class="steam-nav-links">
                        <span>${lang==='en'?'STORE':'МАГАЗИН'}</span>
                        <span>${lang==='en'?'COMMUNITY':'СООБЩЕСТВО'}</span>
                        <span>${lang==='en'?'ABOUT':'О STEAM'}</span>
                        <span>${lang==='en'?'SUPPORT':'ПОДДЕРЖКА'}</span>
                    </div>
                </div>
                <div class="steam-body">
                    ${timerHtml}
                    ${badgeHtml}
                    <div class="steam-login-card">
                        <h2>${lang==='en'?'SIGN IN':'ВХОД'}</h2>
                        <label>${lang==='en'?'SIGN IN WITH ACCOUNT NAME':'ВОЙДИТЕ, ИСПОЛЬЗУЯ ИМЯ АККАУНТА'}</label>
                        <input type="text" class="fs-input" placeholder="">
                        <label>${lang==='en'?'PASSWORD':'ПАРОЛЬ'}</label>
                        <input type="password" class="fs-input" placeholder="">
                        <button class="fs-btn" style="background:#2172a1; color:#fff;">${btnLoginText}</button>
                    </div>
                </div>
                <div class="steam-footer">© Valve Corporation. All rights reserved. All trademarks are property of their respective owners.</div>
            </div>`;
    }

    if (brand.type === "telegram") {
        return `
            <div class="tg-page">
                <div class="tg-box">
                    <div class="tg-qr-side">
                        <div class="fake-qr"></div>
                        <p>${lang==='en'?'Quick QR Login':'Быстрый вход по QR'}</p>
                    </div>
                    <div class="tg-form-side">
                        <h2 style="color:#24A1DE">Telegram Web</h2>
                        <p style="color:#8b949e; font-size:0.85rem;">${lang==='en'?'Please confirm your phone number':'Подтвердите номер телефона'}</p>
                        ${badgeHtml}
                        <input type="text" class="fs-input" placeholder="+1 234 567 890">
                        <button class="fs-btn" style="background:#24A1DE">${btnLoginText}</button>
                    </div>
                </div>
            </div>`;
    }

    if (brand.type === "dhl") {
        return `
            <div class="dhl-page">
                <div class="dhl-header">DHL EXPRESS</div>
                <div class="dhl-body">
                    <div class="dhl-card">
                        <h3>${lang==='en'?'Shipment Tracking #590023':'Отслеживание груза #590023'}</h3>
                        ${timerHtml}
                        <div class="dhl-status-bar">
                            <span class="step active">✔ Dispatch</span>
                            <span class="step active">✔ Transit</span>
                            <span class="step hold">⚠️ Hold (Action Needed)</span>
                        </div>
                        <p style="margin:15px 0; color:#444;">${lang==='en'?'Address verification required to deliver package.':'Требуется подтверждение адреса для доставки.'}</p>
                        ${badgeHtml}
                        <input type="text" class="fs-input" placeholder="Full Name">
                        <input type="text" class="fs-input" placeholder="Street Address">
                        <button class="fs-btn" style="background:#FFCC00; color:#000;">${lang==='en'?'Confirm Details':'Подтвердить данные'}</button>
                    </div>
                </div>
            </div>`;
    }

    return `
        <div class="fs-nav"><span>${brand.name}</span><span>☰</span></div>
        <div class="fs-body">
            <div class="fs-box">
                ${timerHtml}
                ${badgeHtml}
                <div class="fs-logo" style="color:${brand.color}">${brand.name}</div>
                <input type="text" class="fs-input" placeholder="Login / Email">
                <input type="password" class="fs-input" placeholder="Password">
                <button class="fs-btn" style="background:${brand.color}">${btnLoginText}</button>
            </div>
        </div>`;
}

function seededRandom(seed) { 
    let x = Math.sin(seed) * 10000; 
    return x - Math.floor(x); 
}

function buildScenarios() {
    let db = { easy: [], medium: [], hard: [] };
    
    const hooksEn = [
        "Email: Confirm account details immediately.",
        "Message: Steam trade request pending approval.",
        "SMS: DHL package held at customs due to unpaid fee.",
        "Security Alert: Login attempt from unauthorized browser.",
        "Promo: Claim free Nitro subscription before timer expires!"
    ];

    const hooksRu = [
        "Тема письма: Подтвердите данные аккаунта немедленно.",
        "Сообщение: Входящий обмен Steam ожидает подтверждения.",
        "СМС: Посылка DHL задержана на таможне.",
        "Алерт: Попытка входа из неопознанного браузера.",
        "Акция: Заберите бесплатный Nitro до конца таймера!"
    ];

    const emailsEn = [
        "Dear User, your account security status requires immediate verification to avoid disruption.",
        "An unauthorized login attempt was blocked from IP 185.220.101.5. Verify your session immediately.",
        "Your shipment delivery is currently on hold. Address confirmation is required to complete delivery.",
        "You have received an exclusive promotional reward. Please authorize your credentials to claim."
    ];

    const emailsRu = [
        "Уважаемый пользователь, статус безопасности вашего аккаунта требует немедленного подтверждения.",
        "Попытка несанкционированного входа была заблокирована с IP 185.220.101.5. Подтвердите сессию.",
        "Доставка вашей посылки приостановлена. Требуется подтверждение адреса для завершения доставки.",
        "Вам зачислена эксклюзивная награда. Авторизуйтесь, чтобы забрать подарок."
    ];

    for(let level of ['easy', 'medium', 'hard']) {
        for (let i = 0; i < 50; i++) {
            let seed = (level.length * 500) + (i * 19) + 7; 
            let rBrand = brands[Math.floor(seededRandom(seed) * brands.length)];
            let hookIdx = Math.floor(seededRandom(seed + 1) * hooksEn.length);
            let emailIdx = Math.floor(seededRandom(seed + 4) * emailsEn.length);
            
            let isPhish = seededRandom(seed + 2) > 0.45;
            let url = ""; 
            let errEn = ""; 
            let errRu = ""; 
            let type = "safe";
            
            let hasVisualDefect = false;
            let hasFakeBadge = false;
            let isBitb = false;
            let hasTimer = false;

            let senderSafe = `noreply@${rBrand.domain}`;
            let senderPhish = `security-verify@${rBrand.name.toLowerCase().replace(' ', '')}-alert.net`;

            if (!isPhish) {
                let useAlt = seededRandom(seed + 8) > 0.5;
                url = `https://www.${useAlt ? rBrand.altDomain : rBrand.domain}/login`;
                errEn = `SAFE: Official verified domain (${useAlt ? rBrand.altDomain : rBrand.domain}).`; 
                errRu = `БЕЗОПАСНО: Официальный верифицированный домен (${useAlt ? rBrand.altDomain : rBrand.domain}).`;
            } else {
                let attackChoice = seededRandom(seed + 3);
                
                if (level === 'easy') {
                    if (attackChoice < 0.3) {
                        url = `http://www.${rBrand.domain}/auth`; 
                        type = "http"; 
                        errEn = "PHISHING: Unsecured HTTP connection used!"; 
                        errRu = "ФИШИНГ: Использовано незащищенное соединение HTTP!";
                    } else if (attackChoice < 0.7) {
                        url = `https://www.${rBrand.domain}/login`; 
                        type = "visual_defect";
                        hasVisualDefect = true;
                        hasFakeBadge = true;
                        errEn = "PHISHING: URL looks real, BUT page has typos and fake SSL badges inside content!";
                        errRu = "ФИШИНГ: URL похож на правду, НО на странице опечатки и фальшивая плашка SSL!";
                    } else {
                        url = `https://${rBrand.name.toLowerCase().replace(' ', '')}-gift-claim.com`; 
                        type = "fake_domain"; 
                        errEn = "PHISHING: Completely fake domain name!"; 
                        errRu = "ФИШИНГ: Абсолютно поддельное доменное имя!";
                    }
                } else if (level === 'medium') {
                    if (attackChoice < 0.4) {
                        url = `https://${rBrand.domain}.auth-verify.io/login`; 
                        type = "subdomain";
                        errEn = "PHISHING: Subdomain trick. Main domain is auth-verify.io!"; 
                        errRu = "ФИШИНГ: Подмена поддомена. Настоящий домен — auth-verify.io!";
                    } else {
                        url = `https://free-rewards-center.org/login`;
                        type = "bitb";
                        isBitb = true;
                        hasTimer = true;
                        errEn = "PHISHING: Browser-in-the-Browser attack! Fake popup login window rendered inside the page.";
                        errRu = "ФИШИНГ: Атака Browser-in-the-Browser! Нарисованное окно входа прямо внутри чужого сайта.";
                    }
                } else {
                    if (attackChoice < 0.5) {
                        let fakeDom = rBrand.domain.replace('i','l').replace('m','rn');
                        url = `https://www.${fakeDom}/login`; 
                        type = "typosquatting"; 
                        hasTimer = true;
                        errEn = "PHISHING: Typosquatting attack (replaced characters in domain)!"; 
                        errRu = "ФИШИНГ: Тайпосквоттинг (замена похожих букв в домене)!"; 
                    } else {
                        url = `https://${rBrand.domain}@scam-entry.org/login`; 
                        type = "auth_spoofing"; 
                        hasFakeBadge = true;
                        errEn = "PHISHING: Authentication spoofing using '@' symbol!"; 
                        errRu = "ФИШИНГ: Манипуляция адресом с использованием символа '@'!"; 
                    }
                }
            }

            db[level].push({ 
                brand: rBrand, 
                url: url, 
                isPhishing: isPhish, 
                attackType: type, 
                errEn: errEn, 
                errRu: errRu,
                hookEn: hooksEn[hookIdx],
                hookRu: hooksRu[hookIdx],
                emailBodyEn: emailsEn[emailIdx],
                emailBodyRu: emailsRu[emailIdx],
                senderEmailSafe: senderSafe,
                senderEmailPhish: senderPhish,
                hasVisualDefect: hasVisualDefect,
                hasFakeBadge: hasFakeBadge,
                isBitb: isBitb,
                hasTimer: hasTimer
            });
        }
    }
    return db;
}

const scenarioDB = buildScenarios();