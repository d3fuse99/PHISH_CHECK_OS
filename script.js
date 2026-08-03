let gameState = {
    correctCount: 0,
    totalAnswered: 0,
    currentTarget: null,
    currentStep: 1,
    level: 'easy'
};

function animateValue(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerText = current + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function initMenuStats() {
    const saved = localStorage.getItem('sentinel_state');
    if(saved) gameState = JSON.parse(saved);
    
    const accuracyEl = document.getElementById('accuracy-val');

    let accuracy = gameState.totalAnswered > 0 
        ? Math.round((gameState.correctCount / gameState.totalAnswered) * 100) 
        : 0;

    animateValue(accuracyEl, 0, accuracy, 800);
}

function resetProgress() {
    localStorage.removeItem('sentinel_state');
    sessionStorage.removeItem('phishResults');
    gameState = { correctCount: 0, totalAnswered: 0, currentTarget: null, currentStep: 1, level: 'easy' };
    initMenuStats();
}

function startOperation(lv) {
    gameState.level = lv;
    gameState.currentStep = 1;
    gameState.correctCount = 0;
    gameState.totalAnswered = 0;
    localStorage.setItem('sentinel_state', JSON.stringify(gameState));
    sessionStorage.removeItem('phishResults');
    window.location.href = "test.html?level=" + lv;
}

function initSimulation() {
    const urlParams = new URLSearchParams(window.location.search);
    gameState.level = urlParams.get('level') || 'easy';
    
    const saved = localStorage.getItem('sentinel_state');
    if(saved) {
        const parsed = JSON.parse(saved);
        gameState.correctCount = parsed.correctCount || 0;
        gameState.totalAnswered = parsed.totalAnswered || 0;
    }
    
    setupKeyboardShortcuts();
    updateScoreUI();
    loadNextTarget();
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const controlsHidden = document.getElementById('controls-area').hidden;
        const explanationHidden = document.getElementById('explanation-area').hidden;

        if (!controlsHidden) {
            if (e.key === '1' || e.key.toLowerCase() === 'l') {
                submitSentinelDecision(false);
            } else if (e.key === '2' || e.key.toLowerCase() === 'p') {
                submitSentinelDecision(true);
            }
        } else if (!explanationHidden) {
            if (e.key === 'Enter' || e.key === ' ') {
                loadNextTarget();
            }
        }
    });
}

function copyAddressUrl() {
    const urlText = document.getElementById('address-bar').innerText;
    navigator.clipboard.writeText(urlText).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.innerText = "COPIED!";
        setTimeout(() => { copyBtn.innerText = "📋 COPY"; }, 1500);
    });
}

function openSslModal() {
    const t = gameState.currentTarget;
    document.getElementById('ssl-cert-domain').innerText = t.brand.domain;
    document.getElementById('ssl-cert-issuer').innerText = t.isPhishing ? "CheapCert Anonymous CA (Untrusted)" : t.brand.sslIssuer;
    document.getElementById('ssl-cert-status').innerText = t.isPhishing ? "❌ INVALID / UNTRUSTED ISSUER" : "✔ VALID (TLS 1.3)";
    document.getElementById('ssl-cert-status').style.color = t.isPhishing ? "var(--red)" : "var(--log-green)";
    document.getElementById('ssl-cert-serial').innerText = t.isPhishing ? "4A:28:99:FF:00:1B:7D" : "9F:12:33:A4:8C:7E:11:9B:02";
    document.getElementById('ssl-modal').hidden = false;
}

function closeSslModal() {
    document.getElementById('ssl-modal').hidden = true;
}

function openWhoisModal() {
    const t = gameState.currentTarget;
    document.getElementById('whois-domain').innerText = t.url;
    document.getElementById('whois-registrar').innerText = t.isPhishing ? "CheapDomains LLC (Anonymous)" : t.brand.registrar;
    document.getElementById('whois-created').innerText = t.isPhishing ? "2026-07-28 (2 days ago)" : t.brand.createdDate;
    document.getElementById('whois-country').innerText = t.isPhishing ? "RU / CN (High Risk Zone)" : t.brand.country;
    document.getElementById('whois-privacy').innerText = t.isPhishing ? "DISABLED / REDACTED" : "PROTECTED BY REGISTRAR";
    document.getElementById('whois-modal').hidden = false;
}

function closeWhoisModal() {
    document.getElementById('whois-modal').hidden = true;
}

function openEmailModal() {
    const t = gameState.currentTarget;
    let lang = localStorage.getItem('lang') || 'en';
    
    document.getElementById('email-modal-sender').innerText = t.isPhishing ? t.senderEmailPhish : t.senderEmailSafe;
    document.getElementById('email-modal-subject').innerText = lang === 'en' ? t.hookEn : t.hookRu;
    document.getElementById('email-modal-body').innerText = lang === 'en' ? t.emailBodyEn : t.emailBodyRu;
    document.getElementById('email-modal').hidden = false;
}

function closeEmailModal() {
    document.getElementById('email-modal').hidden = true;
}

function openGuideModal() {
    document.getElementById('guide-modal').hidden = false;
}

function closeGuideModal() {
    document.getElementById('guide-modal').hidden = true;
}

function openQrModal() {
    const t = gameState.currentTarget;
    document.getElementById('qr-decoded-url').innerText = t.isPhishing ? t.qrPayloadPhish : t.qrPayloadSafe;
    document.getElementById('qr-warning-text').innerText = t.isPhishing ? "⚠️ WARNING: QR Payload forwards session tokens to an unauthorized domain!" : "✔ SAFE: QR Payload links to official domain.";
    document.getElementById('qr-warning-text').style.color = t.isPhishing ? "var(--red)" : "var(--log-green)";
    document.getElementById('qr-modal').hidden = false;
}

function closeQrModal() {
    document.getElementById('qr-modal').hidden = true;
}

function submitScamReport() {
    document.getElementById('report-modal').hidden = false;
}

function closeReportModal() {
    document.getElementById('report-modal').hidden = true;
    submitSentinelDecision(true);
}

function printCertificate() {
    window.print();
}

function loadNextTarget() {
    const step = parseInt(gameState.currentStep);
    if(step > 50) {
        showAnalysisScreen();
        return;
    }

    gameState.currentTarget = scenarioDB[gameState.level][step - 1];
    const t = gameState.currentTarget;
    
    document.getElementById('sim-progress').innerText = `TARGET: ${step} / 50`;
    document.getElementById('address-bar').innerText = t.url;
    document.getElementById('tab-title').innerText = t.brand.name;

    const lockIcon = document.getElementById('lock-icon');
    if(t.url.startsWith('http://')) {
        lockIcon.innerText = "⚠️";
        lockIcon.style.color = "var(--red)";
    } else {
        lockIcon.innerText = "🔒";
        lockIcon.style.color = "var(--log-green)";
    }
    
    let lang = localStorage.getItem('lang') || 'en';
    const hookText = lang === 'en' ? t.hookEn : t.hookRu;
    
    document.getElementById('context-banner').innerHTML = `⚠️ <strong>${hookText}</strong> <span style="float:right; text-decoration:underline;">📩 VIEW MESSAGE</span>`;
    document.getElementById('device-content').innerHTML = getLayout(t, lang);
    
    ['tool-urlscan', 'tool-whois', 'tool-ssl', 'tool-headers'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active-tool');
    });

    document.getElementById('console-output').hidden = true;
    document.getElementById('explanation-area').hidden = true;
    document.getElementById('analysis-screen').hidden = true;
    document.getElementById('heatmap-marker').hidden = true;
    
    document.getElementById('simulation-ui').hidden = false;
    document.getElementById('controls-area').hidden = false;
}

function useTool(type) {
    const out = document.getElementById('console-output');
    const t = gameState.currentTarget;

    if (type === 'whois') {
        openWhoisModal();
        return;
    }

    out.hidden = false;
    const btn = document.getElementById(`tool-${type}`);
    if (btn) btn.classList.add('active-tool');
    
    if (type === 'urlscan') {
        let protocol = t.url.startsWith('https://') ? 'https://' : 'http://';
        let raw = t.url.replace('https://', '').replace('http://', '');
        let parts = raw.split('/');
        let host = parts[0];
        let path = '/' + parts.slice(1).join('/');

        let hostParts = host.split('.');
        let domain = hostParts.slice(-2).join('.');
        let subdomain = hostParts.slice(0, -2).join('.');

        out.innerHTML = `[URL_PARSER]<br>` +
            `Protocol: <span class="url-protocol">${protocol}</span><br>` +
            `Subdomains: <span class="url-subdomain">${subdomain ? subdomain : 'NONE'}</span><br>` +
            `Main Domain: <span class="url-domain">${domain}</span><br>` +
            `Path: <span class="url-path">${path}</span>`;
    }
    if(type === 'ssl') {
        const isHttp = t.url.startsWith("http://");
        out.innerText = isHttp 
            ? "[SSL_REPORT] ❌ CONNECTION UNSECURED: HTTP protocol without certificate!" 
            : `[SSL_REPORT] ✔ Issuer: ${t.brand.sslIssuer} | Certificate: Valid (TLS 1.3)`;
    }
    if(type === 'headers') {
        out.innerText = `[HEADERS_INSPECT] Server: ${t.isPhishing ? "nginx/scam-host" : "cloudflare"}\nX-Frame-Options: ${t.isPhishing ? "DISABLED" : "SAMEORIGIN"}\nStrict-Transport-Security: ${t.isPhishing ? "OFF" : "max-age=31536000"}`;
    }
}

function submitSentinelDecision(userSaysPhish) {
    const t = gameState.currentTarget;
    const isCorrect = (userSaysPhish === t.isPhishing);
    const lang = localStorage.getItem('lang') || 'en';

    document.getElementById('controls-area').hidden = true;
    document.getElementById('explanation-area').hidden = false;

    const status = document.getElementById('result-status');
    const error = document.getElementById('error-text');

    let results = JSON.parse(sessionStorage.getItem('phishResults')) || [];
    results.push({ 
        step: gameState.currentStep, 
        isCorrect: isCorrect, 
        attackType: t.attackType, 
        url: t.url, 
        errorMsg: lang === 'en' ? t.errEn : t.errRu 
    });
    sessionStorage.setItem('phishResults', JSON.stringify(results));

    gameState.totalAnswered++;

    if(isCorrect) {
        gameState.correctCount++;
        status.innerText = i18n[lang].correct;
        status.style.color = "var(--log-green)";
    } else {
        status.innerText = i18n[lang].wrong;
        status.style.color = "var(--red)";
        showHeatmapMarker();
    }

    error.innerText = lang === 'en' ? t.errEn : t.errRu;
    updateScoreUI();
    
    gameState.currentStep++;
    localStorage.setItem('sentinel_state', JSON.stringify(gameState));
}

function showHeatmapMarker() {
    document.getElementById('heatmap-marker').hidden = false;
}

function updateScoreUI() {
    const scoreEl = document.getElementById('score-count');
    if(scoreEl) {
        scoreEl.innerText = `${gameState.correctCount} / ${gameState.totalAnswered}`;
    }
}

function abortMission() {
    window.location.href = "index.html";
}

function showAnalysisScreen() {
    document.getElementById('simulation-ui').hidden = true;
    document.getElementById('analysis-screen').hidden = false;
    
    let lang = localStorage.getItem('lang') || 'en';
    const results = JSON.parse(sessionStorage.getItem('phishResults')) || [];
    
    let correct = 0;
    let m = { safe:0, http:0, fake_domain:0, subdomain:0, typosquatting:0, auth_spoofing:0, visual_defect:0, bitb:0 };
    
    results.forEach(res => {
        if(res.isCorrect) correct++; else m[res.attackType]++;
    });

    renderAnalysisLogs('all');

    let accuracy = Math.round((correct / 50) * 100);
    document.getElementById('cert-accuracy').innerText = `${accuracy}%`;
    document.getElementById('cert-date').innerText = new Date().toISOString().split('T')[0];
    document.getElementById('cert-hash').innerText = `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`;

    let report = [];

    if (m.visual_defect > 0) report.push(lang === 'en' ? "Missed visual flaws and typos inside website content." : "Пропущены визуальные дефекты и опечатки в контенте.");
    if (m.bitb > 0) report.push(lang === 'en' ? "Fell for Browser-in-the-Browser fake popups." : "Попался на фейковые всплывающие окна (BitB).");
    if (m.subdomain > 0) report.push(lang === 'en' ? "Fell for subdomain tricks." : "Попался на подмену поддоменов.");
    if (m.typosquatting > 0) report.push(lang === 'en' ? "Missed letter replacement in domain." : "Невнимательность к замене букв в домене.");

    let finalBehavior = `<strong>SCORE: ${correct} / 50 (${accuracy}%)</strong><br><br>` + 
        (report.length > 0 ? report.join("<br>") : (lang === 'en' ? "No security blind spots identified." : "Слепых зон безопасности не обнаружено."));

    document.getElementById('behavior-text').innerHTML = finalBehavior;
}

function filterLog(filterType) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${filterType}`).classList.add('active');
    renderAnalysisLogs(filterType);
}

function renderAnalysisLogs(filterType) {
    const results = JSON.parse(sessionStorage.getItem('phishResults')) || [];
    const log = document.getElementById('analysis-log');
    log.innerHTML = "";

    results.forEach(res => {
        if (filterType === 'pass' && !res.isCorrect) return;
        if (filterType === 'fail' && res.isCorrect) return;

        let entry = document.createElement('div');
        entry.className = `log-entry ${res.isCorrect ? 'pass' : 'fail'}`;
        entry.innerText = `> TARGET ${res.step}: ${res.url} | STATUS: ${res.errorMsg}`;
        log.appendChild(entry);
    });
}

function copyAnalysisReport() {
    const text = document.getElementById('behavior-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copy-report-btn');
        btn.innerText = "COPIED!";
        setTimeout(() => { btn.innerText = "📋 COPY REPORT"; }, 1500);
    });
}

function applyLanguage() {
    let lang = localStorage.getItem('lang') || 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if (i18n[lang] && i18n[lang][key]) el.innerText = i18n[lang][key];
    });
}

function toggleLanguage() {
    let lang = localStorage.getItem('lang') || 'en';
    localStorage.setItem('lang', lang === 'en' ? 'ru' : 'en');
    location.reload();
}