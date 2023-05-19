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

// Référence à la base de données
const db = firebase.database();

// Référence à la collection "equipments"
const equipmentRef = db.ref("equipments");

// Fonction pour ajouter un équipement
function addEquipment(event) {
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const nom = document.getElementById("nom").value;
  const description = document.getElementById("description").value;
  const quantite = parseInt(document.getElementById("quantite").value);

  // Créer un nouvel équipement et l'ajouter à la base de données
  const newEquipment = {
    nom: nom,
    description: description,
    quantite: quantite,
    photo: ""
  };

  equipmentRef
    .push(newEquipment)
    .then((snapshot) => {
      // Réinitialiser les champs du formulaire
      document.getElementById("nom").value = "";
      document.getElementById("description").value = "";
      document.getElementById("quantite").value = "";

      // Capturer la photo
      const video = document.getElementById("cameraPreview");
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoURL = canvas.toDataURL();
      newEquipment.photo = photoURL;

      // Mettre à jour la liste des équipements
      getEquipments();

      // Fermer le modal
      hideModal();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
}

// Fonction pour afficher la liste des équipements
function displayEquipmentList(equipments) {
  const equipmentTableBody = document.getElementById("equipmentTableBody");
  equipmentTableBody.innerHTML = "";

  equipments.forEach((equipment) => {
    const row = document.createElement("tr");

    const nomCell = document.createElement("td");
    nomCell.textContent = equipment.nom;
    row.appendChild(nomCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = equipment.description;
    row.appendChild(descriptionCell);

    const quantiteCell = document.createElement("td");
    quantiteCell.textContent = equipment.quantite;
    row.appendChild(quantiteCell);

    const actionsCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      deleteEquipment(equipment.id);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    equipmentTableBody.appendChild(row);
  });
}

// Fonction pour afficher le modal d'ajout d'équipement
function showModal() {
  const modal = document.getElementById("addEquipmentModal");
  modal.style.display = "block";

  // Obtenir l'accès à la caméra
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      const video = document.getElementById("cameraPreview");
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error("Erreur lors de l'accès à la caméra :", error);
    });

  // Capturer la photo
  const captureButton = document.getElementById("captureButton");
  captureButton.addEventListener("click", capturePhoto);
}

// Fonction pour masquer le modal d'ajout d'équipement
function hideModal() {
  const modal = document.getElementById("addEquipmentModal");
  modal.style.display = "none";

  // Arrêter la vidéo et libérer l'accès à la caméra
  const video = document.getElementById("cameraPreview");
  if (video.srcObject) {
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
  }
}

// Fonction pour capturer la photo
function capturePhoto() {
  const video = document.getElementById("cameraPreview");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const photoURL = canvas.toDataURL();

  // Mettre à jour la valeur de la photo dans le nouvel équipement
  const newEquipment = {
    photo: photoURL
  };

  // Faire le traitement supplémentaire avec newEquipment si nécessaire

  // ...
}

// Événement pour afficher le modal d'ajout d'équipement lors du clic sur le bouton "Ajouter un équipement"
window.addEventListener("DOMContentLoaded", () => {
  const addEquipmentButton = document.getElementById("addEquipmentButton");
  addEquipmentButton.addEventListener("click", showModal);
});

// Événement pour masquer le modal d'ajout d'équipement lors du clic sur le bouton "Fermer" du modal
const closeModalButton = document.getElementById("closeModalButton");
closeModalButton.addEventListener("click", hideModal);

// Événement pour ajouter un équipement lors de la soumission du formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById("addEquipmentForm");
addEquipmentForm.addEventListener("submit", addEquipment);

// Fonction pour récupérer la liste des équipements depuis la base de données
function getEquipments() {
  equipmentRef
    .once("value")
    .then((snapshot) => {
      const equipments = [];
      snapshot.forEach((childSnapshot) => {
        const equipment = {
          id: childSnapshot.key,
          ...childSnapshot.val()
        };
        equipments.push(equipment);
      });

      displayEquipmentList(equipments);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des équipements :", error);
    });
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  equipmentRef
    .child(equipmentId)
    .remove()
    .then(() => {
      getEquipments();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'équipement :", error);
    });
}

// Appel initial pour afficher la liste des équipements
getEquipments();
