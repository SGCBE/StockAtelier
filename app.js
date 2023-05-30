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
