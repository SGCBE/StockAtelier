import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Référence à la collection "equipments" dans la base de données
const equipmentRef = ref(db, "equipments");

// Fonction pour ajouter un nouvel équipement
function addEquipment(equipment) {
  push(equipmentRef, equipment);
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  const equipmentToDeleteRef = ref(db, `equipments/${equipmentId}`);
  remove(equipmentToDeleteRef);
}

// Fonction de rappel pour mettre à jour la liste des équipements
function updateEquipmentList(snapshot) {
  const equipmentTableBody = document.getElementById("equipmentTableBody");
  equipmentTableBody.innerHTML = "";

  snapshot.forEach((childSnapshot) => {
    const equipment = childSnapshot.val();
    const equipmentId = childSnapshot.key;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${equipment.nom}</td>
      <td>${equipment.description}</td>
      <td>${equipment.quantite}</td>
      <td>
        <button onclick="deleteEquipment('${equipmentId}')">Supprimer</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
}

// Écouter les modifications dans la base de données
onValue(equipmentRef, updateEquipmentList);

// Fonction pour masquer le modal
function hideModal() {
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  addEquipmentModal.style.display = "none";
}

// Gérer la soumission du formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById("addEquipmentForm");
addEquipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomInput = document.getElementById("nom");
  const descriptionInput = document.getElementById("description");
  const quantiteInput = document.getElementById("quantite");

  const equipment = {
    nom: nomInput.value,
    description: descriptionInput.value,
    quantite: quantiteInput.value
  };

  addEquipment(equipment);

  nomInput.value = "";
  descriptionInput.value = "";
  quantiteInput.value = "";

  hideModal();
});

// Fonction pour afficher le modal
function showModal() {
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  addEquipmentModal.style.display = "block";
}

// Gérer le clic sur le bouton "Ajouter un équipement"
const addEquipmentButton = document.getElementById("addEquipmentButton");
addEquipmentButton.addEventListener("click", showModal);
