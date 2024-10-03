const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const activeLink = document.querySelector('.navbar a.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }

        this.classList.add('active');
    });
});
