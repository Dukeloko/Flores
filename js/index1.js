// JavaScript para index1.html

// Iniciar todo automáticamente al cargar la página
window.addEventListener('load', function () {
    const backgroundMusic = document.getElementById('background-music');

    // Reproducir música automáticamente
    backgroundMusic.play().catch(error => {
        console.log('Reproducción automática prevenida:', error);
        // En caso de que falle la reproducción automática, mostrar un mensaje
        alert('Por favor, haz clic en cualquier parte de la página para iniciar la música');
        document.body.addEventListener('click', function () {
            backgroundMusic.play();
        }, { once: true });
    });

    // Iniciar las partículas después de 3 segundos
    setTimeout(startParticles, 3000);

    // Iniciar la secuencia de efectos después de 8 segundos
    setTimeout(startEffectsSequence, 8000);
});

// Código para las partículas amarillas
let PARTICLE_INTENSITY = 50;
let PARTICLE_SPAWN_RATE = 500;
const PARTICLE_SPEED = 0.5;
const WIND_INTENSITY = 20;
let particleInterval;

function startParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < PARTICLE_INTENSITY; i++) {
        createParticle();
    }
    let intensityIncreaseInterval = setInterval(() => {
        PARTICLE_INTENSITY += 20;
        PARTICLE_SPAWN_RATE = Math.max(40, PARTICLE_SPAWN_RATE - 30);
        for (let i = 0; i < 10; i++) {
            createParticle();
        }
        if (PARTICLE_INTENSITY > 400 && PARTICLE_SPAWN_RATE <= 50) {
            clearInterval(intensityIncreaseInterval);
            PARTICLE_INTENSITY = 600;
            PARTICLE_SPAWN_RATE = 40;
            clearInterval(particleInterval);
            particleInterval = setInterval(createParticle, PARTICLE_SPAWN_RATE);
        } else if (!particleInterval) {
            particleInterval = setInterval(createParticle, PARTICLE_SPAWN_RATE);
        }
    }, 1000);
    setInterval(() => {
        const wind = (Math.random() * WIND_INTENSITY * 2) - WIND_INTENSITY;
        document.documentElement.style.setProperty('--wind', `${wind}px`);
    }, 2000);
}

function createParticle() {
    const particles = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Tamaño aleatorio entre 2px y 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Opacidad aleatoria
    const opacity = Math.random() * 0.7 + 0.3;
    particle.style.opacity = opacity;

    // Posición aleatoria
    const left = Math.random() * 100;

    // Duración aleatoria
    const duration = Math.random() * PARTICLE_SPEED + PARTICLE_SPEED;

    // Retraso aleatorio
    const delay = Math.random() * 2;

    // Inclinación aleatoria
    const tilt = (Math.random() * 20) - 10;

    // Viento aleatorio
    const wind = (Math.random() * WIND_INTENSITY) - (WIND_INTENSITY / 2);

    particle.style.left = left + 'vw';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    particle.style.transform = `rotate(${tilt}deg)`;
    particle.style.setProperty('--wind', `${wind}px`);

    particles.appendChild(particle);

    // Eliminar la partícula después de que termine la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
}

// Efectos de aura y texto
function startEffectsSequence() {
    // Crear aura que sube desde la flor
    const flower = document.querySelector('.flower--1');
    const aura = document.createElement('div');
    aura.className = 'flower-aura';
    document.body.appendChild(aura);

    // Animación del aura
    aura.style.opacity = '1';
    aura.style.height = '0';
    aura.style.transition = 'height 8s ease-out, opacity 8s ease-out';

    setTimeout(() => {
        aura.style.bottom = '0';
    }, 50);

    // Mostrar texto con efecto hacker
    setTimeout(() => {
        showHackerText();
    }, 2000);

    // Eliminar el aura después de la animación
    setTimeout(() => {
        aura.style.opacity = '0';
        setTimeout(() => {
            aura.remove();
        }, 1000);
    }, 8000);
}

function showHackerText() {
    const message = "Mas CHULA que las flores eres tu 🥳";
    const auraText = document.getElementById('aura-text');
    const finalMessage = document.getElementById('final-message');

    // Mostrar el contenedor de texto
    auraText.style.opacity = '1';

    // Crear cursor inicial
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    auraText.appendChild(cursor);

    // Dividir el mensaje en caracteres para un efecto de escritura más lento
    const characters = message.split('');
    let currentIndex = 0;

    // Función para mostrar caracteres uno por uno
    function showNextCharacter() {
        if (currentIndex < characters.length) {
            // Si es el primer carácter o el anterior era un espacio, crear un nuevo span
            if (currentIndex === 0 || characters[currentIndex - 1] === ' ') {
                const wordSpan = document.createElement('span');
                auraText.insertBefore(wordSpan, cursor);
            }

            // Agregar el carácter actual al último span
            const lastSpan = auraText.querySelector('span:not(.cursor)');
            lastSpan.textContent += characters[currentIndex];

            // Animación de entrada
            setTimeout(() => {
                lastSpan.style.opacity = '1';
                lastSpan.style.transform = 'translateY(0)';
            }, 50);

            currentIndex++;

            // Mostrar siguiente carácter después de un retraso
            setTimeout(showNextCharacter, 150);
        } else {
            // Todos los caracteres mostrados, eliminar cursor
            cursor.remove();

            // Transición al mensaje final
            setTimeout(() => {
                auraText.style.opacity = '0';
                auraText.style.transition = 'opacity 1s ease-out';

                setTimeout(() => {
                    finalMessage.textContent = message;
                    finalMessage.style.opacity = '1';
                    finalMessage.style.transition = 'opacity 1s ease-in';

                    // Cambiar a rojo brillante después de 3 segundos
                    setTimeout(() => {
                        finalMessage.classList.add('active');
                    }, 3000);
                }, 1000);
            }, 2000);
        }
    }

    // Iniciar la secuencia
    showNextCharacter();
}
