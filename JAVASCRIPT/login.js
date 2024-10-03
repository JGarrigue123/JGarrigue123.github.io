document.addEventListener('DOMContentLoaded', function() {
    let introScreen = document.getElementById('intro-screen');
    let nameForm = document.getElementById('nameForm');
    let userNameInput = document.getElementById('userName');
    let userNameDisplay = document.getElementById('userNameDisplay'); // L'élément où le prénom sera affiché

    // Vérifie si les éléments existent avant de les manipuler
    if (!introScreen) {
        console.error("L'un des éléments 'introScreen' n'existe pas dans le DOM.");
        return;
    }

    // Vérifie si un prénom est déjà stocké dans localStorage
    if (localStorage.getItem('userName')) {
        let storedName = localStorage.getItem('userName');
        if (userNameDisplay) {
            userNameDisplay.textContent = `Bienvenue, ${storedName}!`; // Afficher le prénom dans l'interface
        }
        introScreen.style.display = 'none'; // Masquer l'intro si le prénom est déjà stocké
    }

    // Gestion de la soumission du prénom
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        
        // Vérifie si le prénom est entré
        if (userNameInput.value.trim() !== '') {
            let userName = userNameInput.value.trim(); // Stocke le prénom dans une variable
            localStorage.setItem('userName', userName); // Stocke le prénom dans localStorage
            
            if (userNameDisplay) {
                userNameDisplay.textContent = `Bienvenue, ${userName}!`; // Afficher le prénom dans le menu de démarrage
            }
            
            // Fais disparaître l'écran d'intro
            introScreen.classList.add('fade-out');
            
            // Attends la fin de l'animation avant d'afficher le contenu principal
            setTimeout(function() {
                introScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 600); // Durée de la transition correspondante au CSS
        }
    });
});
