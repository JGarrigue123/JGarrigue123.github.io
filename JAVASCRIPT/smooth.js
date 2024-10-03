// const liens nav
const links = document.querySelectorAll('a');

// défilement
function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // cible
    const startPosition = window.pageYOffset; // start
    const distance = targetPosition - startPosition; 
    let startTime = null; 

    // anim scroll
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime; // temps start
        const timeElapsed = currentTime - startTime; 
        const run = ease(timeElapsed, startPosition, distance, duration); 

        window.scrollTo(0, run); // scroll
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // ease
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 

        // id selec cible
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        smoothScroll(targetSection, 2000);
    });
});
