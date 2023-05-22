// Configuration de Firebase
const firebaseConfig = {
  // ... votre configuration Firebase ...
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Référence à la collection "equipments" dans la base de données
const equipmentRef = db.ref("equipments");

// Fonction pour ajouter un nouvel équipement
function addEquipment(equipment) {
  equipmentRef.push(equipment);
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  const equipmentToDeleteRef = db.ref(`equipments/${equipmentId}`);
  equipmentToDeleteRef.remove();
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
        <button onclick="selectEquipmentRow('${equipmentId}')">Voir les détails</button>
        <button onclick="deleteEquipment('${equipmentId}')">Supprimer</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
}

// Écouter les modifications dans la base de données
equipmentRef.on("value", updateEquipmentList);

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

// Fonction pour afficher les détails de l'équipement dans le modal
function showEquipmentDetails(equipment) {
  const modalContent = document.querySelector(".modal-content");

  // Construire le contenu du modal avec les données de l'équipement
  modalContent.innerHTML = `
    <span class="close" onclick="hideModal()">&times;</span>
    <h2>Détails de l'équipement</h2>
    <p><strong>Nom:</strong> ${equipment.nom}</p>
    <p><strong>Description:</strong> ${equipment.description}</p>
    <p><strong>Quantité:</strong> ${equipment.quantite}</p>
    <button onclick="hideModal()">Retour à la liste</button>
  `;

  // Afficher le modal
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  addEquipmentModal.style.display = "block";
}

// Fonction pour afficher les détails de l'équipement lors de la sélection d'une ligne
function selectEquipmentRow(equipmentId) {
  // Récupérer les données de l'équipement sélectionné à partir de la base de données
  const selectedEquipmentRef = db.ref(`equipments/${equipmentId}`);
  selectedEquipmentRef.once("value", (snapshot) => {
    const equipment = snapshot.val();
    showEquipmentDetails(equipment);
  });
}

// Fonction pour générer les lignes du tableau
function generateTableRows(snapshot) {
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
        <button onclick="selectEquipmentRow('${equipmentId}')">Voir les détails</button>
        <button onclick="deleteEquipment('${equipmentId}')">Supprimer</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
}

// Mettre à jour la liste des équipements lors de la modification de la base de données
equipmentRef.on("value", generateTableRows);
