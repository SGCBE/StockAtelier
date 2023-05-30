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

// Fonction pour afficher les équipements
function displayEquipmentList(equipmentList) {
  const equipmentListDiv = document.getElementById('equipment-list');
  equipmentListDiv.innerHTML = '';

  equipmentList.forEach((equipment) => {
    const equipmentItem = document.createElement('div');
    equipmentItem.classList.add('equipment-item');
    equipmentItem.textContent = equipment.designation;
    equipmentItem.addEventListener('click', () => openEquipmentModal(equipment));
    equipmentListDiv.appendChild(equipmentItem);
  });
}

// Fonction pour afficher la fenêtre modale avec les détails de l'équipement
function openEquipmentModal(equipment) {
  const modal = document.getElementById('equipment-modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${equipment.designation}</h2>
      <p>Catégorie: ${equipment.categorie}</p>
      <p>Quantité: ${equipment.quantite}</p>
      <p>Marque: ${equipment.marque}</p>
      <p>Modèle: ${equipment.modele}</p>
      <p>Dimensions: ${equipment.dimensions}</p>
      <p>Prix d'achat HT unitaire: ${equipment.prixHT}</p>
    </div>
  `;

  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => closeEquipmentModal());

  modal.style.display = 'block';
}

// Fonction pour fermer la fenêtre modale
function closeEquipmentModal() {
  const modal = document.getElementById('equipment-modal');
  modal.style.display = 'none';
}

// Fonction pour filtrer les équipements par catégorie
function filterByCategory(category) {
  db.collection('equipments')
    .where('categorie', '==', category)
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
      console.log('Erreur lors du filtrage par catégorie :', error);
    });
}

// Écouteur d'événement pour le changement de filtre de catégorie
const categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  if (selectedCategory === 'Toutes') {
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
        console.log('Erreur lors du chargement des équipements :', error);
      });
  } else {
    filterByCategory(selectedCategory);
  }
});

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
          console.log('Erreur lors du chargement des équipements :', error);
        });
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
});

// Charger tous les équipements lors du chargement initial de la page
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
    console.log('Erreur lors du chargement des équipements :', error);
  });
