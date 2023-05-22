// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmno"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Référence à la table "equipments"
const equipmentsRef = database.ref('equipments');

// Fonction pour ajouter un nouvel équipement
function addEquipment(nom, description, quantite, categorie) {
  const equipment = {
    nom,
    description,
    quantite,
    categorie
  };

  equipmentsRef.push(equipment);
}

// Fonction pour générer la liste des équipements
function generateEquipmentList(data) {
  const equipmentTableBody = document.getElementById('equipmentTableBody');
  equipmentTableBody.innerHTML = '';

  data.forEach((equipment) => {
    const equipmentRow = document.createElement('tr');
    equipmentRow.innerHTML = `
      <td>${equipment.nom}</td>
      <td>${equipment.description}</td>
      <td>${equipment.quantite}</td>
      <td>${equipment.categorie}</td>
      <td>
        <button onclick="removeEquipment('${equipment.id}')">Supprimer</button>
      </td>
    `;
    equipmentTableBody.appendChild(equipmentRow);
  });

  // Appel à la fonction de redimensionnement des colonnes après avoir généré la liste des équipements
  adjustTableColumns();
}

// Fonction pour supprimer un équipement
function removeEquipment(id) {
  const equipmentRef = database.ref(`equipments/${id}`);
  equipmentRef.remove();
}

// Fonction pour ajuster automatiquement les colonnes de la table
function adjustTableColumns() {
  const table = document.querySelector('table');
  const tableHeaders = table.querySelectorAll('thead th');
  const tableBodyRows = table.querySelectorAll('tbody tr');

  tableHeaders.forEach((header, index) => {
    const cellWidths = Array.from(tableBodyRows, row => row.querySelectorAll('td')[index].offsetWidth);
    const maxCellWidth = Math.max(...cellWidths);
    header.style.width = `${maxCellWidth}px`;
  });
}

// Événement de soumission du formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById('addEquipmentForm');
addEquipmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nom = document.getElementById('nom').value;
  const description = document.getElementById('description').value;
  const quantite = document.getElementById('quantite').value;
  const categorie = document.getElementById('categorie').value;

  addEquipment(nom, description, quantite, categorie);

  // Réinitialisation du formulaire
  addEquipmentForm.reset();
});

// Événement pour ouvrir le modal d'ajout d'équipement
const addEquipmentButton = document.getElementById('addEquipmentButton');
const addEquipmentModal = document.getElementById('addEquipmentModal');
const closeModalButton = document.getElementById('closeModalButton');

addEquipmentButton.addEventListener('click', () => {
  addEquipmentModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  addEquipmentModal.style.display = 'none';
});

// Événement pour fermer le modal en cliquant en dehors de celui-ci
window.addEventListener('click', (event) => {
  if (event.target === addEquipmentModal) {
    addEquipmentModal.style.display = 'none';
  }
});

// Événement de suppression d'un équipement
function removeEquipment(id) {
  const confirmation = confirm('Voulez-vous vraiment supprimer cet équipement ?');
  if (confirmation) {
    const equipmentRef = database.ref(`equipments/${id}`);
    equipmentRef.remove();
  }
}

// Événement pour la mise à jour de la liste des équipements
equipmentsRef.on('value', (snapshot) => {
  const data = [];

  snapshot.forEach((childSnapshot) => {
    const equipment = {
      id: childSnapshot.key,
      ...childSnapshot.val()
    };
    data.push(equipment);
  });

  generateEquipmentList(data);
});
