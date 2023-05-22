// Initialise Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Sélection des éléments du DOM
const equipmentTableBody = document.getElementById('equipmentTableBody');
const addEquipmentButton = document.getElementById('addEquipmentButton');
const addEquipmentModal = document.getElementById('addEquipmentModal');
const closeModalButton = document.getElementById('closeModalButton');
const addEquipmentForm = document.getElementById('addEquipmentForm');

// Gestion de l'affichage des équipements
function renderEquipment(equipment) {
  const equipmentRow = document.createElement('tr');
  equipmentRow.innerHTML = `
    <td>${equipment.dateLivraison}</td>
    <td>${equipment.fournisseurClient}</td>
    <td>${equipment.marque}</td>
    <td>${equipment.type}</td>
    <td>${equipment.reference}</td>
    <td>${equipment.numeroSerie}</td>
    <td>${equipment.valeurHT}</td>
    <td>${equipment.factureAchat}</td>
    <td>${equipment.dateFacture}</td>
    <td>${equipment.complementInfo}</td>
    <td>
      <button class="delete-button">Supprimer</button>
      <button class="edit-button">Modifier</button>
    </td>
  `;

  const deleteButton = equipmentRow.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => deleteEquipment(equipment.id));

  const editButton = equipmentRow.querySelector('.edit-button');
  editButton.addEventListener('click', () => openEditModal(equipment));

  equipmentTableBody.appendChild(equipmentRow);
}

// Efface tous les équipements de l'affichage
function clearEquipmentTable() {
  while (equipmentTableBody.firstChild) {
    equipmentTableBody.removeChild(equipmentTableBody.firstChild);
  }
}

// Obtient tous les équipements de la base de données et les affiche
function getAndRenderEquipment() {
  clearEquipmentTable();

  let query = db.collection('equipments');

  // Filtrage par catégorie si une catégorie est sélectionnée
  const filterCategory = document.getElementById('filterCategory').value;
  if (filterCategory) {
    query = query.where('category', '==', filterCategory);
  }

  query.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const equipment = doc.data();
      equipment.id = doc.id;
      renderEquipment(equipment);
    });
  });
}

// Gestionnaire d'événement pour l'ajout d'équipement
addEquipmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dateLivraison = addEquipmentForm.dateLivraison.value;
  const fournisseurClient = addEquipmentForm.fournisseurClient.value;
  const marque = addEquipmentForm.marque.value;
  const type = addEquipmentForm.type.value;
  const reference = addEquipmentForm.reference.value;
  const numeroSerie = addEquipmentForm.numeroSerie.value;
  const valeurHT = addEquipmentForm.valeurHT.value;
  const factureAchat = addEquipmentForm.factureAchat.value;
  const dateFacture = addEquipmentForm.dateFacture.value;
  const complementInfo = addEquipmentForm.complementInfo.value;

  db.collection('equipments').add({
    dateLivraison,
    fournisseurClient,
    marque,
    type,
    reference,
    numeroSerie,
    valeurHT,
    factureAchat,
    dateFacture,
    complementInfo
  }).then(() => {
    addEquipmentForm.reset();
    closeModal();
    getAndRenderEquipment();
  }).catch((error) => {
    console.error('Erreur lors de l\'ajout d\'un équipement :', error);
  });
});

// Gestionnaire d'événement pour la suppression d'un équipement
function deleteEquipment(equipmentId) {
  db.collection('equipments').doc(equipmentId).delete()
    .then(() => {
      getAndRenderEquipment();
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de l\'équipement :', error);
    });
}

// Ouvre le modal de modification avec les informations de l'équipement
function openEditModal(equipment) {
  // Code pour ouvrir le modal de modification avec les données de l'équipement
}

// Ferme le modal de modification
function closeEditModal() {
  // Code pour fermer le modal de modification
}

// Fonction pour initialiser l'application
function initApp() {
  addEquipmentButton.addEventListener('click', openAddModal);
  closeModalButton.addEventListener('click', closeModal);
  getAndRenderEquipment();
}

// Fonction pour ouvrir le modal d'ajout d'équipement
function openAddModal() {
  addEquipmentModal.style.display = 'block';
}

// Fonction pour fermer le modal d'ajout d'équipement
function closeModal() {
  addEquipmentModal.style.display = 'none';
}

// Exécute l'initialisation de l'application
initApp();
