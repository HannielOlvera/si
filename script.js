// Variables globales
let heartsInterval;
let noClickCount = 0;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    addSparkleEffect();
});

// Crear corazones flotantes
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartSymbols = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '🤎'];
    
    heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Posición aleatoria
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remover el corazón después de la animación
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }, 300);
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
    const messageSection = document.getElementById('messageSection');
    const successMessage = document.getElementById('successMessage');
    
    // Mostrar mensaje de éxito
    messageSection.style.display = 'block';
    
    // Crear explosión de corazones
    createHeartExplosion();
    
    // Reproducir sonido de celebración (si es posible)
    playSuccessSound();
    
    // Ocultar botones
    document.querySelector('.buttons-section').style.opacity = '0.5';
    document.querySelector('.buttons-section').style.pointerEvents = 'none';
    
    // Cambiar el fondo a algo más festivo
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffd1ff 100%)';
    
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
            heart.textContent = '💖';
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
    const shapes = ['🎊', '🎉', '✨', '🌟', '💫', '⭐'];
    
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
