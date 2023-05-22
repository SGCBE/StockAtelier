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
        <button onclick="deleteEquipment('${equipmentId}')">Supprimer</button>
        <button onclick="openModal('${equipmentId}')">Détails</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
}

// Écouter les modifications dans la base de données
equipmentRef.on("value", updateEquipmentList);

// Fonction pour masquer le modal
function hideModal() {
  const modal = document.getElementById("equipmentModal");
  modal.style.display = "none";
}

// Fonction pour afficher le modal avec les détails de l'équipement
function openModal(equipmentId) {
  const modal = document.getElementById("equipmentModal");
  const modalContent = document.getElementById("modalContent");
  
  equipmentRef.child(equipmentId).once("value", (snapshot) => {
    const equipment = snapshot.val();
    
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

// Gérer la soumission du formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById("addEquipmentForm");
addEquipmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const categorieInput = document.getElementById("categorie");
  const designationInput = document.getElementById("designation");
  const descriptionInput = document.getElementById("description");
  const photoInput = document.getElementById("photo");

  const equipment = {
    categorie: categorieInput.value,
    designation: designationInput.value,
    description: descriptionInput.value,
    photo: photoInput.value
  };

  addEquipment(equipment);

  categorieInput.value = "";
  designationInput.value = "";
  descriptionInput.value = "";
  photoInput.value = "";
});

