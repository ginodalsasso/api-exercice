const inputCP = document.querySelector(".cp");
const selectVille = document.querySelector(".ville");
let map; // Déclaration d'une variable globale pour stocker l'instance de la carte

inputCP.addEventListener("input", () => {
    let value = inputCP.value;
    selectVille.innerText = null;

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=code,nom,departement,codeDepartement,codeRegion,region,centre,codesPostaux&format=json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        data.forEach(ville => {
            let option = document.createElement("option");
            option.value = ville.code;
            option.innerHTML = ville.nom;
            selectVille.appendChild(option);
        });

        // Une fois que les données de la ville sont obtenues, mettre à jour la carte
        const coorditate = [data[0].centre.coordinates[1], data[0].centre.coordinates[0]]; // Coordonnées du premier résultat
        
        // Si la carte n'existe pas encore, créer une nouvelle carte, sinon, mettre à jour la vue de la carte existante
        if (!map) {
            map = L.map('map').setView(coorditate, 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);    
        } else {
            map.setView(coorditate, 12);
        }
        const marker = L.marker(coorditate).addTo(map);
    })
});