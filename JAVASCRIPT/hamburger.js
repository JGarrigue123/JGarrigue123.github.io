document.addEventListener('DOMContentLoaded', function() {
    let burger = document.getElementById('burger');
    let mobileNav = document.getElementById('mobile-nav');

    burger.addEventListener('click', function() {
        // Afficher ou cacher le menu mobile
        mobileNav.classList.toggle('active');
        // Gérer l'animation du hamburger
        this.classList.toggle('active');
    });
});
