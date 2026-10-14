
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// liste des trois lieux demandés
const lieux = [
    {
        nom: "Université de Mayotte",
        latitude: -12.845145,
        longitude: 45.187671,
        description: "Le Centre universitaire de Mayotte, situé à Dembéni."
    },
    {
        nom: "Vestiges de l'ancienne usine sucrière d'Hajangoua",
        latitude: -12.862733,
        longitude: 45.197735,
        description: "Un site historique situé à Hajangoua.",
        personnalise: true
    },
    {
        nom: "Plage de la Bonne Marée",
        latitude: -12.85482,
        longitude: 45.19762,
        description: "Un lieu du littoral de Mayotte."
    }
];

// création de la carte centrée sur Dembéni
const map = L.map("carte").setView([-12.854, 45.192], 14);

// ajout du fond de carte OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// création de l'icône personnalisée rouge
const iconePersonnalisee = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// ajout des marqueurs et des fenêtres d'information
lieux.forEach((lieu) => {
    const options = lieu.personnalise
        ? { icon: iconePersonnalisee }
        : {};

    const marqueur = L.marker(
        [lieu.latitude, lieu.longitude],
        options
    ).addTo(map);

    marqueur.bindPopup(`
        <h3>${lieu.nom}</h3>
        <p>${lieu.description}</p>
        <p>Latitude : ${lieu.latitude}</p>
        <p>Longitude : ${lieu.longitude}</p>
    `);

    marqueur.on("click", () => {
        alert(
            `${lieu.nom}\n` +
            `Latitude : ${lieu.latitude}\n` +
            `Longitude : ${lieu.longitude}`
        );
    });
});

// ajout du fond animé Vanta.js
if (window.VANTA && window.VANTA.NET) {
    window.VANTA.NET({
        el: "#fond-anime",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color: 0x40e0d0,
        backgroundColor: 0x063b4c,
        points: 12,
        maxDistance: 22,
        spacing: 18
    });
}