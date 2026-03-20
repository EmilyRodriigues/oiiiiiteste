// Configuração Inicial
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// 1. Dados do Projeto
const milestones = [
    { title: "Largada — Onde tudo começou", date: "Volta 1", description: "O primeiro encontro que mudou tudo.", emoji: "🏁", icon: "flag" },
    { title: "Pit Stop do Coração", date: "Volta 2", description: "Aquele momento especial que ficou marcado.", emoji: "❤️", icon: "heart" },
    { title: "Rota 66 — Nossa Aventura", date: "Volta 3", description: "Uma viagem inesquecível.", emoji: "🛣️", icon: "map-pin" },
    { title: "Ka-Chow! Acelerando", date: "Volta 4", description: "Um novo capítulo cheio de energia!", emoji: "⚡", icon: "zap" },
    { title: "Copa Pistão de Ouro", date: "Volta 5", description: "Cada momento é uma vitória com você.", emoji: "🌟", icon: "star" },
    { title: "Chegada Triunfante!", date: "Hoje", description: "Celebrando mais uma volta completa ao sol! 🏆", emoji: "🎉", icon: "trophy" },
];

const photos = [
    { label: "Radiator Springs", img: "foto4.jpeg" },
    { label: "Rota 66", img: "foto5.jpeg" },
    { label: "Copa Pistão", img: "foto3.jpeg" },
    { label: "Pit Stop", img: "foto1.jpeg" },
    { label: "Pista de Corrida", img: "foto2.jpeg" },
    { label: "Linha de Chegada", img: "foto6.jpeg" },
];

const quotes = [
    "\"Eu sou a velocidade!\" — Relâmpago McQueen",
    "\"Ka-Chow!\" — Relâmpago McQueen",
    "\"Não é sobre ganhar, é sobre como você corre.\" — Doc Hudson",
    "\"Às vezes o melhor caminho é a estrada mais longa.\" — Radiator Springs",
    "\"Todos precisam de um pit stop de vez em quando.\" — Guido",
];

// Helper: SVG do Carro
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

// 2. Confetes e Som
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

const playEngine = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
    osc.start(); osc.stop(ctx.currentTime + 2);
};

// 3. Renderização do Mural (Fotos)
photos.forEach((p) => {
    const card = document.createElement('div');
    card.className = "group relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-border shadow-md";
    card.innerHTML = `
        <div class="absolute inset-0">
            <img src="${p.img}" class="w-full h-full object-cover">
        </div>
        <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
        <span class="absolute bottom-3 left-3 text-white font-cars text-sm">${p.label}</span>
        <button class="like-btn absolute top-3 right-3 text-2xl">🤍</button>
    `;
    document.getElementById('gallery-grid').appendChild(card);
});

// 4. Renderização da Pista (Timeline)
const timelineContainer = document.getElementById('timeline-items-container');
if (timelineContainer) {
    timelineContainer.innerHTML = ''; // Limpa antes de gerar para não duplicar

    milestones.forEach((m, i) => {
        const item = document.createElement('div');
        item.className = "relative mb-12 opacity-0"; // Opacidade 0 para animação do GSAP
        const isLeft = i % 2 === 0;

        // Padrão quadriculado em CSS (o ícone da bandeira igual o da foto!)
        const checkeredBox = `<div class="w-4 h-4 rounded-[2px]" style="background-image: conic-gradient(#374151 90deg, transparent 90deg, transparent 180deg, #374151 180deg, #374151 270deg, transparent 270deg); background-size: 8px 8px; background-color: #e5e7eb;"></div>`;

        item.innerHTML = `
            <div class="hidden md:grid grid-cols-[1fr_80px_1fr] items-center">
                <div class="${isLeft ? 'col-start-1 pr-8' : 'col-start-3 pl-8'}">
                    <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-left relative z-20 hover:shadow-md transition-all">
                        <div class="flex items-center gap-2 mb-3">
                            ${checkeredBox}
                            <span class="text-primary font-bold tracking-[0.15em] text-xs uppercase">${m.date}</span>
                        </div>
                        <h3 class="font-sans text-xl font-extrabold text-[#1f2937] mb-2">${m.title}</h3>
                        <p class="text-gray-500 text-sm leading-relaxed">${m.description}</p>
                    </div>
                </div>
                <div class="col-start-2 flex justify-center z-20 relative">
                    <div class="w-12 h-12 rounded-full bg-[#ff7a00] flex items-center justify-center shadow-md text-white border-[5px] border-background">
                        <i data-lucide="${m.icon}" class="w-5 h-5"></i>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-start gap-4 pl-4 relative z-20">
                <div class="mt-4 shrink-0 w-10 h-10 rounded-full bg-[#ff7a00] flex items-center justify-center shadow-md text-white border-[4px] border-background relative z-20">
                    <i data-lucide="${m.icon}" class="w-4 h-4"></i>
                </div>
                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full text-left">
                    <div class="flex items-center gap-2 mb-3">
                        ${checkeredBox}
                        <span class="text-primary font-bold tracking-[0.15em] text-xs uppercase">${m.date}</span>
                    </div>
                    <h3 class="font-sans text-lg font-extrabold text-[#1f2937] mb-2">${m.title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">${m.description}</p>
                </div>
            </div>
        `;
        timelineContainer.appendChild(item);
        
        // Ativa a animação de scroll
        gsap.to(item, { opacity: 1, scrollTrigger: item, y: 0, duration: 1 });
    });
    
    // Atualiza os ícones do Lucide criados dinamicamente
    lucide.createIcons();
}

// 5. Hero e Animações
document.getElementById('animated-car').innerHTML = getCarSvg("w-32 h-16 drop-shadow-2xl scale-x-[-1]");
document.getElementById('timeline-car-icon').innerHTML = getCarSvg("w-20 h-10 mx-auto");

const splitHTML = (text) => text.split('').map(c => `<span class="letter inline-block ${c===' '?'w-4':''}">${c}</span>`).join('');
document.getElementById('hero-title').innerHTML = `
    <span class="text-gradient-racing block pb-2">${splitHTML("Acelere,")}</span>
    <span class="text-white drop-shadow-md block mt-2">${splitHTML("É SEU DIA!")}</span>
`;

const tlHero = gsap.timeline();
tlHero.from(".ground-element", { y: 100, opacity: 0, duration: 1.2 })
    .from(".letter", { y: 100, opacity: 0, rotationX: -90, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.8")
    .fromTo("#animated-car", { x: "-30vw" }, { x: "120vw", duration: 2, ease: "power2.inOut", onComplete: triggerConfetti }, "-=1.5");

// 6. Lógica do Motor e Botões
let revs = 0;
const engineBtn = document.getElementById("engine-btn");
const carSound = document.getElementById("car-sound");

engineBtn.addEventListener("click", function() {
    revs++;
    if (revs === 5) abrirSurpresa();
    carSound.currentTime = 0;
    carSound.play().catch(() => {});
    playEngine();
    document.getElementById('rev-badge').classList.remove('hidden');
    document.getElementById('rev-count').innerText = revs;
    document.getElementById('needle').style.transform = "rotate(100deg)";
    engineBtn.classList.add('animate-shake');
    if (revs % 3 === 0) triggerConfetti();
    setTimeout(() => {
        document.getElementById('needle').style.transform = "rotate(-90deg)";
        engineBtn.classList.remove('animate-shake');
    }, 1000);
});

function abrirSurpresa() {
    const overlay = document.getElementById("surprise-overlay");
    overlay.classList.remove("hidden");
    document.getElementById("surprise-video").play();
    triggerConfetti();
    revs = 0;
}

// CORREÇÃO: Fechar e voltar ao topo
document.getElementById("close-surprise").addEventListener("click", () => {
    document.getElementById("surprise-overlay").classList.add("hidden");
    document.getElementById("surprise-video").pause();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById("btn-surpresa").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("engine-section").scrollIntoView({ behavior: "smooth" });
});

// Likes e Footer
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
        e.target.innerText = e.target.innerText === "🤍" ? "❤️" : "🤍";
    }
});

let qIdx = 0;
document.getElementById('quote-card').onclick = () => {
    qIdx = (qIdx + 1) % quotes.length;
    document.getElementById('footer-quote').innerText = quotes[qIdx];
};

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if(!musicPlaying){
        music.volume = 0.5;
        music.play();
        musicBtn.innerHTML = '<i data-lucide="volume-2"></i>';
    }else{
        music.pause();
        musicBtn.innerHTML = '<i data-lucide="volume-x"></i>';
    }

    musicPlaying = !musicPlaying;

    lucide.createIcons();
});