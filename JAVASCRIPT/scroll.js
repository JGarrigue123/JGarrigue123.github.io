// Vérifier si l'appareil est mobile ou tablette
const isMobileOrTablet = window.matchMedia("(max-width: 768px)").matches;

// Récupérer toutes les sections
const sections = document.querySelectorAll('section');
let isScrolling = false; // État pour empêcher les défilements multiples
let currentSectionIndex = 0; // Index de la section actuelle

// Fonction de défilement fluide
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Position cible
    const startPosition = window.pageYOffset; // Position de départ
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Animation de défilement
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // Temps de départ
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run); // Scroll
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Fonction easing
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Événement de défilement
window.addEventListener('wheel', (event) => {
    // Si c'est un appareil mobile ou tablette, ne pas faire de défilement animé
    if (isMobileOrTablet) {
        return; // Ignore le défilement
    }

    if (isScrolling) return; // Empêche le défilement multiple
    isScrolling = true; // Définit l'état de défilement à vrai

    const delta = event.deltaY; // Détermination de la direction du défilement
    let targetSection;
    const totalSections = sections.length;

    // Déterminer la section cible pour le défilement
    if (delta > 0) { // Défilement vers le bas
        if (currentSectionIndex < totalSections - 1) {
            targetSection = sections[currentSectionIndex + 1];
        } else {
            // Si on est sur la dernière section, remonter tout en haut
            targetSection = sections[0];
        }
    } else if (delta < 0 && currentSectionIndex > 0) { // Défilement vers le haut
        targetSection = sections[currentSectionIndex - 1];
    }

    // Si une section cible est trouvée et n'est pas la section actuelle, défilez-la
    if (targetSection && targetSection !== sections[currentSectionIndex]) {
        smoothScroll(targetSection, 1200); // Défilement vers la section cible

        // Mettre à jour l'index de la section actuelle
        currentSectionIndex = Array.from(sections).indexOf(targetSection);
    }

    // Réinitialiser l'état de défilement après un court délai pour empêcher le spam
    setTimeout(() => {
        isScrolling = false; // Réinitialiser l'état de défilement
    }, 1200); // Durée de l'animation
});

// Fonction pour mettre à jour le lien actif
function updateActiveLink() {
    const scrollPosition = window.pageYOffset;

    const navLinks = document.querySelectorAll('.navbar a'); // Récupérer les liens de navigation

    navLinks.forEach(link => {
        const targetSection = document.querySelector(link.getAttribute('href'));

        // Vérifier si la section est visible dans la fenêtre
        if (
            targetSection.offsetTop <= scrollPosition + 50 && // On peut ajuster cette valeur
            targetSection.offsetTop + targetSection.offsetHeight > scrollPosition + 50
        ) {
            // Supprimer la classe active de tous les liens
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Ajouter la classe active au lien correspondant
            link.classList.add('active');
        }
    });
}

// Mettre à jour le lien actif lors du défilement
window.addEventListener('scroll', updateActiveLink);
