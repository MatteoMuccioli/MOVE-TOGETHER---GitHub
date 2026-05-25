/* ============================================================
   MOVE TOGETHER – GitHub Pages Edition (fully client-side)
   Nessun backend: tutto in localStorage + Web APIs
   ============================================================ */

/* ══════════════════════════════════════════════
   COSTANTI
   ══════════════════════════════════════════════ */
const RIMINI_DATE   = new Date('2025-05-28T09:00:00');
const SEED_BOOKINGS = 127;  // contatore di partenza "fake"

const LS_BOOKINGS   = 'mt_bookings';
const LS_CHALLENGES = 'mt_challenges';
const LS_USER       = 'mt_user';
const LS_DARK       = 'mt_dark';
const LS_BADGES     = 'mt_badges';

/* ══════════════════════════════════════════════
   DATI
   ══════════════════════════════════════════════ */
const EVENTS = [
    { id:1, title:'Senior & Junior Gym Buddies',       emoji:'🤝', category:'intergenerazionale', badge:'Intergenerazionale',   badgeCls:'bg-purple-100 text-purple-700', headerGradient:'linear-gradient(135deg,#ede9fe,#fce7f3)', color:'#7C3AED', description:'Allenati in coppia con un partner di un\'altra generazione e ottieni uno sconto speciale. Nonni e nipoti, o accoppiamenti casuali guidati dai nostri trainer certificati.',              highlights:['Sconto 30% sull\'abbonamento','Trainer dedicato alla coppia','Kit di benvenuto per entrambi'],           promo:'Sconto 30% per le coppie intergenerazionali', cta:'Prenota Ora' },
    { id:2, title:'Open Day Move Together',            emoji:'🎉', category:'tutti',               badge:'Gratuito · Per tutti', badgeCls:'bg-green-100 text-green-700',   headerGradient:'linear-gradient(135deg,#d1fae5,#ccfbf1)',  color:'#059669', description:'Un giorno di prova completamente gratuito per entrambe le fasce d\'età. Scopri la struttura, incontra i trainer e vivi la prima esperienza Move Together senza alcun impegno.',   highlights:['Ingresso 100% gratuito','Tour guidato della struttura','Mini sessione con personal trainer'],           promo:'Ingresso GRATUITO – nessun obbligo',           cta:'Registrati Gratis' },
    { id:3, title:'Workshop Longevità & Energia',      emoji:'🧘', category:'senior',              badge:'Per Over 60',          badgeCls:'bg-blue-100 text-blue-700',    headerGradient:'linear-gradient(135deg,#dbeafe,#e0e7ff)',  color:'#2563EB', description:'Sessioni di ginnastica dolce e posturale dove i ragazzi assistono e si allenano fianco a fianco con i senior. Un percorso guidato per muoversi con sicurezza e gioia.',          highlights:['Ginnastica dolce e stretching','Posturale e respirazione','Nutrizione per la longevità'],             promo:'Primo workshop a €5 invece di €25',            cta:'Prenota Ora' },
    { id:4, title:'Summer Buddy Challenge',            emoji:'☀️', category:'giovani',             badge:'Per Giovani',          badgeCls:'bg-orange-100 text-orange-700', headerGradient:'linear-gradient(135deg,#ffedd5,#fef3c7)',  color:'#EA580C', description:'Sfida estiva esclusiva per i giovani dai 16 ai 20 anni. Completa 10 sessioni in coppia con un partner Senior e vinci un abbonamento gratuito di 3 mesi.',                        highlights:['3 mesi di abbonamento in palio','App di tracking inclusa','Badge esclusivi sbloccabili'],              promo:'3 mesi GRATIS completando la sfida',           cta:'Partecipa alla Sfida' },
    { id:5, title:'Pilates Generations',               emoji:'🌿', category:'intergenerazionale', badge:'Intergenerazionale',   badgeCls:'bg-purple-100 text-purple-700', headerGradient:'linear-gradient(135deg,#d1fae5,#a7f3d0)',  color:'#047857', description:'Lezioni di Pilates appositamente progettate per essere praticate insieme da giovani e senior. Livelli differenziati, stesso spazio, stessa energia positiva.',                  highlights:['Classi miste garantite','Attrezzatura professionale inclusa','Certificato di partecipazione'],         promo:'Prova gratuita + 20% sconto mensile',          cta:'Prenota una Classe' },
    { id:6, title:'Move Together App Beta',            emoji:'📱', category:'giovani',             badge:'Per Giovani',          badgeCls:'bg-orange-100 text-orange-700', headerGradient:'linear-gradient(135deg,#e0e7ff,#ede9fe)',  color:'#4F46E5', description:'Accesso anticipato alla nostra app di tracking e gamification. Registra passi, sfide completate e gestisci i tuoi badge e coupon digitali direttamente dallo smartphone.',       highlights:['Accesso beta in anteprima assoluta','Notifiche sfide settimanali','QR coupon digitali integrati'],      promo:'Accesso gratuito per i primi 500 iscritti',    cta:'Scarica il Coupon' }
];

const GYMS = [
    { id:'roma',    name:'FitCenter Roma Cornelia',            address:'Via Cornelia 30, 00166 Roma',              lat:41.9028, lng:12.3964, type:'main',    phone:'06 1234 5678', rating:4.8 },
    { id:'milano',  name:'Wellness Milano Corso Buenos Aires', address:'Corso Buenos Aires 50, 20124 Milano',       lat:45.4654, lng:9.2029,  type:'partner', phone:'02 9876 5432', rating:4.7 },
    { id:'bologna', name:'SportLife Bologna Centro',           address:'Via Rizzoli 10, 40125 Bologna',             lat:44.4949, lng:11.3426, type:'partner', phone:'051 2345 678', rating:4.6 },
    { id:'rimini',  name:'RiminiWellness – Centro Fitness',    address:'Viale Regina Elena 22, 47921 Rimini',       lat:44.0678, lng:12.5695, type:'main',    phone:'0541 345678',  rating:4.9 },
    { id:'torino',  name:'ActiveLife Torino Po',               address:'Via Po 18, 10124 Torino',                  lat:45.0703, lng:7.6869,  type:'partner', phone:'011 456 789',  rating:4.5 },
    { id:'napoli',  name:'FitNapoli Toledo',                   address:'Via Toledo 200, 80132 Napoli',             lat:40.8358, lng:14.2488, type:'partner', phone:'081 567 890',  rating:4.6 },
    { id:'firenze', name:'ToscanaFit Firenze',                 address:'Via dei Calzaiuoli 10, 50122 Firenze',     lat:43.7696, lng:11.2558, type:'partner', phone:'055 678 901',  rating:4.7 },
    { id:'palermo', name:'SportSicilia Palermo',               address:'Via della Libertà 55, 90143 Palermo',      lat:38.1157, lng:13.3615, type:'partner', phone:'091 789 012',  rating:4.4 },
    { id:'venezia', name:'VeneziaFit Mestre',                  address:'Via Piave 30, 30172 Mestre VE',            lat:45.4908, lng:12.2369, type:'partner', phone:'041 890 123',  rating:4.5 },
    { id:'bari',    name:'ApuliaFit Bari Centro',              address:'Via Sparano da Bari 140, 70121 Bari',      lat:41.1177, lng:16.8719, type:'partner', phone:'080 901 234',  rating:4.6 },
    { id:'catania', name:'EtnaFit Catania',                    address:'Via Etnea 300, 95127 Catania',             lat:37.5079, lng:15.0830, type:'partner', phone:'095 012 345',  rating:4.3 },
    { id:'genova',  name:'LiguriaWellness Genova',             address:'Via XX Settembre 41, 16121 Genova',        lat:44.4075, lng:8.9340,  type:'partner', phone:'010 123 456',  rating:4.5 }
];

const CHALLENGES = [
    { id:1, title:'10.000 Passi Condivisi',           icon:'fa-walking',    iconColor:'#FF6B35', xp:150, badge:'🚶', badgeName:'Camminatore',  difficulty:'Facile',    diffColor:'#10B981', reward:'5% sconto extra in palestra',             description:'Cammina 10.000 passi insieme a un Over 60. Documenta il percorso con una foto da condividere nella community.' },
    { id:2, title:"Insegna un'App Tech a un Senior",  icon:'fa-mobile-alt', iconColor:'#3B82F6', xp:200, badge:'📱', badgeName:'Tech Mentor',  difficulty:'Media',     diffColor:'#F59E0B', reward:'Accesso beta app + 1 mese gratis',         description:"Mostra a un Over 60 come usare un fitness tracker o l'app Move Together. Aiutalo a registrare il suo primo allenamento digitale." },
    { id:3, title:'Sessione Stretching Condivisa',    icon:'fa-spa',        iconColor:'#1F6B52', xp:120, badge:'🧘', badgeName:'Zen Master',   difficulty:'Facile',    diffColor:'#10B981', reward:'Ingresso gratuito al prossimo Open Day',   description:'Partecipa a una sessione di stretching o yoga di almeno 30 minuti insieme a un partecipante Over 60 del tuo centro.' },
    { id:4, title:'Sfida dei 30 Giorni',              icon:'fa-fire',       iconColor:'#EF4444', xp:500, badge:'🔥', badgeName:'Fuoco Sacro',  difficulty:'Difficile', diffColor:'#EF4444', reward:'Un mese di abbonamento GRATIS',            description:'Mantieni l\'allenamento per 30 giorni consecutivi. Almeno 2 sessioni a settimana devono essere condivise con un partner.' },
    { id:5, title:'Ricetta Sana Intergenerazionale',  icon:'fa-utensils',   iconColor:'#8B5CF6', xp:100, badge:'🍎', badgeName:'Chef Salute',  difficulty:'Facile',    diffColor:'#10B981', reward:'Badge esclusivo + 10% sconto caffetteria', description:'Prepara un pasto salutare insieme a un Senior o un Giovane e condividi la ricetta nella community Move Together.' },
    { id:6, title:'Porta un Amico al Move Together',  icon:'fa-user-plus',  iconColor:'#EC4899', xp:250, badge:'🤝', badgeName:'Ambasciatore', difficulty:'Media',     diffColor:'#F59E0B', reward:'1 mese GRATIS per te e per il tuo amico', description:"Invita un amico (di qualsiasi età!) al prossimo Open Day. Se si iscrive, entrambi ricevete un mese di abbonamento omaggio." }
];

const BADGES_TEMPLATE = [
    { icon:'🏃', name:'Primo Passo',    key:'primo_passo',    unlocked:true  },
    { icon:'🤝', name:'Buddy',          key:'buddy',          unlocked:true  },
    { icon:'🧘', name:'Zen Master',     key:'Zen Master',     unlocked:false },
    { icon:'⭐', name:'Stelle',          key:'stelle',         unlocked:true  },
    { icon:'🔥', name:'Fuoco Sacro',    key:'Fuoco Sacro',    unlocked:false },
    { icon:'🏆', name:'Campione',       key:'campione',       unlocked:false },
    { icon:'💪', name:'Forza',          key:'forza',          unlocked:false },
    { icon:'🚶', name:'Camminatore',    key:'Camminatore',    unlocked:false },
    { icon:'📱', name:'Tech Mentor',    key:'Tech Mentor',    unlocked:false },
    { icon:'🍎', name:'Chef Salute',    key:'Chef Salute',    unlocked:false },
    { icon:'🌟', name:'Superstar',      key:'superstar',      unlocked:false },
    { icon:'❤️', name:'Cuore',          key:'cuore',          unlocked:false },
    { icon:'🎯', name:'Precisione',     key:'precisione',     unlocked:false },
    { icon:'🌿', name:'Natura',         key:'natura',         unlocked:false },
    { icon:'☀️', name:'Estate',          key:'estate',         unlocked:false },
    { icon:'🦋', name:'Trasformazione', key:'trasformazione', unlocked:false }
];

/* ══════════════════════════════════════════════
   LIVELLI XP
   ══════════════════════════════════════════════ */
const XP_LEVELS = [
    { level:1, name:'Principiante', minXP:0,    maxXP:199  },
    { level:2, name:'Allenato',     minXP:200,  maxXP:499  },
    { level:3, name:'Campione',     minXP:500,  maxXP:999  },
    { level:4, name:'Leggenda',     minXP:1000, maxXP:9999 }
];

/* ══════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════ */
let selectedGym    = null;
let map            = null;
let badges         = JSON.parse(JSON.stringify(BADGES_TEMPLATE));
let challengeState = {};  // { [id]: true }
let countdownTimer = null;
let typingTimer    = null;

/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavbar();
    initMobileMenu();
    initCountdown();
    initTypingHero();
    initWelcomeBanner();
    renderEvents();
    loadChallengeState();
    renderChallenges();
    renderBadges();
    updateXPBar();
    initMap();
    initReveal();
    updateLiveCounter();
});

/* ══════════════════════════════════════════════
   DARK MODE
   ══════════════════════════════════════════════ */
function initDarkMode() {
    const saved = localStorage.getItem(LS_DARK);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'true' || (saved === null && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}
function toggleDark() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem(LS_DARK, String(!isDark));
}

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
function initNavbar() {
    const nav = document.getElementById('navbar');
    const check = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', check, { passive:true });
    check();
}
function initMobileMenu() {
    document.getElementById('mobile-menu-btn').addEventListener('click', () =>
        document.getElementById('mobile-menu').classList.toggle('hidden')
    );
}
function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.add('hidden');
}

/* ══════════════════════════════════════════════
   COUNTDOWN RIMINI WELLNESS
   ══════════════════════════════════════════════ */
function initCountdown() {
    const tick = () => {
        const now  = new Date();
        const diff = RIMINI_DATE - now;

        if (diff <= 0) {
            document.getElementById('countdown-wrap').innerHTML =
                `<p class="text-2xl font-bold" style="color:var(--coral)">🎉 RiminiWellness è INIZIATO!</p>`;
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(val).padStart(2, '0');
        };
        set('cd-days', d);
        set('cd-hours', h);
        set('cd-mins', m);
        set('cd-secs', s);
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
}

/* ══════════════════════════════════════════════
   TYPING ANIMATION HERO
   ══════════════════════════════════════════════ */
function initTypingHero() {
    const target = document.getElementById('typing-target');
    if (!target) return;
    const phrases = ['Over 60', 'Giovani 16-20', 'Senior e Junior', 'Tutti insieme'];
    let pi = 0, ci = 0, deleting = false;
    const type = () => {
        const phrase = phrases[pi];
        if (deleting) {
            target.textContent = phrase.slice(0, --ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
            setTimeout(type, 60);
        } else {
            target.textContent = phrase.slice(0, ++ci);
            if (ci === phrase.length) { deleting = true; setTimeout(type, 1600); return; }
            setTimeout(type, 90);
        }
    };
    type();
}

/* ══════════════════════════════════════════════
   WELCOME BACK BANNER
   ══════════════════════════════════════════════ */
function initWelcomeBanner() {
    const user = getUser();
    if (!user) return;
    const banner = document.getElementById('welcome-banner');
    if (!banner) return;
    const xp = getTotalXP();
    const lv = getLevel(xp);
    banner.querySelector('#wb-name').textContent = user.name.split(' ')[0];
    banner.querySelector('#wb-level').textContent = lv.name;
    banner.querySelector('#wb-xp').textContent = `${xp} XP`;
    banner.classList.add('show');
}

/* ══════════════════════════════════════════════
   LIVE COUNTER (localStorage + seed)
   ══════════════════════════════════════════════ */
function updateLiveCounter() {
    const bookings = getBookings();
    const total    = SEED_BOOKINGS + bookings.length;
    const el       = document.getElementById('live-counter');
    if (el) animateNumber(el, total, 1200);
}

function animateNumber(el, target, duration = 800) {
    const start = parseInt(el.textContent) || 0;
    const diff  = target - start;
    const steps = 40;
    const step  = duration / steps;
    let i = 0;
    const run = () => {
        i++;
        el.textContent = Math.round(start + diff * (i / steps));
        if (i < steps) setTimeout(run, step);
    };
    run();
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════ */
function initReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold:0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════ */
function showToast(title, msg, type = 'success') {
    const toast = document.getElementById('toast');
    const icon  = document.getElementById('toast-icon');
    const tit   = document.getElementById('toast-title');
    const txt   = document.getElementById('toast-msg');
    const cfg   = {
        success: { bg:'#D1FAE5', ic:'#059669', glyph:'fa-check' },
        error:   { bg:'#FEE2E2', ic:'#DC2626', glyph:'fa-times' },
        info:    { bg:'#DBEAFE', ic:'#2563EB', glyph:'fa-info'  }
    };
    const c = cfg[type] || cfg.info;
    icon.style.background = c.bg;
    icon.innerHTML = `<i class="fas ${c.glyph}" style="color:${c.ic};"></i>`;
    tit.textContent = title;
    txt.textContent = msg;
    toast.classList.remove('hidden', 'hide');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.classList.add('hidden'), 320); }, 4000);
}

/* ══════════════════════════════════════════════
   EVENTS – render + filter + search
   ══════════════════════════════════════════════ */
function renderEvents() {
    const grid = document.getElementById('events-grid');
    grid.innerHTML = '';
    EVENTS.forEach(ev => grid.appendChild(buildEventCard(ev)));
}

function buildEventCard(ev) {
    const card = document.createElement('div');
    card.className = 'event-card reveal';
    card.dataset.category = ev.category;
    card.dataset.title    = ev.title.toLowerCase();
    card.innerHTML = `
        <div class="event-card-header" style="background:${ev.headerGradient}"><span>${ev.emoji}</span></div>
        <div class="p-6">
            <div class="flex items-start justify-between mb-3">
                <span class="chip ${ev.badgeCls}">${ev.badge}</span>
                <span class="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">#movejuntos</span>
            </div>
            <h3 class="font-display font-bold text-xl mb-2" style="color:var(--text)">${ev.title}</h3>
            <p class="text-sm leading-relaxed mb-4" style="color:var(--text-muted)">${ev.description}</p>
            <ul class="space-y-1.5 mb-5">
                ${ev.highlights.map(h => `<li class="flex items-center gap-2 text-sm" style="color:var(--text-muted)"><i class="fas fa-check-circle text-xs" style="color:${ev.color}"></i>${h}</li>`).join('')}
            </ul>
            <div class="rounded-xl p-3 mb-5 border" style="background:var(--surface);border-color:var(--border)">
                <p class="text-xs mb-0.5" style="color:var(--text-muted)">Promozione attiva:</p>
                <p class="font-bold text-sm" style="color:var(--text)">${ev.promo}</p>
            </div>
            <button onclick="openModal('${ev.category}','${ev.title.replace(/'/g,"\\'")}')"
                class="w-full py-3 px-5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style="background:${ev.color}">
                <i class="fas fa-ticket-alt mr-2"></i>${ev.cta}
            </button>
        </div>`;
    return card;
}

function filterEvents(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.filter === filter)
    );
    applyFilters();
}

function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'tutti';
    const query = (document.getElementById('search-events')?.value || '').toLowerCase().trim();
    document.querySelectorAll('.event-card').forEach(card => {
        const cat   = card.dataset.category;
        const title = card.dataset.title || '';
        const matchFilter = activeFilter === 'tutti' || cat === activeFilter || cat === 'tutti';
        const matchSearch = !query || title.includes(query);
        card.classList.toggle('hidden-card', !(matchFilter && matchSearch));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search-events');
    if (search) search.addEventListener('input', applyFilters);
});

/* ══════════════════════════════════════════════
   MAP
   ══════════════════════════════════════════════ */
function initMap() {
    map = L.map('map', { center:[42.5,12.5], zoom:5.5 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom:18
    }).addTo(map);

    const mkMain    = makeIcon('#1F6B52', 40);
    const mkPartner = makeIcon('#FF6B35', 34);

    GYMS.forEach(gym => {
        L.marker([gym.lat, gym.lng], { icon: gym.type === 'main' ? mkMain : mkPartner })
            .addTo(map)
            .bindPopup(buildPopup(gym), { maxWidth:280, minWidth:280 });
    });
}

function makeIcon(color, size) {
    return L.divIcon({
        html:`<div style="width:${size}px;height:${size}px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 14px rgba(0,0,0,.28);"></div>`,
        iconSize:[size,size], iconAnchor:[size/2,size], popupAnchor:[0,-(size+6)], className:''
    });
}

function buildPopup(gym) {
    const stars = '★'.repeat(Math.floor(gym.rating));
    return `<div style="font-family:'Inter',sans-serif;overflow:hidden;border-radius:18px;">
        <div style="background:linear-gradient(135deg,#FF6B35,#FF8A5B);padding:14px 18px;color:white;">
            <div style="font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.85;margin-bottom:3px;">${gym.type==='main'?'⭐ SEDE PRINCIPALE ANIF':'📍 CENTRO PARTNER'}</div>
            <div style="font-size:15px;font-weight:800;line-height:1.3;">${gym.name}</div>
        </div>
        <div style="padding:14px 18px;background:white;">
            <div style="font-size:12px;color:#6B7280;margin-bottom:6px;">📍 ${gym.address}</div>
            <div style="font-size:12px;color:#6B7280;margin-bottom:10px;">📞 ${gym.phone}</div>
            <div style="margin:10px 0 12px;font-size:13px;color:#F59E0B;">${stars} <span style="color:#9CA3AF;font-size:11px;">${gym.rating}/5</span></div>
            <button onclick="selectGym('${gym.id}')" style="width:100%;padding:10px;background:#FF6B35;color:white;border:none;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;font-family:'Inter',sans-serif;" onmouseover="this.style.background='#E55A25'" onmouseout="this.style.background='#FF6B35'">
                Seleziona questa sede →
            </button>
        </div>
    </div>`;
}

function selectGym(gymId) {
    selectedGym = GYMS.find(g => g.id === gymId);
    if (!selectedGym) return;
    map.closePopup();
    document.getElementById('sgym-name').textContent    = selectedGym.name;
    document.getElementById('sgym-address').textContent = selectedGym.address;
    const bar = document.getElementById('selected-gym-bar');
    bar.classList.remove('hidden');
    bar.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

/* ══════════════════════════════════════════════
   CHALLENGE SYSTEM
   ══════════════════════════════════════════════ */
function loadChallengeState() {
    try {
        challengeState = JSON.parse(localStorage.getItem(LS_CHALLENGES) || '{}');
    } catch (_) { challengeState = {}; }

    try {
        const savedBadges = JSON.parse(localStorage.getItem(LS_BADGES) || '{}');
        badges.forEach(b => { if (savedBadges[b.key]) b.unlocked = true; });
    } catch (_) {}
}

function completeChallenge(id) {
    const ch = CHALLENGES.find(c => c.id === id);
    if (!ch || challengeState[id]) return;

    challengeState[id] = true;
    localStorage.setItem(LS_CHALLENGES, JSON.stringify(challengeState));

    const badge = badges.find(b => b.key === ch.badgeName);
    if (badge) {
        badge.unlocked = true;
        const savedBadges = {};
        badges.forEach(b => { if (b.unlocked) savedBadges[b.key] = true; });
        localStorage.setItem(LS_BADGES, JSON.stringify(savedBadges));
    }

    renderChallenges();
    renderBadges();
    updateXPBar();
    showToast(`+${ch.xp} XP guadagnati! 🎉`, `Badge sbloccato: ${ch.badge} ${ch.badgeName}`, 'success');
    launchConfetti();
}

function getTotalXP() {
    return CHALLENGES.filter(ch => challengeState[ch.id]).reduce((s, ch) => s + ch.xp, 0);
}

function getLevel(xp) {
    return XP_LEVELS.slice().reverse().find(l => xp >= l.minXP) || XP_LEVELS[0];
}

function updateXPBar() {
    const xp  = getTotalXP();
    const lv  = getLevel(xp);
    const next = XP_LEVELS.find(l => l.level === lv.level + 1);
    const pct  = next ? Math.round(((xp - lv.minXP) / (next.minXP - lv.minXP)) * 100) : 100;

    const barFill  = document.getElementById('xp-bar-fill');
    const xpText   = document.getElementById('xp-total');
    const lvBadge  = document.getElementById('xp-level');
    const nextText = document.getElementById('xp-next');

    if (barFill)  setTimeout(() => barFill.style.width = pct + '%', 100);
    if (xpText)   xpText.textContent   = `${xp} XP`;
    if (lvBadge)  lvBadge.textContent  = `Livello ${lv.level} · ${lv.name}`;
    if (nextText) nextText.textContent = next ? `${next.minXP - xp} XP al livello ${next.level}` : '🏆 Livello massimo!';
}

function renderChallenges() {
    const grid = document.getElementById('challenges-grid');
    grid.innerHTML = '';
    CHALLENGES.forEach(ch => grid.appendChild(buildChallengeCard(ch)));
    setTimeout(initReveal, 50);
}

function buildChallengeCard(ch) {
    const done = !!challengeState[ch.id];
    const card = document.createElement('div');
    card.className = 'challenge-card reveal' + (done ? ' completed-card' : '');

    const btn = done
        ? `<span style="font-size:11px;background:rgba(16,185,129,.2);color:#6EE7B7;font-weight:700;padding:4px 12px;border-radius:9999px;display:flex;align-items:center;gap:4px;"><i class="fas fa-check"></i>Completata</span>`
        : `<button onclick="completeChallenge(${ch.id})" style="font-size:11px;background:#FF6B35;color:white;font-weight:700;padding:6px 14px;border-radius:9999px;border:none;cursor:pointer;transition:background .2s;" onmouseover="this.style.background='#E55A25'" onmouseout="this.style.background='#FF6B35'">Segna completata ✓</button>`;

    card.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;">
            <div style="width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;">
                <i class="fas ${ch.icon}" style="color:${ch.iconColor};font-size:1.2rem;"></i>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
                <span style="font-size:11px;font-weight:700;color:${ch.diffColor};">${ch.difficulty}</span>
                <span style="font-size:10px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.6);padding:2px 8px;border-radius:9999px;">+${ch.xp} XP</span>
            </div>
        </div>
        <h3 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:1.05rem;color:white;margin-bottom:8px;">${ch.title}</h3>
        <p style="color:#9CA3AF;font-size:13px;line-height:1.6;margin-bottom:14px;">${ch.description}</p>
        ${done ? `<div style="height:6px;background:rgba(255,255,255,.1);border-radius:9999px;overflow:hidden;margin-bottom:14px;"><div style="height:100%;width:100%;background:#10B981;border-radius:9999px;"></div></div>` : ''}
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.3rem;">${ch.badge}</span>
                <span style="font-size:11px;color:#9CA3AF;">Badge: <strong style="color:white;">${ch.badgeName}</strong></span>
            </div>
            ${btn}
        </div>
        <div style="padding-top:10px;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:6px;font-size:11px;color:#FCD34D;">
            <i class="fas fa-gift"></i><span>Premio: ${ch.reward}</span>
        </div>`;
    return card;
}

/* ══════════════════════════════════════════════
   BADGES
   ══════════════════════════════════════════════ */
function renderBadges() {
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = '';
    badges.forEach(b => {
        const el = document.createElement('div');
        el.className = 'badge-item ' + (b.unlocked ? 'unlocked' : 'locked');
        el.title = b.unlocked ? b.name : 'Badge bloccato';
        el.innerHTML = `<span class="badge-emoji">${b.unlocked ? b.icon : '🔒'}</span><span class="badge-label ${b.unlocked ? 'text-white' : 'text-white/30'}">${b.unlocked ? b.name : '???'}</span>`;
        grid.appendChild(el);
    });
}

/* ══════════════════════════════════════════════
   CONFETTI
   ══════════════════════════════════════════════ */
function launchConfetti() {
    const colors = ['#FF6B35','#FFAD59','#1F6B52','#6EE7B7','#3B82F6','#8B5CF6','#EC4899'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            el.style.cssText = `
                left:${Math.random() * 100}vw;
                background:${colors[Math.floor(Math.random() * colors.length)]};
                width:${6 + Math.random() * 8}px;
                height:${6 + Math.random() * 8}px;
                border-radius:${Math.random() > .5 ? '50%' : '2px'};
                animation-duration:${2.5 + Math.random() * 2}s;
                animation-delay:0s;
            `;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 5000);
        }, i * 30);
    }
}

/* ══════════════════════════════════════════════
   LOCALSTORAGE HELPERS
   ══════════════════════════════════════════════ */
function getBookings() {
    try { return JSON.parse(localStorage.getItem(LS_BOOKINGS) || '[]'); } catch (_) { return []; }
}
function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem(LS_BOOKINGS, JSON.stringify(bookings));
}
function getUser() {
    try { return JSON.parse(localStorage.getItem(LS_USER) || 'null'); } catch (_) { return null; }
}
function saveUser(u) {
    localStorage.setItem(LS_USER, JSON.stringify(u));
}

/* ══════════════════════════════════════════════
   COUPON CODE GENERATOR
   ══════════════════════════════════════════════ */
function genCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const rand4 = () => Array.from({ length:4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `MT25-${rand4()}-${rand4()}`;
}

function classifyAge(age) {
    if (age >= 16 && age <= 20) return 'Giovane (16-20)';
    if (age >= 60)               return 'Over 60';
    return 'Altro';
}

/* ══════════════════════════════════════════════
   MODAL – open / close
   ══════════════════════════════════════════════ */
function openModal(group = '', offer = '') {
    const box = document.getElementById('modal-box');
    renderForm(group, offer);
    box.classList.remove('closing');
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    const box = document.getElementById('modal-box');
    box.classList.add('closing');
    setTimeout(() => {
        document.getElementById('modal-overlay').classList.remove('open');
        document.body.style.overflow = '';
    }, 220);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ══════════════════════════════════════════════
   MODAL – FORM
   ══════════════════════════════════════════════ */
function renderForm(preGroup, preOffer) {
    const box = document.getElementById('modal-box');
    const savedUser = getUser();
    const gymOptions = GYMS.map(g =>
        `<option value="${g.id}" data-name="${g.name}" data-address="${g.address}" ${selectedGym&&selectedGym.id===g.id?'selected':''}>${g.name}</option>`
    ).join('');
    const offerOptions = EVENTS.map(e =>
        `<option value="${e.title}" ${preOffer===e.title?'selected':''}>${e.title}</option>`
    ).join('');

    box.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:var(--bg);border-bottom:1px solid var(--border);border-radius:24px 24px 0 0;padding:22px 24px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
        <div>
            <h2 style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.4rem;color:var(--text);margin:0 0 4px;">Prenota o Scarica Coupon</h2>
            <p style="font-size:13px;color:var(--text-muted);margin:0;">Il coupon viene generato istantaneamente e salvato nel browser</p>
        </div>
        <button onclick="closeModal()" style="width:38px;height:38px;border-radius:10px;background:var(--surface);border:1px solid var(--border);cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--text-muted);margin-top:2px;">✕</button>
    </div>
    <form id="booking-form" onsubmit="handleSubmit(event)" style="padding:24px;display:flex;flex-direction:column;gap:18px;">
        <div><label class="form-label">Nome e Cognome *</label><input type="text" id="f-name" class="form-input" value="${savedUser?.name||''}" placeholder="Es. Marco Rossi" required autocomplete="name"></div>
        <div>
            <label class="form-label">La tua Età *</label>
            <input type="number" id="f-age" class="form-input" value="${savedUser?.age||''}" placeholder="${preGroup==='senior'?'Es. 65':preGroup==='giovani'?'Es. 17':'Es. 17 oppure 65'}" min="10" max="99" required>
            <p id="age-hint" style="font-size:12px;margin-top:5px;min-height:16px;"></p>
        </div>
        <div><label class="form-label">Email *</label><input type="email" id="f-email" class="form-input" value="${savedUser?.email||''}" placeholder="la.tua@email.com" required autocomplete="email"></div>
        <div>
            <label class="form-label">Sede ANIF preferita *</label>
            <select id="f-gym" class="form-input" required>
                <option value="">– Seleziona una sede –</option>${gymOptions}
            </select>
        </div>
        <div>
            <label class="form-label">Offerta selezionata *</label>
            <select id="f-offer" class="form-input" required>
                <option value="">– Seleziona un'offerta –</option>${offerOptions}
            </select>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;padding-top:4px;">
            <input type="checkbox" id="f-privacy" required style="width:16px;height:16px;margin-top:2px;accent-color:#FF6B35;cursor:pointer;flex-shrink:0;">
            <label for="f-privacy" style="font-size:13px;color:var(--text-muted);line-height:1.5;cursor:pointer;">
                Acconsento al trattamento dei dati personali ai sensi del GDPR.
                <a href="https://anifeurowellness.it/" target="_blank" style="color:#FF6B35;font-weight:600;">Privacy Policy ANIF</a>
            </label>
        </div>
        <button type="submit" id="submit-btn" style="width:100%;padding:16px;background:#FF6B35;color:white;border:none;border-radius:14px;font-family:'Poppins',sans-serif;font-weight:800;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 6px 20px rgba(255,107,53,.35);">
            <i class="fas fa-ticket-alt"></i>Genera il mio Coupon Digitale<i class="fas fa-arrow-right" style="font-size:.8rem;opacity:.7;"></i>
        </button>
    </form>`;

    document.getElementById('f-age').addEventListener('input', function () {
        const hint = document.getElementById('age-hint');
        const v = parseInt(this.value);
        if (v >= 16 && v <= 20) { hint.textContent = '✅ Fascia Giovani (16-20)'; hint.style.cssText = 'font-size:12px;margin-top:5px;color:#FF6B35;font-weight:600;'; }
        else if (v >= 60)       { hint.textContent = '✅ Fascia Over 60';         hint.style.cssText = 'font-size:12px;margin-top:5px;color:#1F6B52;font-weight:600;'; }
        else if (v > 0)         { hint.textContent = '💡 Partecipa all\'Open Day!'; hint.style.cssText = 'font-size:12px;margin-top:5px;color:#9CA3AF;'; }
        else                    { hint.textContent = ''; }
    });
}

/* ══════════════════════════════════════════════
   FORM SUBMIT – tutto in locale
   ══════════════════════════════════════════════ */
function handleSubmit(e) {
    e.preventDefault();
    const name   = document.getElementById('f-name').value.trim();
    const age    = parseInt(document.getElementById('f-age').value);
    const email  = document.getElementById('f-email').value.trim();
    const gymSel = document.getElementById('f-gym');
    const gymId  = gymSel.value;
    const gymOpt = gymSel.options[gymSel.selectedIndex];
    const gymName    = gymOpt?.dataset.name    || gymOpt?.text || gymId;
    const gymAddress = gymOpt?.dataset.address || '';
    const offer  = document.getElementById('f-offer').value;

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Generazione in corso...`;

    // Simula una breve elaborazione
    setTimeout(() => {
        const code     = genCode();
        const ageGroup = classifyAge(age);
        const booking  = { name, age, email, gymId, gymName, gymAddress, offer, code, ageGroup, date: new Date().toISOString() };

        saveBooking(booking);
        saveUser({ name, age, email });

        // Sblocca badge "Primo Passo" se prima prenotazione
        const bpp = badges.find(b => b.key === 'primo_passo');
        if (bpp && !bpp.unlocked) {
            bpp.unlocked = true;
            const savedBadges = {};
            badges.forEach(b => { if (b.unlocked) savedBadges[b.key] = true; });
            localStorage.setItem(LS_BADGES, JSON.stringify(savedBadges));
        }

        updateLiveCounter();
        renderBadges();
        renderCoupon({ name, age, email, ageGroup, gymName, gymAddress, offer, code });
        launchConfetti();
    }, 600);
}

/* ══════════════════════════════════════════════
   COUPON RENDERING
   ══════════════════════════════════════════════ */
function renderCoupon({ name, age, email, ageGroup, gymName, gymAddress, offer, code }) {
    const box     = document.getElementById('modal-box');
    const gColor  = ageGroup === 'Over 60' ? '#1F6B52' : '#FF6B35';
    const initial = name.charAt(0).toUpperCase();

    box.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:var(--bg);border-bottom:1px solid var(--border);border-radius:24px 24px 0 0;padding:20px 24px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
        <div>
            <h2 style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.35rem;color:var(--text);margin:0 0 3px;">Il tuo Coupon è Pronto! 🎉</h2>
            <p style="font-size:12px;color:var(--text-muted);margin:0;display:flex;align-items:center;gap:4px;"><span style="color:#059669;font-weight:600;"><i class="fas fa-save mr-1"></i>Salvato nel browser</span></p>
        </div>
        <button onclick="closeModal()" style="width:38px;height:38px;border-radius:10px;background:var(--surface);border:1px solid var(--border);cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--text-muted);margin-top:2px;">✕</button>
    </div>
    <div style="padding:24px;">
        <div id="print-coupon" class="coupon-wrap" style="margin-bottom:20px;">
            <div style="background:linear-gradient(135deg,#FF6B35,#FF8A5B);padding:18px 22px;text-align:center;color:white;">
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:4px;">
                    <i class="fas fa-running" style="font-size:1.3rem;"></i>
                    <span style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.4rem;">Move Together</span>
                </div>
                <p style="font-size:12px;opacity:.85;font-weight:600;margin:0;">ANIF Eurowellness · RiminiWellness 2025</p>
            </div>
            <div style="padding:20px 22px;background:white;">
                <div style="display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:2px dashed #E5E7EB;margin-bottom:14px;">
                    <div style="width:52px;height:52px;border-radius:50%;background:${gColor};display:flex;align-items:center;justify-content:center;color:white;font-family:'Poppins',sans-serif;font-weight:900;font-size:1.4rem;flex-shrink:0;">${initial}</div>
                    <div>
                        <p style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.15rem;color:#111827;margin:0 0 4px;">${name}</p>
                        <span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;color:white;background:${gColor};">${ageGroup}</span>
                        <span style="font-size:12px;color:#9CA3AF;margin-left:6px;">${age} anni</span>
                    </div>
                </div>
                <div style="margin-bottom:10px;">
                    <p style="font-size:10px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 3px;">Offerta Selezionata</p>
                    <p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:#111827;margin:0;">${offer}</p>
                </div>
                <div style="background:#F9FAFB;border-radius:12px;padding:10px 14px;margin-bottom:14px;border:1px solid #F3F4F6;">
                    <p style="font-size:10px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 3px;">Sede ANIF</p>
                    <p style="font-weight:700;color:#374151;font-size:.9rem;margin:0;">${gymName}</p>
                    ${gymAddress ? `<p style="font-size:12px;color:#9CA3AF;margin:2px 0 0;">${gymAddress}</p>` : ''}
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;">
                    <div>
                        <p style="font-size:10px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 4px;">Codice Coupon</p>
                        <p style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.25rem;color:#FF6B35;letter-spacing:.12em;margin:0;">${code}</p>
                    </div>
                    <div id="qr-slot" style="width:96px;height:96px;flex-shrink:0;border-radius:10px;overflow:hidden;border:2px solid #F3F4F6;display:flex;align-items:center;justify-content:center;background:#f9f9f9;"></div>
                </div>
                <div style="display:flex;align-items:flex-end;justify-content:center;gap:1px;height:56px;background:#F9FAFB;border-radius:10px;padding:6px 10px;margin-bottom:6px;">
                    ${buildBarcode()}
                </div>
                <p style="text-align:center;font-size:10px;color:#9CA3AF;letter-spacing:.15em;margin:0 0 12px;">${code.replace(/-/g,' · ')}</p>
                <div style="border-top:2px dashed #E5E7EB;padding-top:10px;display:flex;justify-content:space-between;font-size:11px;color:#9CA3AF;">
                    <span>Valido fino al <strong style="color:#6B7280;">31/12/2025</strong></span>
                    <span>Non cedibile</span>
                </div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
            <button onclick="printCoupon()" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;"><i class="fas fa-print"></i>Stampa</button>
            <button onclick="shareCoupon('${code}')" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;background:#1F6B52;color:white;border:none;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;"><i class="fas fa-share-alt"></i>Condividi</button>
        </div>
        <button onclick="openMyBookings()" style="width:100%;margin-bottom:10px;padding:12px;border:2px solid #FF6B35;background:transparent;color:#FF6B35;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;">
            <i class="fas fa-list mr-2"></i>Vedi tutte le mie prenotazioni
        </button>
        <button onclick="closeModal()" style="width:100%;padding:12px;border:2px solid var(--border);background:transparent;color:var(--text-muted);border-radius:12px;font-weight:600;font-size:13px;cursor:pointer;">
            Chiudi e torna al sito
        </button>
    </div>`;

    setTimeout(() => {
        const slot = document.getElementById('qr-slot');
        if (slot && typeof QRCode !== 'undefined') {
            slot.innerHTML = '';
            new QRCode(slot, { text:`MOVETOGETHER:${code}:${name.replace(/ /g,'_')}`, width:92, height:92, colorDark:'#1a1a2e', colorLight:'#ffffff', correctLevel:QRCode.CorrectLevel.M });
        }
    }, 80);

    showToast('Prenotazione confermata! 🎉', `Codice: ${code}`, 'success');
}

/* ── Storico prenotazioni ── */
function openMyBookings() {
    const box      = document.getElementById('modal-box');
    const bookings = getBookings();

    box.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:var(--bg);border-bottom:1px solid var(--border);border-radius:24px 24px 0 0;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;">
        <h2 style="font-family:'Poppins',sans-serif;font-weight:900;font-size:1.3rem;color:var(--text);margin:0;">Le mie prenotazioni</h2>
        <button onclick="closeModal()" style="width:38px;height:38px;border-radius:10px;background:var(--surface);border:1px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--text-muted);">✕</button>
    </div>
    <div style="padding:24px;">
        ${bookings.length === 0
            ? `<p style="text-align:center;color:var(--text-muted);padding:40px 0;">Nessuna prenotazione ancora.</p>`
            : bookings.slice().reverse().map(b => {
                const gColor = b.ageGroup === 'Over 60' ? '#1F6B52' : '#FF6B35';
                const date   = new Date(b.date).toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
                return `<div style="border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:12px;background:var(--surface);">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                        <span style="font-family:'Poppins',sans-serif;font-weight:700;color:var(--text);">${b.name}</span>
                        <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:9999px;color:white;background:${gColor};">${b.ageGroup}</span>
                    </div>
                    <p style="font-size:13px;color:var(--text-muted);margin:0 0 4px;">${b.offer}</p>
                    <p style="font-size:12px;color:var(--text-muted);margin:0 0 8px;">📍 ${b.gymName}</p>
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <code style="font-size:12px;font-weight:800;color:#FF6B35;letter-spacing:.1em;">${b.code}</code>
                        <span style="font-size:11px;color:var(--text-muted);">${date}</span>
                    </div>
                </div>`;
            }).join('')}
        ${bookings.length > 0 ? `
        <button onclick="clearBookings()" style="width:100%;margin-top:6px;padding:10px;border:1px solid #FCA5A5;background:transparent;color:#DC2626;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;">
            <i class="fas fa-trash mr-1"></i>Cancella tutte le prenotazioni locali
        </button>` : ''}
    </div>`;
}

function clearBookings() {
    if (!confirm('Cancellare tutte le prenotazioni locali?')) return;
    localStorage.removeItem(LS_BOOKINGS);
    updateLiveCounter();
    openMyBookings();
}

/* ── Barcode ── */
function buildBarcode() {
    const p = [3,1,2,1,3,2,1,2,1,3,1,2,3,1,2,1,3,2,1,2,1,3,1,2,1,3,2,1,2,1,3,1,2,3,1,2,1,3,2,1,2,1,3,1,2,3,1,2];
    return p.map((w,i) => {
        const h = 30 + (i%3===0 ? 12 : i%2===0 ? 6 : 0);
        return i%2===0
            ? `<div class="barcode-bar" style="width:${w*2.2}px;height:${h}px;align-self:flex-end;"></div>`
            : `<div style="width:${w*2.2}px;height:${h}px;align-self:flex-end;"></div>`;
    }).join('');
}

/* ── Print ── */
function printCoupon() {
    const html = document.getElementById('print-coupon').outerHTML;
    const w = window.open('', '_blank', 'width=560,height=800');
    w.document.write(`<!DOCTYPE html><html><head>
        <meta charset="UTF-8"><title>Coupon Move Together</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <style>body{margin:40px auto;max-width:480px;font-family:'Inter',sans-serif;background:#f8f7f4;}.coupon-wrap{border:3px dashed #FF6B35;border-radius:20px;overflow:hidden;}@media print{body{margin:0;}}</style>
    </head><body>${html}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 600);
}

/* ── Share ── */
function shareCoupon(code) {
    const text = `Ho ricevuto il mio coupon Move Together! 🏃 Codice: ${code}\nScopri il progetto ANIF Eurowellness per RiminiWellness 2025!`;
    if (navigator.share) {
        navigator.share({ title:'Coupon Move Together', text, url:location.href }).catch(()=>{});
    } else {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Copiato!', 'Testo copiato negli appunti.', 'info'))
            .catch(() => { prompt('Copia il testo:', text); });
    }
}
