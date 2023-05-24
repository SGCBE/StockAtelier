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

// Initialisation de Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variable globale pour stocker les équipements
let equipments = [];

// Récupérer les références des éléments HTML
const equipmentTableBody = document.getElementById("equipmentTableBody");
const addEquipmentButton = document.getElementById("addEquipmentButton");
const addEquipmentForm = document.getElementById("addEquipmentForm");
const addEquipmentModal = document.getElementById("addEquipmentModal");

// Fonction pour afficher les équipements
function displayEquipment() {
  // Réinitialiser le contenu du tableau
  equipmentTableBody.innerHTML = "";

  // Générer les lignes du tableau pour chaque équipement
  equipments.forEach(function (equipment) {
    const row = document.createElement("tr");

    const categorieCell = document.createElement("td");
    categorieCell.textContent = equipment.categorie;
    row.appendChild(categorieCell);

    const dateLivraisonCell = document.createElement("td");
    dateLivraisonCell.textContent = equipment.dateLivraison;
    row.appendChild(dateLivraisonCell);

    const marqueCell = document.createElement("td");
    marqueCell.textContent = equipment.marque;
    row.appendChild(marqueCell);

    const typeCell = document.createElement("td");
    typeCell.textContent = equipment.type;
    row.appendChild(typeCell);

    const referenceCell = document.createElement("td");
    referenceCell.textContent = equipment.reference;
    row.appendChild(referenceCell);

    const numeroSerieCell = document.createElement("td");
    numeroSerieCell.textContent = equipment.numeroSerie;
    row.appendChild(numeroSerieCell);

    const numeroInterneCell = document.createElement("td");
    numeroInterneCell.textContent = equipment.numeroInterne;
    row.appendChild(numeroInterneCell);

    const quantiteCell = document.createElement("td");
    quantiteCell.textContent = equipment.quantite;
    row.appendChild(quantiteCell);

    const valeurHTCell = document.createElement("td");
    valeurHTCell.textContent = equipment.valeurHT;
    row.appendChild(valeurHTCell);

    const factureAchatCell = document.createElement("td");
    factureAchatCell.textContent = equipment.factureAchat;
    row.appendChild(factureAchatCell);

    const dateFactureCell = document.createElement("td");
    dateFactureCell.textContent = equipment.dateFacture;
    row.appendChild(dateFactureCell);

    const complementInformationCell = document.createElement("td");
    complementInformationCell.textContent = equipment.complementInformation;
    row.appendChild(complementInformationCell);

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", function () {
      deleteEquipment(equipment);
    });
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    equipmentTableBody.appendChild(row);
  });
}

// Fonction pour ajouter un équipement
function addEquipment(equipment) {
  // Ajouter l'équipement à Firestore
  db.collection("equipments")
    .add(equipment)
    .then(function (docRef) {
      equipment.id = docRef.id;
      equipments.push(equipment);
      displayEquipment();
      hideModal();
    })
    .catch(function (error) {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipment) {
  // Supprimer l'équipement de Firestore
  db.collection("equipments")
    .doc(equipment.id)
    .delete()
    .then(function () {
      const index = equipments.indexOf(equipment);
      if (index > -1) {
        equipments.splice(index, 1);
        displayEquipment();
      }
    })
    .catch(function (error) {
      console.error("Erreur lors de la suppression de l'équipement :", error);
    });
}

// Fonction pour afficher le modal
function showModal() {
  addEquipmentModal.style.display = "block";
}

// Fonction pour masquer le modal
function hideModal() {
  addEquipmentModal.style.display = "none";
}

// Écouter l'événement de clic sur le bouton "Ajouter un équipement"
addEquipmentButton.addEventListener("click", showModal);

// Écouter l'événement de soumission du formulaire d'ajout d'équipement
addEquipmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const categorie = document.getElementById("categorie").value;
  const dateLivraison = document.getElementById("dateLivraison").value;
  const marque = document.getElementById("marque").value;
  const type = document.getElementById("type").value;
  const reference = document.getElementById("reference").value;
  const numeroSerie = document.getElementById("numeroSerie").value;
  const numeroInterne = document.getElementById("numeroInterne").value;
  const quantite = document.getElementById("quantite").value;
  const valeurHT = document.getElementById("valeurHT").value;
  const factureAchat = document.getElementById("factureAchat").value;
  const dateFacture = document.getElementById("dateFacture").value;
  const complementInformation = document.getElementById("complementInformation").value;

  const newEquipment = {
    categorie: categorie,
    dateLivraison: dateLivraison,
    marque: marque,
    type: type,
    reference: reference,
    numeroSerie: numeroSerie,
    numeroInterne: numeroInterne,
    quantite: quantite,
    valeurHT: valeurHT,
    factureAchat: factureAchat,
    dateFacture: dateFacture,
    complementInformation: complementInformation,
  };

  addEquipment(newEquipment);
  addEquipmentForm.reset();
});
