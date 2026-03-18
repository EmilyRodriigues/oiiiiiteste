    // Configuração Inicial
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });

    gsap.fromTo("#animated-car",
    { x: "-20vw" },
    { 
    x: "150vw",
    duration: 4,
    ease: "power1.inOut",
    repeat: -1,
    delay: 2
    });

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
        { label: "Radiator Springs", img: "foto1.jpeg" },
        { label: "Rota 66", img: "foto2.jpeg" },
        { label: "Copa Pistão", img: "foto3.jpeg" },
        { label: "Pit Stop", img: "foto4.jpg" },
        { label: "Pista de Corrida", img: "foto5.jpg" },
        { label: "Linha de Chegada", img: "foto6.jpg" },
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
        <span class="text-white drop-shadow-md block mt-2">${splitHTML("É SEU DIA!")}</span>
    `;

    const tlHero = gsap.timeline();
    tlHero.from(".cloud", { y: 50, opacity: 0, duration: 1.5, stagger: 0.2 })
        .from(".ground-element", { y: 100, opacity: 0, duration: 1.2 }, "-=1")
        .from(".letter", { y: 100, opacity: 0, rotationX: -90, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.8")
        .fromTo("#animated-car", { x: "-30vw" }, { x: "120vw", duration: 2, ease: "power2.inOut", onComplete: triggerConfetti }, "-=1.5");

    // barulho do motor
    let revs = 0;
    const playEngine = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        osc.start(); osc.stop(ctx.currentTime + 2);
    };

       
                
    const engineBtn = document.getElementById("engine-btn");
    const carSound = document.getElementById("car-sound");

    engineBtn.addEventListener("click", function(){

    revs++;

    if(revs === 5){
    abrirSurpresa();
    }
    carSound.currentTime = 0;
    carSound.play();

    playEngine();

    const needle = document.getElementById('needle');
    const badge = document.getElementById('rev-badge');

    badge.classList.remove('hidden');

    document.getElementById('rev-count').innerText = revs;

    needle.style.transform = "rotate(100deg)";

    engineBtn.classList.add('animate-shake');

    if (revs % 3 === 0) triggerConfetti();

    setTimeout(() => {

    needle.style.transform = "rotate(-90deg)";
    engineBtn.classList.remove('animate-shake');

    }, 2000);

    });
    // 4. Render Gallery & Timeline
   photos.forEach((p) => {

const card = document.createElement('div');

card.className =
"group relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-border shadow-md";

card.innerHTML = `

<div class="absolute inset-0">
<img src="${p.img}" class="w-full h-full object-cover">
</div>

<div class="absolute inset-0 bg-black/30"></div>

<span class="absolute bottom-3 left-3 text-white font-cars text-sm">
${p.label}
</span>

<button class="like-btn absolute top-3 right-3 text-2xl">
🤍
</button>

`;

document.getElementById('gallery-grid').appendChild(card);

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
    


    document.addEventListener("click", function(e){

    if(e.target.classList.contains("like-btn")){

    if(e.target.innerText === "🤍"){

    e.target.innerText = "❤️";

    }else{

    e.target.innerText = "🤍";

    }

    }

    });

    function abrirSurpresa(){

    const overlay = document.getElementById("surprise-overlay");
    const video = document.getElementById("surprise-video");

    overlay.classList.remove("hidden");

    video.currentTime = 0;
    video.play();

    triggerConfetti();

}

   const overlay = document.getElementById("surprise-overlay");

overlay.addEventListener("click", function(e){

if(e.target === overlay){
overlay.classList.add("hidden");
document.getElementById("surprise-video").pause();
}

});

const closeBtn = document.getElementById("close-surprise");

closeBtn.addEventListener("click", function(){

const overlay = document.getElementById("surprise-overlay");
const video = document.getElementById("surprise-video");

overlay.classList.add("hidden");
video.pause();

});

//parte do botão surpresa que leva para a seção do motor
const btnSurpresa = document.getElementById("btn-surpresa");

btnSurpresa.addEventListener("click", function(){

document.getElementById("engine-section").scrollIntoView({
behavior: "smooth"
});

});

lucide.createIcons();