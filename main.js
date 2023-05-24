// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

  // Ajout de l'équipement à la base de données
  equipmentCollection.add(newEquipment)
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

// Fonction pour afficher les équipements en stock
function displayEquipment() {
  equipmentCollection.get()
    .then((querySnapshot) => {
      // Effacement des données précédentes
      document.getElementById("equipmentTableBody").innerHTML = "";

      querySnapshot.forEach((doc) => {
        const equipment = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
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
          <td>${equipment.complementInformation}</td>
          <td>
            <button onclick="editEquipment('${doc.id}')">Modifier</button>
            <button onclick="deleteEquipment('${doc.id}')">Supprimer</button>
          </td>
        `;
        document.getElementById("equipmentTableBody").appendChild(row);
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

