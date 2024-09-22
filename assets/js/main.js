let tools = [];

// Fonction pour charger les données du CSV
function loadCSV() {
    fetch('assets/csv/tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            tools = rows.map(row => {
                const [﻿title, description, buttonText, link, image, status] = row.split(';');
                return { ﻿title, description, buttonText, link, image, status };
            });
            displayCards(); // Affiche toutes les cartes après le chargement
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

function displayCards() {
    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    tools.forEach(tool => {
        if (tool.title && tool.buttonText && tool.title !== "Encore plus de choses à découvrir !") {
            const cardHTML = `
                <div class="${tool.status}">
                    <div class="card-image-container">
                        <img src="${tool.image}" alt="${tool.title}">
                    </div>
                    <div class="card-content">
                        <h2>${tool.title}</h2>
                        <p>${tool.description}</p>
                    </div>
                    <a href="${tool.link}">
                        <button class="button">${tool.buttonText}</button>
                    </a>
                </div>
            `;
            content.innerHTML += cardHTML;
        }
    });
}

function randomCard() {
    fetch('assets/csv/tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            const tools = rows.map(row => {
                const [title, description, buttonText, link, image, status] = row.split(';');
                return { title, description, buttonText, link, image, status };
            });

            // Filtrer les outils actifs
            const activeTools = tools.filter(tool => 
                tool.status && tool.status.trim() === 'card' && tool.title.trim() !== "Encore plus de choses à découvrir !"
            );
            
            // Log pour voir les outils actifs dans la console
            console.log('Outils actifs:', activeTools);

            // Choisir 2 outils aléatoires parmi les actifs
            const selectedTools = [];
            while (selectedTools.length < 2 && activeTools.length > 0) {
                const randomIndex = Math.floor(Math.random() * activeTools.length);
                selectedTools.push(activeTools[randomIndex]);
                activeTools.splice(randomIndex, 1); // Éliminer l'outil choisi pour éviter les doublons
            }

            // Ajouter la carte "Encore plus de choses à découvrir !"
            const discoverMore = tools.find(tool => tool.title && tool.title.trim() === "Encore plus de choses à découvrir !");
            if (discoverMore) {
                selectedTools.push(discoverMore);
            }

            displayRandomCards(selectedTools); // Appeler la fonction pour afficher les cartes
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Fonction pour afficher les cartes aléatoires
function displayRandomCards(selectedTools) {
    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    selectedTools.forEach(tool => {
        if (tool.title && tool.buttonText) {
            const cardHTML = `
                <div class="${tool.status}">
                    <div class="card-image-container">
                        <img src="${tool.image}" alt="${tool.title}">
                    </div>
                    <div class="card-content">
                        <h2>${tool.title}</h2>
                        <p>${tool.description}</p>
                    </div>
                    <a href="${tool.link}">
                        <button class="button">${tool.buttonText}</button>
                    </a>
                </div>
            `;
            content.innerHTML += cardHTML;
        }
    });
}

// Appel de la fonction pour charger les données
loadCSV();




let challenges = [];

// Fonction pour charger les défis depuis le CSV
function loadChallenges() {
    fetch('assets/csv/MissionFun_liste.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            challenges = rows.map(row => row.trim()).filter(row => row !== ''); // Filtrer les lignes vides
            displayRandomChallenge(); // Afficher un défi au chargement
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Fonction pour afficher un défi aléatoire
function displayRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const selectedChallenge = challenges[randomIndex];
    document.getElementById('défi').textContent = selectedChallenge;
}

// Événement pour le bouton "Un autre challenge"
document.querySelector('.tool-button a').addEventListener('click', (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    displayRandomChallenge(); // Afficher un nouveau défi
});

// Appel de la fonction pour charger les défis
loadChallenges();

// Fonction pour charger et afficher un thème de réunion aléatoire
function loadRandomMeetingTheme() {
    fetch('assets/csv/reunions_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore la première ligne (l'en-tête du CSV)

            const themes = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher un thème aléatoire
            function displayRandomTheme() {
                if (themes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * themes.length);
                    const randomTheme = themes[randomIndex];
                    document.getElementById('réunion').textContent = randomTheme; // Mettre à jour le texte du H1
                }
            }

            // Afficher un thème lors du chargement initial
            displayRandomTheme();

            // Ajouter un événement au clic du bouton pour générer un autre thème aléatoire
            document.querySelector('.button.button-pink').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomTheme(); // Afficher un nouveau thème
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomMeetingTheme();

function loadRandomEscapeTask() {
    fetch('assets/csv/echappatoire_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore la première ligne (l'en-tête du CSV)

            const tasks = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une tâche aléatoire
            function displayRandomTask() {
                if (tasks.length > 0) {
                    const randomIndex = Math.floor(Math.random() * tasks.length);
                    const randomTask = tasks[randomIndex];
                    document.getElementById('echappatoire').textContent = randomTask; // Mettre à jour le texte du H1
                }
            }

            // Afficher une tâche lors du chargement initial
            displayRandomTask();

            // Ajouter un événement au clic du bouton pour générer une nouvelle tâche aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomTask(); // Afficher une nouvelle tâche
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomEchappatoire();

function loadRandomUrgentTask() {
    fetch('assets/csv/urgence_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore la première ligne (l'en-tête du CSV)

            const tasks = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une tâche aléatoire
            function displayRandomTask() {
                if (tasks.length > 0) {
                    const randomIndex = Math.floor(Math.random() * tasks.length);
                    const randomTask = tasks[randomIndex];
                    document.getElementById('urgence').textContent = randomTask; // Mettre à jour le texte du H1
                }
            }

            // Afficher une tâche lors du chargement initial
            displayRandomTask();

            // Ajouter un événement au clic du bouton pour générer une nouvelle tâche aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomTask(); // Afficher une nouvelle tâche
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomUrgentTask();

function loadRandomJustification() {
    fetch('assets/csv/justification_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore la première ligne (l'en-tête du CSV)

            const justifications = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une justification aléatoire
            function displayRandomJustification() {
                if (justifications.length > 0) {
                    const randomIndex = Math.floor(Math.random() * justifications.length);
                    const randomJustification = justifications[randomIndex];
                    document.getElementById('justification').textContent = randomJustification; // Mettre à jour le texte du H1
                }
            }

            // Afficher une justification lors du chargement initial
            displayRandomJustification();

            // Ajouter un événement au clic du bouton pour générer une nouvelle justification aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomJustification(); // Afficher une nouvelle justification
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomJustification();

function loadRandomDistinction() {
    fetch('assets/csv/distinction_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore la première ligne (l'en-tête du CSV)

            const distinctions = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une distinction aléatoire
            function displayRandomDistinction() {
                if (distinctions.length > 0) {
                    const randomIndex = Math.floor(Math.random() * distinctions.length);
                    const randomDistinction = distinctions[randomIndex];
                    document.getElementById('distinction').textContent = randomDistinction; // Mettre à jour le texte du H1
                }
            }

            // Afficher une distinction lors du chargement initial
            displayRandomDistinction();

            // Ajouter un événement au clic du bouton pour générer une nouvelle distinction aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomDistinction(); // Afficher une nouvelle distinction
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomDistinction();
