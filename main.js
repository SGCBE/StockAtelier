document.addEventListener("DOMContentLoaded", function() {
  // Désactiver l'ouverture automatique des modales au chargement de la page
  document.getElementById("add-equipment-modal").style.display = "none";
  document.getElementById("equipment-detail-modal").style.display = "none";

  // Récupération des éléments HTML nécessaires
  const equipmentList = document.getElementById("equipment-list"); // Liste des équipements
  const addEquipmentModal = document.getElementById("add-equipment-modal"); // Modal d'ajout d'équipement
  const addEquipmentForm = document.getElementById("add-equipment-form"); // Formulaire d'ajout d'équipement
  const closeEquipmentDetailModal = document.querySelector("#equipment-detail-modal .close-modal"); // Bouton de fermeture du modal de détail
  const addEquipmentButton = document.getElementById("add-equipment-button"); // Bouton d'ajout d'équipement
  const btnModifier = document.getElementById('btnModifier');

  // Déclaration des variables
  let selectedEquipment; // Équipement sélectionné
  let equipments = {};
  const editModal = document.getElementById("edit-modal"); // Modal de modification

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

  // Initialisation de l'application Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const equipmentRef = database.ref("equipments"); // Référence à la collection "equipments" dans la base de données

  // Chargement initial des équipements depuis la base de données
  function loadEquipmentsFromDatabase() {
    equipmentRef.on("value", function(snapshot) {
      equipments = snapshot.val(); // Récupération des équipements depuis l'objet "snapshot"
      renderEquipmentList(); // Mise à jour de l'affichage de la liste des équipements
    });
  }

  // Ajout d'un équipement à la base de données
  function addEquipmentToDatabase(newEquipment) {
    equipmentRef.push(newEquipment); // Enregistrement de l'équipement dans la base de données
  }

  // Mise à jour de l'affichage de la liste des équipements
  function renderEquipmentList() {
    const equipmentTableBody = equipmentList.querySelector("tbody"); // Corps du tableau HTML des équipements
    equipmentTableBody.innerHTML = ""; // Réinitialisation du contenu du tableau

    for (let key in equipments) {
      const equipment = equipments[key]; // Récupération de l'équipement correspondant à la clé
      const row = createEquipmentRow(key, equipment); // Création d'une ligne HTML représentant l'équipement
      equipmentTableBody.appendChild(row); // Ajout de la ligne au tableau HTML
    }
  }

  // Création d'une ligne HTML représentant un équipement
  function createEquipmentRow(key, equipment) {
    const row = document.createElement("tr"); // Création d'une nouvelle ligne

    row.innerHTML = `
      <td>${equipment.categorie}</td>
      <td>${equipment.designation}</td>
      <td>${equipment.quantite}</td>
      <td>${equipment.marque}</td>
      <td>${equipment.modele}</td>
      <td>${equipment.dimensions}</td>
      <td>${equipment.prixAchatHT}</td>
      <td>
        <button class="btn btn-primary btn-sm btn-detail" data-key="${key}">Détail</button>
        <button class="btn btn-warning btn-sm btn-edit" data-key="${key}">Modifier</button>
        <button class="btn btn-danger btn-sm btn-delete" data-key="${key}">Supprimer</button>
      </td>
    `;

    return row;
  }

  // Ouverture du modal d'ajout d'équipement
  function openAddEquipmentModal() {
    addEquipmentForm.reset(); // Réinitialisation du formulaire d'ajout
    addEquipmentModal.style.display = "block"; // Affichage du modal d'ajout
  }

  // Fermeture du modal d'ajout d'équipement
  function closeAddEquipmentModal() {
    addEquipmentModal.style.display = "none"; // Masquage du modal d'ajout
  }

  // Validation du formulaire d'ajout d'équipement
  function validateAddEquipmentForm(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const categorie = document.getElementById("add-equipment-categorie").value;
    const designation = document.getElementById("add-equipment-designation").value;
    const quantite = document.getElementById("add-equipment-quantite").value;
    const marque = document.getElementById("add-equipment-marque").value;
    const modele = document.getElementById("add-equipment-modele").value;
    const dimensions = document.getElementById("add-equipment-dimensions").value;
    const prixAchatHT = document.getElementById("add-equipment-prixAchatHT").value;

    // Création de l'objet représentant le nouvel équipement
    const newEquipment = {
      categorie: categorie,
      designation: designation,
      quantite: quantite,
      marque: marque,
      modele: modele,
      dimensions: dimensions,
      prixAchatHT: prixAchatHT
    };

    addEquipmentToDatabase(newEquipment); // Ajout de l'équipement à la base de données
    closeAddEquipmentModal(); // Fermeture du modal d'ajout
  }

  // Ouverture du modal de détail de l'équipement
  function openEquipmentDetailModal(key) {
    selectedEquipment = equipments[key]; // Récupération de l'équipement sélectionné

    // Remplissage des valeurs de l'équipement dans le modal de détail
    document.getElementById("equipment-detail-categorie").textContent = selectedEquipment.categorie;
    document.getElementById("equipment-detail-designation").textContent = selectedEquipment.designation;
    document.getElementById("equipment-detail-quantite").textContent = selectedEquipment.quantite;
    document.getElementById("equipment-detail-marque").textContent = selectedEquipment.marque;
    document.getElementById("equipment-detail-modele").textContent = selectedEquipment.modele;
    document.getElementById("equipment-detail-dimensions").textContent = selectedEquipment.dimensions;
    document.getElementById("equipment-detail-prixAchatHT").textContent = selectedEquipment.prixAchatHT;

    // Affichage du modal de détail
    document.getElementById("equipment-detail-modal").style.display = "block";
  }

  // Fermeture du modal de détail de l'équipement
  function closeEquipmentDetailModalFunction() {
    document.getElementById("equipment-detail-modal").style.display = "none"; // Masquage du modal de détail
  }

  // Suppression de l'équipement
  function deleteEquipment(key) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?")) {
      equipmentRef.child(key).remove(); // Suppression de l'équipement de la base de données
    }
  }

  // Modification de l'équipement
  function editEquipment(key) {
    selectedEquipment = equipments[key]; // Récupération de l'équipement sélectionné

    // Remplissage des valeurs de l'équipement dans le formulaire de modification
    document.getElementById("edit-equipment-categorie").value = selectedEquipment.categorie;
    document.getElementById("edit-equipment-designation").value = selectedEquipment.designation;
    document.getElementById("edit-equipment-quantite").value = selectedEquipment.quantite;
    document.getElementById("edit-equipment-marque").value = selectedEquipment.marque;
    document.getElementById("edit-equipment-modele").value = selectedEquipment.modele;
    document.getElementById("edit-equipment-dimensions").value = selectedEquipment.dimensions;
    document.getElementById("edit-equipment-prixAchatHT").value = selectedEquipment.prixAchatHT;

    // Affichage du modal de modification
    editModal.style.display = "block";
  }

  // Validation du formulaire de modification d'équipement
  function validateEditEquipmentForm(event) {
    event.preventDefault();

    // Récupération des nouvelles valeurs du formulaire
    const categorie = document.getElementById("edit-equipment-categorie").value;
    const designation = document.getElementById("edit-equipment-designation").value;
    const quantite = document.getElementById("edit-equipment-quantite").value;
    const marque = document.getElementById("edit-equipment-marque").value;
    const modele = document.getElementById("edit-equipment-modele").value;
    const dimensions = document.getElementById("edit-equipment-dimensions").value;
    const prixAchatHT = document.getElementById("edit-equipment-prixAchatHT").value;

    // Mise à jour des valeurs de l'équipement sélectionné
    selectedEquipment.categorie = categorie;
    selectedEquipment.designation = designation;
    selectedEquipment.quantite = quantite;
    selectedEquipment.marque = marque;
    selectedEquipment.modele = modele;
    selectedEquipment.dimensions = dimensions;
    selectedEquipment.prixAchatHT = prixAchatHT;

    // Mise à jour de l'équipement dans la base de données
    equipmentRef.child(key).set(selectedEquipment);

    // Fermeture du modal de modification
    editModal.style.display = "none";
  }

  // Gestionnaire d'événement pour l'ajout d'un nouvel équipement
  addEquipmentButton.addEventListener("click", openAddEquipmentModal);

  // Gestionnaire d'événement pour la fermeture du modal d'ajout d'équipement
  addEquipmentModal.addEventListener("click", function(event) {
    if (event.target === addEquipmentModal) {
      closeAddEquipmentModal();
    }
  });

  // Gestionnaire d'événement pour la validation du formulaire d'ajout d'équipement
  addEquipmentForm.addEventListener("submit", validateAddEquipmentForm);

  // Gestionnaire d'événement pour la fermeture du modal de détail d'équipement
  closeEquipmentDetailModal.addEventListener("click", closeEquipmentDetailModalFunction);

  // Gestionnaire d'événement pour la suppression d'un équipement
  equipmentList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-delete")) {
      const key = event.target.dataset.key;
      deleteEquipment(key);
    }
  });

  // Gestionnaire d'événement pour la modification d'un équipement
  equipmentList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-edit")) {
      const key = event.target.dataset.key;
      editEquipment(key);
    }
  });

  // Gestionnaire d'événement pour la validation du formulaire de modification d'équipement
  editModal.addEventListener("submit", validateEditEquipmentForm);

  // Gestionnaire d'événement pour l'ouverture du modal de détail d'équipement
  equipmentList.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-detail")) {
      const key = event.target.dataset.key;
      openEquipmentDetailModal(key);
    }
  });

  // Chargement initial des équipements depuis la base de données
  loadEquipmentsFromDatabase();
});
