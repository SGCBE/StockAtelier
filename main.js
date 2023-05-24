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


// Initialisation de l'application Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Référence au formulaire et à la table
const addEquipmentForm = document.getElementById('addEquipmentForm');
const equipmentTableBody = document.getElementById('equipmentTableBody');

// Fonction pour ajouter un équipement à Firestore
function addEquipment(event) {
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const categorie = addEquipmentForm.categorie.value;
  const dateLivraison = addEquipmentForm.dateLivraison.value;
  const marque = addEquipmentForm.marque.value;
  const type = addEquipmentForm.type.value;
  const reference = addEquipmentForm.reference.value;
  const numeroSerie = addEquipmentForm.numeroSerie.value;
  const numeroInterne = addEquipmentForm.numeroInterne.value;
  const quantite = addEquipmentForm.quantite.value;
  const valeurHT = addEquipmentForm.valeurHT.value;
  const factureAchat = addEquipmentForm.factureAchat.value;
  const dateFacture = addEquipmentForm.dateFacture.value;
  const complement = addEquipmentForm.complement.value;

  // Ajouter les données à Firestore
  db.collection('equipments').add({
    categorie,
    dateLivraison,
    marque,
    type,
    reference,
    numeroSerie,
    numeroInterne,
    quantite,
    valeurHT,
    factureAchat,
    dateFacture,
    complement
  })
  .then(() => {
    // Réinitialiser le formulaire
    addEquipmentForm.reset();
    // Fermer le modal
    hideModal();
  })
  .catch((error) => {
    console.error("Erreur lors de l'ajout de l'équipement : ", error);
  });
}

// Fonction pour afficher les équipements depuis Firestore
function displayEquipments() {
  db.collection('equipments').onSnapshot((snapshot) => {
    equipmentTableBody.innerHTML = '';
    snapshot.forEach((doc) => {
      const equipment = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${equipment.categorie}</td>
        <td>${equipment.dateLivraison}</td>
        <td>${equipment.marque}</td>
        <td>${equipment.type}</td>
        <td>${equipment.reference}</td>
        <td>${equipment.numeroSerie}</td>
        <td>${equipment.numeroInterne}</td>
        <td>${equipment.quantite}</td>
        <td>${equipment.valeurHT}</td>
        <td>${equipment.factureAchat}</td>
        <td>${equipment.dateFacture}</td>
        <td>${equipment.complement}</td>
      `;
      equipmentTableBody.appendChild(tr);
    });
  });
}

// Exécution de la fonction pour afficher les équipements
displayEquipments();

// Écouter l'événement de soumission du formulaire
addEquipmentForm.addEventListener('submit', addEquipment);
