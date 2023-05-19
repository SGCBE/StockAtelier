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


// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Référence à la collection "equipments" dans la base de données
const equipmentRef = db.ref("equipments");

// Référence aux éléments du DOM
const equipmentTableBody = document.getElementById("equipmentTableBody");
const addEquipmentForm = document.getElementById("addEquipmentForm");
const addEquipmentModal = document.getElementById("addEquipmentModal");
const captureButton = document.getElementById("captureButton");
const photoCanvas = document.getElementById("photoCanvas");

// Écouter l'événement de soumission du formulaire "addEquipmentForm"
addEquipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const nom = addEquipmentForm.nom.value;
  const description = addEquipmentForm.description.value;
  const quantite = parseInt(addEquipmentForm.quantite.value);

  // Récupérer l'image capturée
  const photoDataUrl = photoCanvas.toDataURL("image/jpeg");

  // Créer un nouvel équipement avec les valeurs du formulaire
  const newEquipment = {
    nom: nom,
    description: description,
    quantite: quantite,
    photo: photoDataUrl
  };

  // Ajouter le nouvel équipement à la base de données
  equipmentRef.push(newEquipment);

  // Réinitialiser le formulaire
  addEquipmentForm.reset();

  // Cacher le modal
  hideModal();
});

// Fonction pour afficher le modal
function showModal() {
  addEquipmentModal.style.display = "block";
}

// Fonction pour masquer le modal
function hideModal() {
  addEquipmentModal.style.display = "none";
}

// Fonction pour dessiner la vidéo de la caméra sur le canevas
function drawVideoOnCanvas(videoElement, canvasElement) {
  const context = canvasElement.getContext("2d");
  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
}

// Fonction pour capturer une photo à partir de la vidéo de la caméra
function capturePhoto() {
  drawVideoOnCanvas(video, photoCanvas);
}

// Obtenir une référence à l'élément vidéo
const cameraPreview = document.getElementById("cameraPreview");

// Obtenir une référence au bouton "Ajouter un équipement"
const addEquipmentButton = document.getElementById("addEquipmentButton");

// Obtenir une référence au bouton de fermeture du modal
const closeModalButton = document.getElementById("closeModalButton");

// Gérer le clic sur le bouton "Ajouter un équipement"
addEquipmentButton.addEventListener("click", () => {
  showModal();
});

// Gérer le clic sur le bouton de fermeture du modal
closeModalButton.addEventListener("click", () => {
  hideModal();
});

// Obtenir l'accès à la caméra et afficher la vidéo sur l'élément <video>
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    cameraPreview.srcObject = stream;
  })
  .catch((error) => {
    console.error("Erreur lors de l'accès à la caméra :", error);
  });

// Gérer le clic sur le bouton de capture
captureButton.addEventListener("click", capturePhoto);

// Écouter les modifications des équipements dans la base de données
equipmentRef.on("value", (snapshot) => {
  // Réinitialiser le contenu de la table
  equipmentTableBody.innerHTML = "";

  // Parcourir les équipements de la base de données
  snapshot.forEach((childSnapshot) => {
    const equipmentKey = childSnapshot.key;
    const equipmentData = childSnapshot.val();

    // Générer une ligne pour l'équipement
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${equipmentData.nom}</td>
      <td>${equipmentData.description}</td>
      <td>${equipmentData.quantite}</td>
      <td>
        <button onclick="deleteEquipment('${equipmentKey}')">Supprimer</button>
      </td>
    `;

    // Ajouter la ligne à la table
    equipmentTableBody.appendChild(row);
  });
});

// Fonction pour supprimer un équipement de la base de données
function deleteEquipment(key) {
  equipmentRef.child(key).remove();
}
