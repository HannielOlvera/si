// Variables globales
let heartsInterval;
let loadingHeartsInterval;
let mouseTrailInterval;
let screenShakeInterval;
let rainbowInterval;
let particleExplosions = [];
let loadingProgress = 0;
let loadingInterval;
// Añadidos para el loader mejorado
let loaderHeartsIntervalId;
let loaderWordsIntervalId;
let loaderStartTime;
let loaderDuration = 10000; // 10 segundos

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    startFullscreenLoader();
});

// Pantalla de carga completa
function startFullscreenLoader() {
    const progressBar = document.getElementById('loadingProgress');
    const percentageText = document.getElementById('loadingPercentage');

    // Bloquear scroll mientras carga
    document.body.style.overflow = 'hidden';

    // Crear lluvia de corazones y palabras en el loader
    createLoaderHearts();
    createLoaderWords();

    // Progreso basado en tiempo exacto (10s)
    loaderStartTime = performance.now();
    loadingInterval = setInterval(() => {
        const elapsed = performance.now() - loaderStartTime;
        loadingProgress = Math.min(100, (elapsed / loaderDuration) * 100);

        if (progressBar) progressBar.style.width = loadingProgress + '%';
        if (percentageText) percentageText.textContent = Math.floor(loadingProgress) + '%';

        if (loadingProgress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(hideLoader, 400);
        }
    }, 100);
}

// Crear corazones en el loader
function createLoaderHearts() {
    const container = document.querySelector('.loader-hearts-rain');
    if (!container) return;

    loaderHeartsIntervalId = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'loader-heart';
                heart.textContent = '♥';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 1.5 + 's';
                heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
                heart.style.fontSize = (Math.random() * 20 + 28) + 'px'; // 28-48px

                container.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 6000);
            }, i * 180);
        }
    }, 700);
}

// Crear palabras cayendo en el loader
function createLoaderWords() {
    const container = document.querySelector('.loader-words-rain');
    if (!container) return;
    const words = ['ola', 'tqm', 'amor', 'gaby', 'si']; // 'hola' removido

    loaderWordsIntervalId = setInterval(() => {
        const word = document.createElement('div');
        word.className = 'loader-word';
        word.textContent = words[Math.floor(Math.random() * words.length)];
        word.style.left = Math.random() * 100 + '%';
        word.style.animationDelay = Math.random() * 0.8 + 's';
        word.style.animationDuration = (Math.random() * 2 + 4) + 's';

        container.appendChild(word);

        setTimeout(() => {
            word.remove();
        }, 6500);
    }, 500);
}

// Ocultar loader y mostrar contenido principal
function hideLoader() {
    const loader = document.getElementById('fullscreenLoader');
    const mainContent = document.getElementById('mainContent');

    // Limpiar intervals del loader
    if (loaderHeartsIntervalId) clearInterval(loaderHeartsIntervalId);
    if (loaderWordsIntervalId) clearInterval(loaderWordsIntervalId);

    // Desvanecer loader
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.8s ease-out';

    setTimeout(() => {
        loader.style.display = 'none';
        // Restaurar scroll
        document.body.style.overflow = '';

        // Mostrar contenido
        mainContent.style.display = 'block';
        requestAnimationFrame(() => {
            mainContent.classList.add('loaded');
            startMainEffects();
        });
    }, 800);
}

// Iniciar efectos del contenido principal
function startMainEffects() {
    createFloatingHearts();
    addSparkleEffect();
    addMouseTrail();
    // addScreenShake(); // Desactivado para evitar movimientos bruscos
    // addRainbowEffect(); // Quitado para evitar filtros que afectan a la tarjeta
    addKeyboardEffects();
    addRandomHeartBursts();
    addFloatingBubbles();
    // addGlitchEffect(); // Desactivado para evitar efecto de error
}

// Crear corazones flotantes estilo Minecraft
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    // Corazones estilo Minecraft pixelados
    const heartSymbols = ['♥', '❤', '💗', '�', '�'];
    
    heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart minecraft-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Posición aleatoria
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        // Solo colores rosas como pediste
        const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6b9d'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remover el corazón después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }, 400);  // Menos frecuentes para mejor efecto
}

// Efecto de brillos al hacer clic
function addSparkleEffect() {
    document.addEventListener('click', function(e) {
        createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Manejar respuesta "SÍ" (ahora todas las respuestas son positivas)
function handleYes() {
    const messageArea = document.getElementById('messageArea');
    
    // Mostrar mensaje "TQM"
    messageArea.style.display = 'block';
    
    // Crear explosión de corazones
    createHeartExplosion();
    
    // Reproducir sonido de celebración (si es posible)
    playSuccessSound();
    
    // Ocultar botones
    document.querySelector('.buttons-section').style.opacity = '0.3';
    document.querySelector('.buttons-section').style.pointerEvents = 'none';
    
    // Cambiar el fondo a algo más festivo
    document.body.style.background = '#ff69b4';
    
    // Parar la animación de carga
    if (loadingHeartsInterval) {
        clearInterval(loadingHeartsInterval);
    }
    
    // Agregar confetti
    setTimeout(() => {
        createConfetti();
    }, 500);
}

// Revelar todos los botones cuando se hace clic en uno
function revealAllButtons(clickedButton) {
    const allButtons = document.querySelectorAll('.hidden-btn');
    
    allButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.classList.remove('hidden-btn');
            btn.classList.add('revealed-btn');
            btn.textContent = btn.getAttribute('data-answer');
            btn.onclick = handleYes;
        }, index * 200);
    });
    
    // Crear efecto especial de revelación
    createRevealEffect();
}

// Efecto especial cuando se revelan los botones
function createRevealEffect() {
    // Explosión de brillos
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = '50%';
            sparkle.style.top = '70%';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'revealSparkle 1.5s ease-out forwards';
            
            const angle = (i / 15) * 360;
            const distance = Math.random() * 100 + 50;
            sparkle.style.setProperty('--reveal-angle', angle + 'deg');
            sparkle.style.setProperty('--reveal-distance', distance + 'px');
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }, i * 100);
    }
}

// Crear explosión de corazones
function createHeartExplosion() {
    const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6347', '#ffa500'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '♥';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '30px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (i / 30) * 360;
            const velocity = Math.random() * 200 + 100;
            
            heart.style.animation = `heartExplosion 2s ease-out forwards`;
            heart.style.setProperty('--angle', angle + 'deg');
            heart.style.setProperty('--velocity', velocity + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 50);
    }
}

// Crear confetti
function createConfetti() {
    const colors = ['#ff69b4', '#ffd700', '#00ff00', '#00bfff', '#ff6347', '#dda0dd'];
    const shapes = ['*', '+', 'x', '•', '○', '◦'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-50px';
            confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s ease-in forwards`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 100);
    }
}

// Intentar reproducir sonido de éxito
function playSuccessSound() {
    try {
        // Crear un contexto de audio simple
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('No se pudo reproducir sonido');
    }
}

// Agregar animaciones CSS dinámicas
const style = document.createElement('style');
style.textContent = `
    @keyframes heartExplosion {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--angle)) * var(--velocity)), 
                calc(-50% + sin(var(--angle)) * var(--velocity))
            ) scale(0.3) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) translateY(-30px) rotate(180deg);
        }
    }
    
    @keyframes burstOut {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--burst-angle)) * var(--burst-distance)),
                calc(-50% + sin(var(--burst-angle)) * var(--burst-distance))
            ) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes bubbleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(-100px) scale(1);
        }
        100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes particleExplosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--particle-angle)) * var(--particle-velocity)),
                calc(-50% + sin(var(--particle-angle)) * var(--particle-velocity))
            ) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes rotateAround {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(var(--rotate-radius)) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        80% {
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(var(--rotate-radius)) rotate(-360deg);
            opacity: 0;
        }
        animation-delay: var(--rotate-delay);
    }
    
    @keyframes spiralOut {
        0% {
            transform: translate(-50%, -50%) rotate(var(--spiral-angle)) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(calc(var(--spiral-angle) + 720deg)) translateX(var(--spiral-radius));
            opacity: 0;
        }
    }
    
    @keyframes waveUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 0;
        }
        animation-delay: var(--wave-delay);
    }
    
    @keyframes fireworkSpark {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--spark-angle)) * var(--spark-velocity)),
                calc(-50% + sin(var(--spark-angle)) * var(--spark-velocity))
            ) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes revealSparkle {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--reveal-angle)) * var(--reveal-distance)),
                calc(-50% + sin(var(--reveal-angle)) * var(--reveal-distance))
            ) scale(0.3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Funciones adicionales para interactividad
// Desactivar el seguimiento del mouse sobre la tarjeta para que no se mueva raro
// document.addEventListener('mousemove', function(e) {
//     const card = document.querySelector('.invitation-card');
//     if (card) {
//         const rect = card.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const deltaX = (e.clientX - centerX) / 50;
//         const deltaY = (e.clientY - centerY) / 50;
//         card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.01)`;
//     }
// });

// document.addEventListener('mouseleave', function() {
//     const card = document.querySelector('.invitation-card');
//     if (card) {
//         card.style.transform = 'translate(0, 0) scale(1)';
//     }
// });

// Agregar efecto de teclado para respuestas rápidas (solo Sí)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleYes();
    }
});

// ===== EFECTOS DIVERTIDOS ADICIONALES =====

// Rastro del mouse con corazones
function addMouseTrail() {
    let lastMousePos = { x: 0, y: 0 };

    document.addEventListener('mousemove', function(e) {
        // Crear corazón cada cierta distancia
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastMousePos.x, 2) +
            Math.pow(e.clientY - lastMousePos.y, 2)
        );

        if (distance > 15) { // Más frecuente
            createTrailHeart(e.clientX, e.clientY);
            lastMousePos = { x: e.clientX, y: e.clientY };
        }
    });
}

function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = '#ff69b4';
    heart.style.fontSize = (Math.random() * 16 + 22) + 'px'; // 22-38px
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.animation = 'trailFade 1.5s ease-out forwards';
    heart.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
    heart.style.filter = 'drop-shadow(0 0 8px #ff69b4)';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1600);
}

// Efecto de vibración de pantalla
function addScreenShake() {
    let shakeCount = 0;
    
    setInterval(() => {
        if (Math.random() < 0.1 && shakeCount < 3) { // 10% chance cada segundo
            shakeScreen();
            shakeCount++;
        } else if (shakeCount >= 3) {
            shakeCount = 0;
        }
    }, 1000);
}

function shakeScreen() {
    const body = document.body;
    let shakes = 0;
    const maxShakes = 6;
    
    const shakeInterval = setInterval(() => {
        if (shakes < maxShakes) {
            const intensity = 3;
            const x = (Math.random() - 0.5) * intensity;
            const y = (Math.random() - 0.5) * intensity;
            body.style.transform = `translate(${x}px, ${y}px)`;
            shakes++;
        } else {
            body.style.transform = 'translate(0, 0)';
            clearInterval(shakeInterval);
        }
    }, 50);
}

// Efecto arco iris en el fondo
function addRainbowEffect() {
    let hueShift = 0;
    
    setInterval(() => {
        hueShift += 1;
        if (hueShift > 360) hueShift = 0;
        
        document.body.style.filter = `hue-rotate(${hueShift}deg) saturate(1.1)`;
    }, 100);
}

// Efectos de teclado divertidos
function addKeyboardEffects() {
    document.addEventListener('keydown', function(e) {
        switch(e.key.toLowerCase()) {
            case 'h':
                createRandomHeartBurst();
                break;
            case 'c':
                createColorExplosion();
                break;
            case 'r':
                createRotatingHearts();
                break;
            case 's':
                createSpiralEffect();
                break;
            case 'w':
                createWaveEffect();
                break;
            case 'f':
                createFireworks();
                break;
        }
    });
}

// Explosiones aleatorias de corazones
function addRandomHeartBursts() {
    setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance cada segundo
            createRandomHeartBurst();
        }
    }, 1000);
}

function createRandomHeartBurst() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '♥';
            heart.style.position = 'fixed';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.color = '#ff1493';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const angle = (i / 8) * 360;
            const distance = 100;
            heart.style.animation = `burstOut 1.5s ease-out forwards`;
            heart.style.setProperty('--burst-angle', angle + 'deg');
            heart.style.setProperty('--burst-distance', distance + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }, i * 100);
    }
}

// Burbujas flotantes
function addFloatingBubbles() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            createBubble();
        }
    }, 2000);
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    bubble.style.position = 'fixed';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.top = window.innerHeight + 'px';
    bubble.style.width = (Math.random() * 30 + 10) + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.borderRadius = '50%';
    bubble.style.background = 'rgba(255, 105, 180, 0.3)';
    bubble.style.border = '2px solid rgba(255, 105, 180, 0.6)';
    bubble.style.pointerEvents = 'none';
    bubble.style.zIndex = '998';
    bubble.style.animation = 'bubbleFloat 4s ease-out forwards';
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 4000);
}

// Efecto glitch ocasional
function addGlitchEffect() {
    setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance
            glitchCard();
        }
    }, 1000);
}

function glitchCard() {
    const card = document.querySelector('.invitation-card');
    if (!card) return;
    
    let glitches = 0;
    const maxGlitches = 5;
    
    const glitchInterval = setInterval(() => {
        if (glitches < maxGlitches) {
            card.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg) contrast(' + (Math.random() * 2 + 0.5) + ')';
            card.style.transform = 'translate(' + (Math.random() - 0.5) * 10 + 'px, ' + (Math.random() - 0.5) * 10 + 'px) scale(' + (Math.random() * 0.1 + 0.95) + ')';
            glitches++;
        } else {
            card.style.filter = '';
            card.style.transform = '';
            clearInterval(glitchInterval);
        }
    }, 100);
}

// Explosión de colores
function createColorExplosion() {
    const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6347', '#ffa500', '#ffff00', '#00ff00', '#00bfff'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const angle = Math.random() * 360;
            const velocity = Math.random() * 300 + 100;
            particle.style.animation = 'particleExplosion 2s ease-out forwards';
            particle.style.setProperty('--particle-angle', angle + 'deg');
            particle.style.setProperty('--particle-velocity', velocity + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }, i * 50);
    }
}

// Corazones rotatorios
function createRotatingHearts() {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = '♥';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.color = '#ff1493';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'rotateAround 3s ease-in-out forwards';
        heart.style.setProperty('--rotate-delay', (i * 0.5) + 's');
        heart.style.setProperty('--rotate-radius', '100px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }
}

// Efecto espiral
function createSpiralEffect() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '♥';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.color = '#ff69b4';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'spiralOut 2s ease-out forwards';
            heart.style.setProperty('--spiral-angle', (i * 24) + 'deg');
            heart.style.setProperty('--spiral-radius', (i * 10) + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 100);
    }
}

// Efecto onda
function createWaveEffect() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '♥';
            heart.style.position = 'fixed';
            heart.style.left = (i * (window.innerWidth / 10)) + 'px';
            heart.style.top = '50%';
            heart.style.color = '#dc143c';
            heart.style.fontSize = '25px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.animation = 'waveUp 1.5s ease-in-out forwards';
            heart.style.setProperty('--wave-delay', (i * 0.1) + 's');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }, i * 100);
    }
}

// Fuegos artificiales
function createFireworks() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    
    // Explosión principal
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.width = '4px';
            spark.style.height = '4px';
            spark.style.background = '#ffff00';
            spark.style.borderRadius = '50%';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '1000';
            spark.style.boxShadow = '0 0 6px #ffff00';
            
            const angle = (i / 12) * 360;
            const velocity = Math.random() * 150 + 100;
            spark.style.animation = 'fireworkSpark 1.5s ease-out forwards';
            spark.style.setProperty('--spark-angle', angle + 'deg');
            spark.style.setProperty('--spark-velocity', velocity + 'px');
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 1500);
        }, i * 50);
    }
}
