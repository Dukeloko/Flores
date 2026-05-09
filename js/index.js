// JavaScript para index.html

// Crear efecto de espacio con partículas
function createSpace() {
    const space = document.getElementById('space');
    
    // Crear partículas
    for (let i = 0; i < 100; i++) {
        createParticle(space);
    }
    
    // Continuar creando partículas
    setInterval(() => {
        createParticle(space);
    }, 200);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Tamaño aleatorio entre 1 y 3px
    const size = Math.random() * 2 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Posición aleatoria en X
    particle.style.left = Math.random() * 100 + '%';
    
    // Duración aleatoria entre 5 y 15 segundos
    const duration = Math.random() * 10 + 5;
    particle.style.animationDuration = duration + 's';
    
    // Retraso aleatorio
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
    
    // Eliminar la partícula después de que termine la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000 + 1000);
}

// Mostrar elementos secuencialmente
function showElements() {
    const title = document.getElementById('title');
    const message1 = document.getElementById('message1');
    const message2 = document.getElementById('message2');
    const button = document.getElementById('button');
    
    setTimeout(() => {
        title.classList.add('visible');
    }, 1000);
    
    setTimeout(() => {
        message1.classList.add('visible');
    }, 3000);
    
    setTimeout(() => {
        message2.classList.add('visible');
    }, 6000);
    
    setTimeout(() => {
        button.classList.add('visible');
    }, 9000);
}

// Inicializar
window.onload = function() {
    createSpace();
    showElements();
};
