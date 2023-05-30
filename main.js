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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const equipmentCollection = db.collection("equipments");

const equipmentTable = document.getElementById("equipment-table");
const equipmentDetailsModal = document.getElementById("equipment-details-modal");
const equipmentDetails = document.getElementById("equipment-details");
const editEquipmentBtn = document.getElementById("edit-equipment-btn");
const deleteEquipmentBtn = document.getElementById("delete-equipment-btn");

// Afficher les détails de l'équipement dans le modal
function showEquipmentDetails(equipmentId) {
  equipmentCollection.doc(equipmentId).get()
    .then((doc) => {
      if (doc.exists) {
        const equipmentData = doc.data();
        let detailsHTML = "";
        for (const [key, value] of Object.entries(equipmentData)) {
          detailsHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
        equipmentDetails.innerHTML = detailsHTML;
        editEquipmentBtn.disabled = false;
        deleteEquipmentBtn.disabled = false;
        equipmentDetailsModal.style.display = "block";
      } else {
        console.log("L'équipement n'existe pas.");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des détails de l'équipement :", error);
    });
}

// Fermer le modal des détails de l'équipement
function closeEquipmentDetailsModal() {
  equipmentDetailsModal.style.display = "none";
}

// Charger la liste des équipements
function loadEquipmentList(categoryFilter = "") {
  let query = equipmentCollection;
  if (categoryFilter) {
    query = query.where("category", "==", categoryFilter);
  }
  query.get()
    .then((querySnapshot) => {
      let tableHTML = "";
      querySnapshot.forEach((doc) => {
        const equipmentData = doc.data();
        const { designation, marque, quantite } = equipmentData;
        tableHTML += `
          <tr data-equipment-id="${doc.id}">
            <td>${designation}</td>
            <td>${marque}</td>
            <td>${quantite}</td>
          </tr>
        `;
      });
      const tableBody = equipmentTable.querySelector("tbody");
      tableBody.innerHTML = tableHTML;
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la liste des équipements :", error);
    });
}

// Filtrer la liste des équipements par catégorie
const categoryFilterSelect = document.getElementById("category-filter");
categoryFilterSelect.addEventListener("change", (event) => {
  const categoryFilter = event.target.value;
  loadEquipmentList(categoryFilter);
});

// Gérer les clics sur les lignes de la table
equipmentTable.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "TD") {
    const tr = target.closest("tr");
    const equipmentId = tr.getAttribute("data-equipment-id");
    showEquipmentDetails(equipmentId);
  }
});

// Gérer la fermeture du modal des détails de l'équipement
const closeModalBtn = document.getElementsByClassName("close")[0];
closeModalBtn.addEventListener("click", closeEquipmentDetailsModal);

// Chargement initial de la liste des équipements
loadEquipmentList();


