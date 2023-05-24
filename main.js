// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);

// Référence à la collection "equipments" dans Firestore
const equipmentCollection = firebase.firestore().collection("equipments");

// Fonction pour ajouter un nouvel équipement
function addEquipment(event) {
  event.preventDefault();

  // Récupération des valeurs du formulaire
  const categorie = document.getElementById("categorie").value;
  const dateLivraison = document.getElementById("dateLivraison").value;
  const marque = document.getElementById("marque").value;
  const type = document.getElementById("type").value;
  const reference = document.getElementById("reference").value;
  const numeroSerie = document.getElementById("numeroSerie").value;
  const numeroInterne = document.getElementById("numeroInterne").value;
  const quantite = document.getElementById("quantite").value;
  const valeurHT = document.getElementById("valeurHT").value;
  const factureAchat = document.getElementById("factureAchat").files[0];
  const dateFacture = document.getElementById("dateFacture").value;
  const complementInformation = document.getElementById("complementInformation").value;

  // Création d'un objet représentant l'équipement à ajouter
  const newEquipment = {
    categorie,
    dateLivraison,
    marque,
    type,
    reference,
    numeroSerie,
    numeroInterne,
    quantite,
    valeurHT,
    dateFacture,
    complementInformation
  };

  // Génération d'un identifiant personnalisé pour l'équipement
  const equipmentId = generateEquipmentId();

  // Ajout de l'équipement à la base de données avec l'identifiant personnalisé
  equipmentCollection.doc(equipmentId).set(newEquipment)
    .then(() => {
      // Réinitialisation du formulaire
      document.getElementById("addEquipmentForm").reset();
      // Fermeture du modal
      hideModal();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
}

// Fonction pour générer un identifiant personnalisé pour l'équipement
function generateEquipmentId() {
  // Générez un identifiant unique ici, par exemple en utilisant la date actuelle ou une logique spécifique à votre application
  return 'equipment-' + Date.now();
}

// Fonction pour afficher les équipements en stock
function displayEquipment() {
  equipmentCollection.get()
    .then((querySnapshot) => {
      // Effacement des données précédentes
      const equipmentList = document.getElementById("equipmentList");
      equipmentList.innerHTML = "";

      // Parcours des documents de la collection
      querySnapshot.forEach((doc) => {
        const equipmentData = doc.data();

        // Création d'un élément HTML pour afficher les données de l'équipement
        const equipmentItem = document.createElement("div");
        equipmentItem.classList.add("equipment-item");
        equipmentItem.innerHTML = `
          <h3>${equipmentData.marque} ${equipmentData.type}</h3>
          <p>Catégorie: ${equipmentData.categorie}</p>
          <p>Référence: ${equipmentData.reference}</p>
          <p>Numéro de série: ${equipmentData.numeroSerie}</p>
          <p>Numéro interne: ${equipmentData.numeroInterne}</p>
          <p>Quantité: ${equipmentData.quantite}</p>
          <p>Valeur HT: ${equipmentData.valeurHT}</p>
          <p>Date de livraison: ${equipmentData.dateLivraison}</p>
          <p>Date de facture: ${equipmentData.dateFacture}</p>
          <p>Informations complémentaires: ${equipmentData.complementInformation}</p>
        `;

        // Ajout de l'élément à la liste
        equipmentList.appendChild(equipmentItem);
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des équipements :", error);
    });
}


// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  equipmentCollection.doc(equipmentId).delete()
    .then(() => {
      console.log("Équipement supprimé avec succès !");
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'équipement :", error);
    });
}

// Fonction pour afficher le modal d'ajout d'un équipement
function showAddEquipmentModal() {
  document.getElementById("addEquipmentModal").style.display = "block";
}

// Fonction pour masquer le modal
function hideModal() {
  document.getElementById("addEquipmentModal").style.display = "none";
}

// Événement au chargement de la page
window.onload = function() {
  // Récupération des équipements et affichage initial
  displayEquipment();

  // Écouteur d'événement pour le formulaire d'ajout d'un équipement
  document.getElementById("addEquipmentForm").addEventListener("submit", addEquipment);

  // Écouteur d'événement pour le bouton "Ajouter un équipement"
  document.getElementById("addEquipmentButton").addEventListener("click", showAddEquipmentModal);
};

