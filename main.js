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
function addEquipment(nom, description, quantite) {
  const equipment = {
    nom,
    description,
    quantite
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
      <td>
        <button onclick="removeEquipment('${equipment.id}')">Supprimer</button>
      </td>
    `;
    equipmentTableBody.appendChild(equipmentRow);
  });

  // Appel à la fonction de redimensionnement des colonnes après avoir généré la liste
  resizeTableColumns();
}

// Fonction pour supprimer un équipement
function removeEquipment(equipmentId) {
  const equipmentRef = database.ref(`equipments/${equipmentId}`);
  equipmentRef.remove();
}

// Fonction pour afficher le modal
function showModal() {
  const modal = document.getElementById('addEquipmentModal');
  modal.style.display = 'block';
}

// Fonction pour masquer le modal
function hideModal() {
  const modal = document.getElementById('addEquipmentModal');
  modal.style.display = 'none';
}

// Fonction pour redimensionner les colonnes de la table en fonction du contenu
function resizeTableColumns() {
  const autoResizableCells = document.querySelectorAll('.auto-resizable');

  autoResizableCells.forEach(cell => {
    cell.style.width = '1px'; // Réinitialiser la largeur à une valeur minimale pour calculer la taille réelle du contenu
    const computedWidth = `${cell.scrollWidth}px`;
    cell.style.width = computedWidth; // Appliquer la largeur calculée pour ajuster la colonne
  });
}

// Appeler la fonction de redimensionnement au chargement de la page et lors des modifications de la fenêtre
window.addEventListener('load', resizeTableColumns);
window.addEventListener('resize', resizeTableColumns);

// Écouteur d'événement pour le formulaire d'ajout d'équipement
document.getElementById('addEquipmentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nom = document.getElementById('nom').value;
  const description = document.getElementById('description').value;
  const quantite = document.getElementById('quantite').value;

  addEquipment(nom, description, quantite);
  hideModal();
});

// Écouteur d'événement pour le bouton "Ajouter un équipement"
document.getElementById('addEquipmentButton').addEventListener('click', showModal);

// Événement pour détecter les modifications dans la base de données Firebase
equipmentsRef.on('value', (snapshot) => {
  const data = [];
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    childData.id = childSnapshot.key;
    data.push(childData);
  });

  generateEquipmentList(data);
});
