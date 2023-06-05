document.addEventListener("DOMContentLoaded", function() {
  const equipmentList = document.getElementById("equipment-list"); // Sélectionne l'élément avec l'ID "equipment-list"
  const addEquipmentModal = document.getElementById("add-equipment-modal"); // Sélectionne l'élément avec l'ID "add-equipment-modal"
  const addEquipmentForm = document.getElementById("add-equipment-form"); // Sélectionne l'élément avec l'ID "add-equipment-form"
  const closeEquipmentDetailModal = document.getElementById("equipment-detail-modal").getElementsByClassName("close-modal")[0]; // Sélectionne le premier élément avec la classe "close-modal" à l'intérieur de l'élément avec l'ID "equipment-detail-modal"
  const addEquipmentButton = document.getElementById("add-equipment-button"); // Sélectionne l'élément avec l'ID "add-equipment-button"

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

  // Initialisation de Firebase
  firebase.initializeApp(firebaseConfig); // Initialise Firebase avec la configuration
  const database = firebase.database(); // Référence à la base de données Firebase
  const equipmentRef = database.ref("equipments"); // Référence à la collection "equipments" dans la base de données

  // Chargement initial des équipements depuis la base de données
  loadEquipmentsFromDatabase(); // Appelle la fonction pour charger les équipements depuis la base de données

  // Gestionnaire d'événement pour l'ouverture du modal d'ajout d'équipement
  addEquipmentButton.addEventListener("click", function() {
    addEquipmentModal.style.display = "block"; // Affiche le modal d'ajout d'équipement lorsque le bouton est cliqué
  });

  // Gestionnaire d'événement pour la fermeture du modal d'ajout d'équipement
  closeEquipmentDetailModal.addEventListener("click", function() {
    const modal = document.getElementById("equipment-detail-modal"); // Sélectionne l'élément avec l'ID "equipment-detail-modal"
    modal.style.display = "none"; // Masque le modal de détail de l'équipement lorsque le bouton est cliqué
  });

  // Gestionnaire d'événement pour la soumission du formulaire d'ajout d'équipement
  addEquipmentForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    const categorie = document.getElementById("categorie-input").value; // Récupère la valeur du champ de saisie de catégorie
    const designation = document.getElementById("designation-input").value; // Récupère la valeur du champ de saisie de désignation
    const quantite = document.getElementById("quantite-input").value; // Récupère la valeur du champ de saisie de quantité
    const marque = document.getElementById("marque-input").value; // Récupère la valeur du champ de saisie de marque
    const modele = document.getElementById("modele-input").value; // Récupère la valeur du champ de saisie de modèle
    const dimensions = document.getElementById("dimensions-input").value; // Récupère la valeur du champ de saisie de dimensions
    const prixAchatHT = document.getElementById("prixAchatHT-input").value; // Récupère la valeur du champ de saisie de prix d'achat HT

    const newEquipment = {
      categorie: categorie,
      designation: designation,
      quantite: quantite,
      marque: marque,
      modele: modele,
      dimensions: dimensions,
      prixAchatHT: prixAchatHT
    };

    // Ajout du nouvel équipement à la base de données
    addEquipmentToDatabase(newEquipment); // Appelle la fonction pour ajouter l'équipement à la base de données

    // Réinitialisation du formulaire et fermeture du modal
    addEquipmentForm.reset(); // Réinitialise les champs du formulaire
    addEquipmentModal.style.display = "none"; // Masque le modal d'ajout d'équipement
  });

  // Fonction pour charger les équipements depuis la base de données
  function loadEquipmentsFromDatabase() {
    equipmentRef.on("value", function(snapshot) {
      const equipments = snapshot.val(); // Récupère les données de la base de données sous forme d'objet
      const equipmentTableBody = equipmentList.getElementsByTagName("tbody")[0]; // Sélectionne le corps du tableau à l'intérieur de l'élément avec l'ID "equipment-list"

      // Effacer le contenu de la table
      equipmentTableBody.innerHTML = ""; // Efface le contenu du corps du tableau

      // Ajouter les équipements à la table
      for (let key in equipments) {
        const equipment = equipments[key]; // Récupère l'équipement correspondant à la clé
        const row = createEquipmentRow(key, equipment); // Appelle la fonction pour créer une ligne d'équipement dans le tableau
        equipmentTableBody.appendChild(row); // Ajoute la ligne d'équipement au corps du tableau
      }
    });
  }

  // Fonction pour ajouter un équipement à la base de données
  function addEquipmentToDatabase(equipment) {
    const newEquipmentRef = equipmentRef.push(); // Génère une nouvelle clé unique dans la collection "equipments"
    const equipmentKey = newEquipmentRef.key; // Récupère la clé générée
    equipment.key = equipmentKey; // Ajoute la clé à l'objet equipment
    newEquipmentRef.set(equipment); // Ajoute l'équipement à la base de données avec la clé générée
  }

  // Fonction pour créer une ligne d'équipement dans le tableau
  function createEquipmentRow(key, equipment) {
    const row = document.createElement("tr"); // Crée un élément de ligne HTML

    // Ajoutez un gestionnaire d'événement pour le clic sur la ligne
    row.addEventListener("click", function() {
      // Retirez d'abord la classe de surbrillance de toutes les lignes
      const rows = document.querySelectorAll("#equipment-list tbody tr"); // Sélectionne toutes les lignes à l'intérieur du corps du tableau
      rows.forEach(function(row) {
        row.classList.remove("highlight"); // Supprime la classe "highlight" de chaque ligne
      });

      // Ajoutez la classe de surbrillance à la ligne cliquée
      row.classList.add("highlight"); // Ajoute la classe "highlight" à la ligne cliquée

      // Ouvrez le modal "Détail de l'équipement"
      openEquipmentDetailModal(equipment); // Appelle la fonction pour ouvrir le modal de détail de l'équipement avec les données de l'équipement
    });

    const columns = [
      equipment.designation,
      equipment.quantite,
      equipment.marque,
      equipment.modele,
      equipment.dimensions,
      equipment.prixAchatHT
    ];

    for (let i = 0; i < columns.length; i++) {
      const cell = document.createElement("td"); // Crée un élément de cellule HTML
      cell.textContent = columns[i]; // Définit le texte de la cellule en fonction de la colonne correspondante
      row.appendChild(cell); // Ajoute la cellule à la ligne
    }

    return row; // Retourne la ligne d'équipement créée
  }

  function openEquipmentDetailModal(equipment) {
    const modal = document.getElementById("equipment-detail-modal"); // Sélectionne l'élément avec l'ID "equipment-detail-modal"

    // Remplissez les détails de l'équipement dans le modal
    document.getElementById("equipment-detail-categorie").textContent = equipment.categorie;
    document.getElementById("equipment-detail-designation").textContent = equipment.designation;
    document.getElementById("equipment-detail-quantite").textContent = equipment.quantite;
    document.getElementById("equipment-detail-marque").textContent = equipment.marque;
    document.getElementById("equipment-detail-modele").textContent = equipment.modele;
    document.getElementById("equipment-detail-dimensions").textContent = equipment.dimensions;
    document.getElementById("equipment-detail-prixAchatHT").textContent = equipment.prixAchatHT;

    // Affichez le modal
    modal.style.display = "block"; // Affiche le modal "Détail de l'équipement"

    // Gestionnaire d'événement pour le bouton "Modifier"
    const editEquipmentButton = document.getElementById("edit-equipment-button"); // Sélectionne l'élément avec l'ID "edit-equipment-button"
    editEquipmentButton.addEventListener("click", function() {
      // Ouvrir le modal de modification avec les données de l'équipement
      openEditEquipmentModal(equipment); // Appelle la fonction pour ouvrir le modal de modification avec les données de l'équipement
    });

    // Gestionnaire d'événement pour le bouton "Supprimer"
    const deleteEquipmentButton = document.getElementById("delete-equipment-button"); // Sélectionne l'élément avec l'ID "delete-equipment-button"
    deleteEquipmentButton.addEventListener("click", function() {
      // Supprimer l'équipement de la base de données
      deleteEquipmentFromDatabase(equipment); // Appelle la fonction pour supprimer l'équipement de la base de données
      // Fermer le modal "Détail de l'équipement"
      modal.style.display = "none"; // Masque le modal "Détail de l'équipement"
    });
  }

  // Fonction pour supprimer un équipement de la base de données
  function deleteEquipmentFromDatabase(equipment) {
    const equipmentKey = equipment.key; // Obtenez la clé de l'équipement à supprimer à partir de l'objet equipment
    const equipmentRefToRemove = equipmentRef.child(equipmentKey); // Sélectionne la référence de l'équipement à supprimer dans la collection "equipments"
    equipmentRefToRemove.remove() // Supprime l'équipement de la base de données
      .then(function() {
        console.log("Équipement supprimé avec succès de la base de données");
      })
      .catch(function(error) {
        console.error("Erreur lors de la suppression de l'équipement : ", error);
      });
  }

  // Fonction pour ouvrir le modal de modification avec les données de l'équipement
  function openEditEquipmentModal(equipment) {
    const modal = document.getElementById("edit-equipment-modal"); // Sélectionne l'élément avec l'ID "edit-equipment-modal"

    // Remplissez les champs de saisie avec les données de l'équipement
    document.getElementById("edit-categorie-input").value = equipment.categorie;
    document.getElementById("edit-designation-input").value = equipment.designation;
    document.getElementById("edit-quantite-input").value = equipment.quantite;
    document.getElementById("edit-marque-input").value = equipment.marque;
    document.getElementById("edit-modele-input").value = equipment.modele;
    document.getElementById("edit-dimensions-input").value = equipment.dimensions;
    document.getElementById("edit-prixAchatHT-input").value = equipment.prixAchatHT;

    // Affichez le modal
    modal.style.display = "block"; // Affiche le modal de modification

    // Gestionnaire d'événement pour la soumission du formulaire de modification
    const editEquipmentForm = document.getElementById("edit-equipment-form"); // Sélectionne l'élément avec l'ID "edit-equipment-form"
    editEquipmentForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
      // Mettre à jour l'équipement dans la base de données avec les nouvelles valeurs
      updateEquipmentInDatabase(equipment); // Appelle la fonction pour mettre à jour l'équipement dans la base de données
      // Fermer le modal de modification


    });
  }

  // Fonction pour mettre à jour un équipement dans la base de données
  function updateEquipmentInDatabase(equipment) {
    const equipmentKey = equipment.key; // Obtenez la clé de l'équipement à mettre à jour à partir de l'objet equipment
    const equipmentRefToUpdate = equipmentRef.child(equipmentKey); // Sélectionne la référence de l'équipement à mettre à jour dans la collection "equipments"
    const updatedEquipment = {
      categorie: document.getElementById("edit-categorie-input").value,
      designation: document.getElementById("edit-designation-input").value,
      quantite: document.getElementById("edit-quantite-input").value,
      marque: document.getElementById("edit-marque-input").value,
      modele: document.getElementById("edit-modele-input").value,
      dimensions: document.getElementById("edit-dimensions-input").value,
      prixAchatHT: document.getElementById("edit-prixAchatHT-input").value
    };
    equipmentRefToUpdate.update(updatedEquipment) // Met à jour l'équipement dans la base de données avec les nouvelles valeurs
      .then(function() {
        console.log("Équipement mis à jour avec succès dans la base de données");
      })
      .catch(function(error) {
        console.error("Erreur lors de la mise à jour de l'équipement : ", error);
      });
  }
});
