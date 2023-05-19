// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "92935528444",
  appId: "1:92935528444:web:57786855ed9cc7ef129c79"
};


// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const database = firebase.database();

// Obtenez une référence à la table dans laquelle vous souhaitez enregistrer les équipements
const equipmentRef = database.ref("equipments");

// Obtenez une référence à l'élément du formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById("addEquipmentForm");

// Obtenez une référence à l'élément du tableau des équipements
const equipmentTableBody = document.getElementById("equipmentTableBody");

// Obtenez une référence à l'élément du modal
const addEquipmentModal = document.getElementById("addEquipmentModal");

// Obtenez une référence à l'élément canvas
const photoCanvas = document.getElementById("photoCanvas");
const captureButton = document.getElementById("captureButton");

// Gérer le clic sur le bouton "Ajouter un équipement"
document.getElementById("addEquipmentButton").addEventListener("click", function() {
  addEquipmentModal.style.display = "block";
});

// Gérer la soumission du formulaire d'ajout d'équipement
addEquipmentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const nom = addEquipmentForm.nom.value;
  const description = addEquipmentForm.description.value;
  const quantite = parseInt(addEquipmentForm.quantite.value);

  // Enregistrer les données dans la base de données
  const equipment = {
    nom: nom,
    description: description,
    quantite: quantite
  };
  equipmentRef.push(equipment);

  // Réinitialiser les champs du formulaire
  addEquipmentForm.reset();

  // Masquer le modal après l'ajout de l'équipement
  hideModal();
});

// Gérer le clic sur le bouton "Capturer la photo"
captureButton.addEventListener("click", capturePhoto);

// Fonction de capture de photo
function capturePhoto() {
  // Obtenir une référence à la vidéo en cours d'affichage
  const cameraPreview = document.getElementById("cameraPreview");

  // Dessiner la vidéo sur le canevas
  const context = photoCanvas.getContext("2d");
  context.drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);

  // Vous pouvez maintenant utiliser les données du canevas (photo) comme vous le souhaitez,
  // par exemple, l'enregistrer sur le serveur, l'afficher à l'utilisateur, etc.
}

// Masquer le modal
function hideModal() {
  addEquipmentModal.style.display = "none";
}

// Gérer les modifications des équipements dans la base de données
equipmentRef.on("value", function(snapshot) {
  // Réinitialiser le tableau des équipements
  equipmentTableBody.innerHTML = "";

  // Parcourir les équipements de la base de données
  snapshot.forEach(function(childSnapshot) {
    const equipmentKey = childSnapshot.key;
    const equipmentData = childSnapshot.val();

    // Créer une nouvelle ligne dans le tableau pour chaque équipement
    const row = document.createElement("tr");

    // Créer les cellules de données pour l'équipement
    const nomCell = document.createElement("td");
    nomCell.textContent = equipmentData.nom;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = equipmentData.description;

    const quantiteCell = document.createElement("td");
    quantiteCell.textContent = equipmentData.quantite;

    // Ajouter les cellules de données à la ligne
    row.appendChild(nomCell);
    row.appendChild(descriptionCell);
    row.appendChild(quantiteCell);

    // Ajouter la ligne au tableau
    equipmentTableBody.appendChild(row);
  });
});
