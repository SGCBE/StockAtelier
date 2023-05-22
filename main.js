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
const db = firebase.firestore();

// Référence à la collection "equipments" dans la base de données
const equipmentRef = db.collection("equipments");

// Fonction pour ajouter un nouvel équipement
function addEquipment(equipment) {
  equipmentRef.add(equipment);
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  equipmentRef.doc(equipmentId).delete();
}

// Fonction de rappel pour mettre à jour la liste des équipements
function updateEquipmentList(snapshot) {
  const equipmentTableBody = document.getElementById("equipmentTableBody");
  equipmentTableBody.innerHTML = "";

  snapshot.forEach((doc) => {
    const equipment = doc.data();
    const equipmentId = doc.id;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${equipment.categorie}</td>
      <td>${equipment.description}</td>
      <td>${equipment.quantite}</td>
      <td>
        <button onclick="deleteEquipment('${equipmentId}')">Supprimer</button>
        <button onclick="openModal('${equipmentId}')">Détails</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
}

// Écouter les modifications dans la base de données
equipmentRef.onSnapshot(updateEquipmentList);

// Fonction pour masquer le modal
function hideModal() {
  const modal = document.getElementById("equipmentModal");
  modal.style.display = "none";
}

// Fonction pour afficher le modal avec les détails de l'équipement
function openModal(equipmentId) {
  const modal = document.getElementById("equipmentModal");
  const modalContent = document.getElementById("modalContent");

  equipmentRef.doc(equipmentId).get().then((doc) => {
    const equipment = doc.data();

    modalContent.innerHTML = `
      <h2>Détails de l'équipement</h2>
      <p><strong>Catégorie:</strong> ${equipment.categorie}</p>
      <p><strong>Désignation:</strong> ${equipment.designation}</p>
      <p><strong>Description:</strong> ${equipment.description}</p>
      <img src="${equipment.photo}" alt="Photo de l'équipement">
      <button onclick="hideModal()">Retour à la liste des équipements</button>
    `;

    modal.style.display = "block";
  });
}

// Fonction pour masquer le modal de capture de photo
function hideCapturePhotoModal() {
  const capturePhotoModal = document.getElementById("capturePhotoModal");
  capturePhotoModal.style.display = "none";
}

// Fonction pour afficher le modal de capture de photo
function showCapturePhotoModal() {
  const capturePhotoModal = document.getElementById("capturePhotoModal");
  capturePhotoModal.style.display = "block";
}

// Fonction pour capturer une photo depuis la caméra
function capturePhoto() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const photoUrl = canvas.toDataURL("image/jpeg");
  const photoInput = document.getElementById("photo");
  photoInput.value = photoUrl;

  hideCapturePhotoModal();
}

// Gérer la soumission du formulaire d'ajout d'équipement
document.addEventListener("DOMContentLoaded", () => {
  const addEquipmentForm = document.getElementById("addEquipmentForm");
  if (addEquipmentForm) {
    addEquipmentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const categorieInput = document.getElementById("categorie");
      const designationInput = document.getElementById("designation");
      const descriptionInput = document.getElementById("description");
      const photoInput = document.getElementById("photo");
      const quantiteInput = document.getElementById("quantite");

      const equipment = {
        categorie: categorieInput.value,
        designation: designationInput.value,
        description: descriptionInput.value,
        photo: photoInput.value,
        quantite: parseInt(quantiteInput.value)
      };

      addEquipment(equipment);

      categorieInput.value = "";
      designationInput.value = "";
      descriptionInput.value = "";
      photoInput.value = "";
      quantiteInput.value = "";
    });
  }
});
