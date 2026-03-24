// Configuração Inicial
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// 1. Dados do Projeto - Homenagem da Família e Namorada
const milestones = [
    { 
        title: "A Maior Fã na Arquibancada", 
        date: "Mãe", 
        description: "\"Desde a sua primeira acelerada na vida, ela é a sua maior fã. O abraço de mãe sempre será o seu pit stop mais seguro e cheio de amor.\"", 
        icon: "heart" 
    },
    { 
        title: "O Chefe de Equipe", 
        date: "Pai", 
        description: "\"Como um verdadeiro Doc Hudson, ele te ensinou a ter coragem na pista. Seu pai tem um orgulho gigante do homem e que você se tornou.\"", 
        icon: "shield" 
    },
    { 
        title: "Parceiro de Escuderia", 
        date: "Irmão", 
        description: "\"Dividir a pista com você é a melhor das aventuras. Seu irmão é aquele parceiro para todas as horas, lado a lado em cada curva e linha de chegada.\"", 
        icon: "users" 
    },
    { 
        title: "Sempre no Banco do Carona", 
        date: "Sua Namorada", 
        description: "\"Seja em pista seca ou na chuva, eu sempre estarei ao seu lado como sua copilota, segurando a sua mão em cada curva da vida.\"", 
        icon: "navigation" 
    },
    { 
        title: "A Sua Verdadeira Equipe", 
        date: "Nossa Base", 
        description: "\"Juntos, nós somos a sua força e a sua torcida para vencer qualquer campeonato. Vaii mcqueennn!\"", 
        icon: "award" 
    },
    { 
        title: "Acelera para o Futuro!", 
        date: "Feliz Aniversário", 
        description: "\"Que esse novo ciclo seja cheio de vitórias e muita luz. Nós te amamos muito além de qualquer linha de chegada!\"", 
        icon: "flag" 
    }
];

const photos = [
    { label: "Braveza", img: "foto4.jpeg" },
    { label: "Pescando", img: "foto5.jpeg" },
    { label: "Malcriação", img: "foto3.jpeg" },
    { label: "Esmagando o irmão", img: "foto1.jpeg" },
    { label: "Familia", img: "foto2.jpeg" },
    { label: "Laço eterno", img: "foto6.jpeg" },
];

const quotes = [
    "\"Eu sou a velocidade!\" — Relâmpago McQueen",
    "\"Ka-Chow!\" — Relâmpago McQueen",
    "\"Não é sobre ganhar, é sobre como você corre.\" — Doc Hudson",
    "\"Às vezes o melhor caminho é a estrada mais longa.\" — Radiator Springs",
    "\"Todos precisam de um pit stop de vez em quando.\" — Guido",
];

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

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playEngine = () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(); 
    osc.stop(audioCtx.currentTime + 2);
};

// 3. Renderização do Mural (Fotos) com Glassmorfismo
photos.forEach((p) => {
    const card = document.createElement('div');
    // Aplicando a classe glass-light aqui para o efeito de vidro
    card.className = "group relative aspect-square rounded-2xl overflow-hidden glass-light shadow-lg hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,200,0,0.3)] transition-all duration-300";
    card.innerHTML = `
    <div class="absolute inset-0">
        <img src="${p.img}" alt="Memória: ${p.label}" class="w-full h-full object-cover">
    </div>
    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <span class="text-white font-cars text-lg tracking-wide">${p.label}</span>
    </div>
    <button aria-label="Marcar como favorita" class="like-btn absolute top-3 right-3 text-2xl drop-shadow-md hover:scale-125 transition-transform">🤍</button>
`;
    document.getElementById('gallery-grid').appendChild(card);
});

// 4. Renderização da Pista (Timeline) com Glassmorfismo
const timelineContainer = document.getElementById('timeline-items-container');
if (timelineContainer) {
    timelineContainer.innerHTML = '';

    milestones.forEach((m, i) => {
        const item = document.createElement('div');
        item.className = "relative mb-12 story-card"; // Classe base para a animação GSAP
        const isLeft = i % 2 === 0;

        const checkeredBox = `<div class="w-4 h-4 rounded-[2px]" style="background-image: conic-gradient(#374151 90deg, transparent 90deg, transparent 180deg, #374151 180deg, #374151 270deg, transparent 270deg); background-size: 8px 8px; background-color: #e5e7eb;"></div>`;

        item.innerHTML = `
            <div class="hidden md:grid grid-cols-[1fr_80px_1fr] items-center">
                <div class="${isLeft ? 'col-start-1 pr-8' : 'col-start-3 pl-8'}">
                    <div class="glass-light backdrop-blur-md bg-white/60 border border-white/50 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-left relative z-20 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center gap-2 mb-3">
                            ${checkeredBox}
                            <span class="text-primary font-bold tracking-[0.15em] text-xs uppercase">${m.date}</span>
                        </div>
                        <h3 class="font-sans text-xl font-extrabold text-[#1f2937] mb-2">${m.title}</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">${m.description}</p>
                    </div>
                </div>
                <div class="col-start-2 flex justify-center z-20 relative">
                    <div class="w-12 h-12 rounded-full bg-[#ff7a00] flex items-center justify-center shadow-lg text-white border-[4px] border-white/50 backdrop-blur-sm">
                        <i data-lucide="${m.icon}" class="w-5 h-5"></i>
                    </div>
                </div>
            </div>

            <div class="md:hidden flex items-start gap-4 pl-4 relative z-20">
                <div class="mt-4 shrink-0 w-10 h-10 rounded-full bg-[#ff7a00] flex items-center justify-center shadow-md text-white border-[3px] border-white/50 relative z-20">
                    <i data-lucide="${m.icon}" class="w-4 h-4"></i>
                </div>
                <div class="glass-light backdrop-blur-md bg-white/60 border border-white/50 border-t-4 border-t-primary rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-left relative z-20 hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-2 mb-3">
                        ${checkeredBox}
                        <span class="text-primary font-bold tracking-[0.15em] text-xs uppercase">${m.date}</span>
                    </div>
                    <h3 class="font-sans text-lg font-extrabold text-[#1f2937] mb-2">${m.title}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed">${m.description}</p>
                </div>
            </div>
        `;
        timelineContainer.appendChild(item);
    });
    
    lucide.createIcons();
}

// 5. Hero e Imagens
const carContainer = document.getElementById('animated-car');
if (carContainer) {
    carContainer.innerHTML = `<img src="mcquenn.png" alt="Relâmpago McQueen" class="w-36 md:w-48 h-auto object-contain drop-shadow-[0_0_15px_rgba(239,51,64,0.6)]">`;
}

const timelineIcon = document.getElementById('timeline-car-icon');
if (timelineIcon) {
    timelineIcon.innerHTML = `<img src="mcquenn.png" alt="Relâmpago McQueen" class="w-30 md:w-32 h-auto mx-auto object-contain drop-shadow-lg">`;
}

const splitHTML = (text) => text.split('').map(c => `<span class="letter inline-block ${c===' '?'w-4':''}">${c}</span>`).join('');
document.getElementById('hero-title').innerHTML = `
    <span class="text-white drop-shadow-md block mt-2">${splitHTML("É SEU DIA!")}</span>
`;

gsap.fromTo("#animated-car", 
    { x: "-30vw" }, 
    { x: "120vw", duration: 2.8, ease: "power2.inOut", repeat: -1, repeatDelay: 2 }
);

// 6. Lógica do Motor e Botões
let revs = 0;
const engineBtn = document.getElementById("engine-btn");
const carSound = document.getElementById("car-sound");

if(engineBtn) {
    engineBtn.addEventListener("click", function() {
        revs++;
        if (revs === 5) abrirSurpresa();
        if(carSound) {
            carSound.currentTime = 0;
            carSound.play().catch(() => {});
        }
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
}

function abrirSurpresa() {
    const overlay = document.getElementById("surprise-overlay");
    overlay.classList.remove("hidden");
    const video = document.getElementById("surprise-video");
    if(video) video.play();
    triggerConfetti();
    revs = 0;
}

const closeBtn = document.getElementById("close-surprise");
if(closeBtn) {
    closeBtn.addEventListener("click", () => {
        const overlay = document.getElementById("surprise-overlay");
        const video = document.getElementById("surprise-video");
        overlay.classList.add("hidden");
        if(video) {
            video.pause();
            video.currentTime = 0;
        }
    });
}

// 7. Likes e Footer (AGORA VAI FUNCIONAR!)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
        e.target.innerText = e.target.innerText === "🤍" ? "❤️" : "🤍";
    }
});

let qIdx = 0;
const quoteCard = document.getElementById('quote-card');
if(quoteCard) {
    quoteCard.onclick = () => {
        qIdx = (qIdx + 1) % quotes.length;
        document.getElementById('footer-quote').innerText = quotes[qIdx];
    };
}

// 8. Música
const musicBtn = document.getElementById("music-toggle");
let musicPlaying = false;

if(musicBtn) {
    musicBtn.addEventListener("click", () => {
        const music = document.getElementById("bg-music"); 
        
        // --- NOVO: Faz o balãozinho de aviso sumir ---
        const tooltip = document.getElementById("audio-tooltip");
        if (tooltip) {
            tooltip.style.opacity = '0'; // Esmaece
            setTimeout(() => tooltip.remove(), 500); // Remove do código após meio segundo
        }
        // ---------------------------------------------

        if (music) {
            if(!musicPlaying){
                music.volume = 0.5; 
                music.play();
                musicBtn.innerHTML = '<i data-lucide="volume-2"></i>'; 
            } else {
                music.pause();
                musicBtn.innerHTML = '<i data-lucide="volume-x"></i>'; 
            }
            musicPlaying = !musicPlaying;
            lucide.createIcons(); 
        }
    });
}
// 9. Efeito do Header
const header = document.getElementById('main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// --- 10. ANIMAÇÕES DE ENTRADA SUAVES (STORYTELLING) ---
// Animando as seções inteiras
gsap.utils.toArray('section:not(#hero-section), footer').forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // Dispara quando o topo da seção chega em 85% da tela
            }
        }
    );
});


// Animando os cards da timeline um por um em cascata
gsap.utils.toArray('.story-card').forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, // Alterna vindo da esquerda e direita
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: card,
                start: "top 90%"
            }
        }
    );
});


