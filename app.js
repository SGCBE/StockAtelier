// Configuration Firestore
const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "92935528444",
  appId: "1:92935528444:web:57786855ed9cc7ef129c79"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Fonction pour afficher la liste des équipements dans le tableau
function displayEquipmentList(equipmentList) {
  const tableBody = document.getElementById('equipment-list');
  tableBody.innerHTML = '';

  equipmentList.forEach((equipment) => {
    const row = document.createElement('tr');
    const designationCell = document.createElement('td');
    const marqueCell = document.createElement('td');
    const quantiteCell = document.createElement('td');

    designationCell.textContent = equipment.designation;
    marqueCell.textContent = equipment.marque;
    quantiteCell.textContent = equipment.quantite;

    row.appendChild(designationCell);
    row.appendChild(marqueCell);
    row.appendChild(quantiteCell);

    // Ajouter un écouteur d'événement pour afficher les détails de l'équipement lors du clic sur une ligne du tableau
    row.addEventListener('click', () => openEquipmentModal(equipment));

    tableBody.appendChild(row);
  });
}

// Fonction pour ouvrir le modal d'ajout d'équipement
function openAddEquipmentModal() {
  const modal = document.getElementById('add-equipment-modal');
  modal.style.display = 'block';
}

// Fonction pour fermer le modal d'ajout d'équipement
function closeAddEquipmentModal() {
  const modal = document.getElementById('add-equipment-modal');
  modal.style.display = 'none';
}

// Écouteur d'événement pour le clic sur le bouton "Ajouter un équipement"
const addEquipmentBtn = document.getElementById('add-equipment-btn');
addEquipmentBtn.addEventListener('click', () => openAddEquipmentModal());

// Écouteur d'événement pour le clic sur le bouton "Annuler" dans le modal d'ajout d'équipement
const cancelAddEquipmentBtn = document.getElementById('cancel-add-equipment-btn');
cancelAddEquipmentBtn.addEventListener('click', () => closeAddEquipmentModal());

// Écouteur d'événement pour le clic sur le bouton "Enregistrer" dans le modal d'ajout d'équipement
const saveEquipmentBtn = document.getElementById('save-equipment-btn');
saveEquipmentBtn.addEventListener('click', () => {
  // Récupérer les valeurs des champs de saisie
  const categorie = document.getElementById('categorie-input').value;
  const designation = document.getElementById('designation-input').value;
  const quantite = document.getElementById('quantite-input').value;
  const marque = document.getElementById('marque-input').value;
  const modele = document.getElementById('modele-input').value;
  const dimensions = document.getElementById('dimensions-input').value;
  const prixHT = document.getElementById('prixHT-input').value;

  // Créer un nouvel équipement avec les valeurs saisies
  const newEquipment = {
    categorie: categorie,
    designation: designation,
    quantite: quantite,
    marque: marque,
    modele: modele,
    dimensions: dimensions,
    prixHT: prixHT
  };

  // Ajouter le nouvel équipement à la base de données Firestore
  db.collection("equipments")
    .add(newEquipment)
    .then((docRef) => {
      console.log("Nouvel équipement ajouté avec ID :", docRef.id);
      closeAddEquipmentModal();
      // Actualiser la liste des équipements
      db.collection('equipments')
        .get()
        .then((querySnapshot) => {
          const equipmentList = [];
          querySnapshot.forEach((doc) => {
            const equipment = doc.data();
            equipmentList.push(equipment);
          });
          displayEquipmentList(equipmentList);
        })
        .catch((error) => {
          console.log('Erreur lors de la récupération des équipements :', error);
        });
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
});

// Écouteur d'événement pour le changement de la sélection de la catégorie de filtre
const categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  let query = db.collection('equipments');

  if (selectedCategory !== 'Toutes') {
    query = query.where('categorie', '==', selectedCategory);
  }

  // Récupérer les équipements filtrés
  query.get()
    .then((querySnapshot) => {
      const equipmentList = [];
      querySnapshot.forEach((doc) => {
        const equipment = doc.data();
        equipmentList.push(equipment);
      });
      displayEquipmentList(equipmentList);
    })
    .catch((error) => {
      console.log('Erreur lors de la récupération des équipements :', error);
    });
});

// Récupérer tous les équipements de la base de données Firestore
db.collection('equipments')
  .get()
  .then((querySnapshot) => {
    const equipmentList = [];
    querySnapshot.forEach((doc) => {
      const equipment = doc.data();
      equipmentList.push(equipment);
    });
    displayEquipmentList(equipmentList);
  })
  .catch((error) => {
    console.log('Erreur lors de la récupération des équipements :', error);
  });

