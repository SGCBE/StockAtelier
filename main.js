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
        <button onclick="showEditEquipmentModal('${equipment.id}')">Modifier</button>
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
  const confirmation = confirm('Voulez-vous vraiment supprimer cet équipement ?');
  if (confirmation) {
    const equipmentRef = database.ref(`equipments/${id}`);
    equipmentRef.remove();
  }
}

// Fonction pour ouvrir le modal de modification d'équipement
function showEditEquipmentModal(id) {
  const equipmentRef = database.ref(`equipments/${id}`);
  equipmentRef.once('value', (snapshot) => {
    const equipment = snapshot.val();
    if (equipment) {
      const editEquipmentModal = document.getElementById('editEquipmentModal');
      const editEquipmentForm = document.getElementById('editEquipmentForm');
      const editEquipmentId = document.getElementById('editEquipmentId');
      const editEquipmentNom = document.getElementById('editEquipmentNom');
      const editEquipmentDescription = document.getElementById('editEquipmentDescription');
      const editEquipmentQuantite = document.getElementById('editEquipmentQuantite');
      const editEquipmentCategorie = document.getElementById('editEquipmentCategorie');

      if (editEquipmentModal && editEquipmentForm && editEquipmentId && editEquipmentNom && editEquipmentDescription && editEquipmentQuantite && editEquipmentCategorie) {
        // Remplir les champs du formulaire avec les informations actuelles de l'équipement
        editEquipmentId.value = id;
        editEquipmentNom.value = equipment.nom;
        editEquipmentDescription.value = equipment.description;
        editEquipmentQuantite.value = equipment.quantite;
        editEquipmentCategorie.value = equipment.categorie;

        // Ouvrir le modal de modification
        editEquipmentModal.style.display = 'block';
      }
    }
  });
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

// Événement pour soumettre le formulaire d'ajout d'équipement
const addEquipmentForm = document.getElementById('addEquipmentForm');
addEquipmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const description = document.getElementById('description').value;
  const quantite = document.getElementById('quantite').value;
  const categorie = document.getElementById('categorie').value;

  addEquipment(nom, description, quantite, categorie);

  // Réinitialiser le formulaire après avoir ajouté l'équipement
  addEquipmentForm.reset();
});

// Événement pour fermer le modal de modification d'équipement
const editEquipmentModal = document.getElementById('editEquipmentModal');
const editEquipmentCloseButton = document.getElementById('editEquipmentCloseButton');
editEquipmentCloseButton.addEventListener('click', () => {
  editEquipmentModal.style.display = 'none';
});

// Événement pour soumettre le formulaire de modification d'équipement
const editEquipmentForm = document.getElementById('editEquipmentForm');
editEquipmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('editEquipmentId').value;
  const nom = document.getElementById('editEquipmentNom').value;
  const description = document.getElementById('editEquipmentDescription').value;
  const quantite = document.getElementById('editEquipmentQuantite').value;
  const categorie = document.getElementById('editEquipmentCategorie').value;

  const equipmentRef = database.ref(`equipments/${id}`);
  equipmentRef.update({
    nom,
    description,
    quantite,
    categorie
  });

  // Fermer le modal de modification après avoir enregistré les modifications
  editEquipmentModal.style.display = 'none';
});

// Événement pour fermer le modal de modification d'équipement lorsque l'utilisateur clique en dehors du contenu du modal
window.addEventListener('click', (e) => {
  if (e.target === editEquipmentModal) {
    editEquipmentModal.style.display = 'none';
  }
});

// Événement pour rafraîchir la liste des équipements à chaque modification dans la base de données
equipmentsRef.on('value', (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapshot) => {
    const childData = {
      id: childSnapshot.key,
      ...childSnapshot.val()
    };
    data.push(childData);
  });

  generateEquipmentList(data);
});
