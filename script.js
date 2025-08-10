// Variables globales
let heartsInterval;    // Solo corazones básicos pixelados
    const heartSymbols = ['♥', '♥', '♥', '♥'];  // Solo corazones simpleset loadingHeartsInterval;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createLoadingHearts();
    addSparkleEffect();
});

// Crear corazones en la pantalla de carga estilo Minecraft
function createLoadingHearts() {
    const loadingContainer = document.querySelector('.minecraft-hearts-rain');
    if (!loadingContainer) return;
    
    loadingHeartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'minecraft-heart-pixel';
        
        // Posición aleatoria en x
        heart.style.left = Math.random() * 280 + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heart.style.animationDelay = Math.random() * 1 + 's';
        
        // Colores rosa estilo Minecraft
        const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6b9d'];
        heart.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        loadingContainer.appendChild(heart);
        
        // Remover después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }, 150);
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
    
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
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
`;
document.head.appendChild(style);

// Funciones adicionales para interactividad
document.addEventListener('mousemove', function(e) {
    // Efecto sutil de seguimiento del mouse
    const card = document.querySelector('.invitation-card');
    if (card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.01)`;
    }
});

// Resetear posición cuando el mouse sale
document.addEventListener('mouseleave', function() {
    const card = document.querySelector('.invitation-card');
    if (card) {
        card.style.transform = 'translate(0, 0) scale(1)';
    }
});

// Agregar efecto de teclado para respuestas rápidas (solo Sí)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleYes();
    }
});
