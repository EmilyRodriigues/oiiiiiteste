// Configuração Inicial
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// Dados do Projeto (Extraídos dos ficheiros TSX)
const milestones = [
    { title: "Largada — Onde tudo começou", date: "Volta 1", description: "O primeiro encontro que mudou tudo.", emoji: "🏁", icon: "flag" },
    { title: "Pit Stop do Coração", date: "Volta 2", description: "Aquele momento especial que ficou marcado.", emoji: "❤️", icon: "heart" },
    { title: "Rota 66 — Nossa Aventura", date: "Volta 3", description: "Uma viagem inesquecível.", emoji: "🛣️", icon: "map-pin" },
    { title: "Ka-Chow! Acelerando", date: "Volta 4", description: "Um novo capítulo cheio de energia!", emoji: "⚡", icon: "zap" },
    { title: "Copa Pistão de Ouro", date: "Volta 5", description: "Cada momento é uma vitória com você.", emoji: "🌟", icon: "star" },
    { title: "Chegada Triunfante!", date: "Hoje", description: "Celebrando mais uma volta completa ao sol! 🏆", emoji: "🎉", icon: "trophy" },
];

const photos = [
    { label: "Radiator Springs", color: "from-primary/20 to-secondary/20" },
    { label: "Rota 66", color: "from-accent/20 to-primary/20" },
    { label: "Copa Pistão", color: "from-secondary/20 to-accent/20" },
    { label: "Pit Stop", color: "from-primary/20 to-accent/20" },
    { label: "Pista de Corrida", color: "from-accent/20 to-secondary/20" },
    { label: "Linha de Chegada", color: "from-secondary/20 to-primary/20" },
];

const quotes = [
    "\"Eu sou a velocidade!\" — Relâmpago McQueen",
    "\"Ka-Chow!\" — Relâmpago McQueen",
    "\"Não é sobre ganhar, é sobre como você corre.\" — Doc Hudson",
    "\"Às vezes o melhor caminho é a estrada mais longa.\" — Radiator Springs",
    "\"Todos precisam de um pit stop de vez em quando.\" — Guido",
];

// Helper: SVG do Carro (Replicado do CarSvg.tsx)
function getCarSvg(className = "") {
    return `
    <svg viewBox="0 0 120 50" class="${className}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 35 L25 15 L50 10 L90 10 L105 25 L110 35 Z" fill="hsl(355 87% 50%)" />
        <path d="M50 12 L30 18 L28 30 L55 30 L55 12 Z" fill="hsl(200 80% 75%)" opacity="0.8" />
        <path d="M58 12 L58 28 L82 28 L88 15 Z" fill="hsl(200 80% 75%)" opacity="0.6" />
        <path d="M62 20 L70 20 L67 25 L75 25 L63 35 L66 28 L60 28 Z" fill="hsl(42 100% 50%)" />
        <text x="40" y="30" fill="white" font-size="10" font-family="sans-serif" font-weight="bold">95</text>
        <circle cx="30" cy="40" r="8" fill="hsl(220 10% 20%)" />
        <circle cx="85" cy="40" r="8" fill="hsl(220 10% 20%)" />
    </svg>`;
}

// 1. Confetes
function triggerConfetti() {
    const root = document.getElementById('confetti-root');
    const colors = ["#EF333E", "#FFC800", "#3EA6D9", "#22c55e", "#a855f7"];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'fixed top-0 pointer-events-none z-50';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = (Math.random() * 8 + 4) + 'px';
        p.style.height = (parseFloat(p.style.width) * 1.5) + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.animation = `confetti-fall ${Math.random() * 2 + 2}s ease-in forwards`;
        root.appendChild(p);
        setTimeout(() => p.remove(), 4000);
    }
}

// 2. Hero Animations
document.getElementById('animated-car').innerHTML = getCarSvg("w-32 h-16 drop-shadow-2xl scale-x-[-1]");
document.getElementById('timeline-car-icon').innerHTML = getCarSvg("w-20 h-10 mx-auto");

const splitHTML = (text) => text.split('').map(c => `<span class="letter inline-block ${c===' '?'w-4':''}">${c}</span>`).join('');
document.getElementById('hero-title').innerHTML = `
    <span class="text-gradient-racing block pb-2">${splitHTML("Acelere,")}</span>
    <span class="text-foreground drop-shadow-md block mt-2">${splitHTML("é seu dia!")}</span>
`;

const tlHero = gsap.timeline();
tlHero.from(".cloud", { y: 50, opacity: 0, duration: 1.5, stagger: 0.2 })
      .from(".ground-element", { y: 100, opacity: 0, duration: 1.2 }, "-=1")
      .from(".letter", { y: 100, opacity: 0, rotationX: -90, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.8")
      .fromTo("#animated-car", { x: "-30vw" }, { x: "120vw", duration: 2, ease: "power2.inOut", onComplete: triggerConfetti }, "-=1.5");

// 3. Engine Audio Logic
let revs = 0;
const playEngine = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 2);
};

document.getElementById('engine-btn').onclick = function() {
    revs++;
    playEngine();
    const needle = document.getElementById('needle');
    const badge = document.getElementById('rev-badge');
    badge.classList.remove('hidden');
    document.getElementById('rev-count').innerText = revs;
    needle.style.transform = "rotate(100deg)";
    this.classList.add('animate-shake');
    if (revs % 3 === 0) triggerConfetti();
    setTimeout(() => {
        needle.style.transform = "rotate(-90deg)";
        this.classList.remove('animate-shake');
    }, 2000);
};

// 4. Render Gallery & Timeline
photos.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `group relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-border shadow-md opacity-0 translate-y-8`;
    card.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br ${p.color} flex flex-col items-center justify-center gap-3">
            <i data-lucide="camera" class="w-10 h-10 text-muted-foreground/40"></i>
            <span class="font-cars text-muted-foreground/60">${p.label}</span>
        </div>
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    `;
    document.getElementById('gallery-grid').appendChild(card);
    gsap.to(card, { opacity: 1, y: 0, delay: i * 0.1, scrollTrigger: card });
});

// Render Timeline
milestones.forEach((m, i) => {
    const item = document.createElement('div');
    item.className = "relative mb-10 opacity-0";
    const isLeft = i % 2 === 0;
    item.innerHTML = `
        <div class="hidden md:grid grid-cols-[1fr_80px_1fr] items-center">
            <div class="bg-white border-2 border-border rounded-2xl p-6 shadow-md ${isLeft?'col-start-1':'col-start-3'}">
                <span class="font-cars text-primary text-lg">${m.date} ${m.emoji}</span>
                <h3 class="font-display text-xl font-bold">${m.title}</h3>
                <p class="text-muted-foreground text-sm">${m.description}</p>
            </div>
            <div class="col-start-2 flex justify-center z-10">
                <div class="w-14 h-14 rounded-full bg-gradient-racing flex items-center justify-center shadow-lg text-white">
                    <i data-lucide="${m.icon}"></i>
                </div>
            </div>
        </div>
    `;
    document.getElementById('timeline-items-container').appendChild(item);
    gsap.to(item, { opacity: 1, scrollTrigger: item });
});

// Footer Logic
let qIdx = 0;
document.getElementById('quote-card').onclick = () => {
    qIdx = (qIdx + 1) % quotes.length;
    document.getElementById('footer-quote').innerText = quotes[qIdx];
};

// Ka-Chow Logic
document.getElementById('kachow-btn').onclick = () => {
    triggerConfetti();
    const txt = document.getElementById('kachow-text');
    gsap.fromTo(txt, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2, duration: 0.5 });
    setTimeout(() => gsap.to(txt, { opacity: 0, y: -20 }), 2000);
};

// Re-run icons
lucide.createIcons();

const video = document.getElementById('hero-video');
const kachowBtn = document.getElementById('kachow-btn');

// Guarda a função original de clique para não perder os confetes
const originalClick = kachowBtn.onclick;

kachowBtn.onclick = function() {
    // 1. Tira o mudo do vídeo
    if (video) {
        video.muted = false;
        video.volume = 0.5; // Volume em 50%
    }
    
    // 2. Executa a animação e os confetes que já estavam lá
    if (originalClick) originalClick();
};