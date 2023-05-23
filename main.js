// Configuration de Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmno"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database service
var db = firebase.firestore();

// DOM elements
var equipmentTableBody = document.getElementById('equipmentTableBody');
var addEquipmentButton = document.getElementById('addEquipmentButton');
var addEquipmentModal = document.getElementById('addEquipmentModal');
var closeModalButton = document.getElementById('closeModalButton');
var addEquipmentForm = document.getElementById('addEquipmentForm');

// Fonction pour afficher tous les équipements dans le tableau
function displayEquipments(equipments) {
  equipmentTableBody.innerHTML = '';

  equipments.forEach(function(equipment) {
    var tr = document.createElement('tr');
    tr.setAttribute('data-id', equipment.id);
tr.innerHTML = `
  <td>${equipment.dateLivraison}</td>
  <td>${equipment.fournisseurClient}</td>
  <td>${equipment.marque}</td>
  <td>${equipment.type}</td>
  <td>${equipment.reference}</td>
  <td>${equipment.numeroSerie}</td>
  <td>${equipment.valeurHT}</td>
  <td>${equipment.factureAchat}</td>
  <td>${equipment.dateFacture}</td>
  <td>${equipment.complementInfo}</td>
  <td>
    <button class="editButton" data-id="${equipment.id}">Modifier</button>
    <button class="deleteButton" data-id="${equipment.id}">Supprimer</button>
  </td>
    `;

    // Ajouter un événement de clic sur le bouton Modifier
    var editButton = tr.querySelector('.editButton');
    editButton.addEventListener('click', function() {
      openEditModal(equipment.id);
    });

    // Ajouter un événement de clic sur le bouton Supprimer
    var deleteButton = tr.querySelector('.deleteButton');
    deleteButton.addEventListener('click', function() {
      deleteEquipment(equipment.id);
    });

    equipmentTableBody.appendChild(tr);
  });
}

// Fonction pour ajouter un nouvel équipement
function addEquipment(equipment) {
var dateLivraison = document.getElementById('deliveryDate').value;
var fournisseurClient = document.getElementById('supplierClient').value;
var marque = document.getElementById('brand').value;
var type = document.getElementById('type').value;
var reference = document.getElementById('reference').value;
var numeroSerie = document.getElementById('serialNumber').value;
var valeurHT = document.getElementById('value').value;
var factureAchat = document.getElementById('purchaseInvoice').value;
var dateFacture = document.getElementById('invoiceDate').value;
var complementInfo = document.getElementById('complement').value;
  db.collection('equipments').add(equipment)
    .then(function(docRef) {
      console.log('Equipment added with ID: ', docRef.id);
      addEquipmentForm.reset();
      closeModal();
    })
    .catch(function(error) {
      console.error('Error adding equipment: ', error);
    });
}

// Fonction pour mettre à jour un équipement existant
function updateEquipment(equipmentId, updatedEquipment) {
  db.collection('equipments').doc(equipmentId).update(updatedEquipment)
    .then(function() {
      console.log('Equipment updated with ID: ', equipmentId);
      closeEditModal();
    })
    .catch(function(error) {
      console.error('Error updating equipment: ', error);
    });
}

// Fonction pour supprimer un équipement
function deleteEquipment(equipmentId) {
  var confirmation = confirm('Voulez-vous vraiment supprimer cet équipement ?');
  if (confirmation) {
    db.collection('equipments').doc(equipmentId).delete()
      .then(function() {
        console.log('Equipment deleted with ID: ', equipmentId);
      })
      .catch(function(error) {
        console.error('Error deleting equipment: ', error);
      });
  }
}

// Ajouter un événement de soumission du formulaire d'ajout d'équipement
addEquipmentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var dateLivraison = document.getElementById('dateLivraison').value;
  var fournisseurClient = document.getElementById('fournisseurClient').value;
  var marque = document.getElementById('marque').value;
  var type = document.getElementById('type').value;
  var reference = document.getElementById('reference').value;
  var numeroSerie = document.getElementById('numeroSerie').value;
  var valeurHT = document.getElementById('valeurHT').value;
  var factureAchat = document.getElementById('factureAchat').value;
  var dateFacture = document.getElementById('dateFacture').value;
  var complementInfo = document.getElementById('complementInfo').value;

  var newEquipment = {
    dateLivraison: dateLivraison,
    fournisseurClient: fournisseurClient,
    marque: marque,
    type: type,
    reference: reference,
    numeroSerie: numeroSerie,
    valeurHT: valeurHT,
    factureAchat: factureAchat,
    dateFacture: dateFacture,
    complementInfo: complementInfo
  };

  addEquipment(newEquipment);
});

// Ouvrir la fenêtre modale d'ajout d'équipement
addEquipmentButton.addEventListener('click', function() {
  addEquipmentModal.style.display = 'block';
});

// Fermer la fenêtre modale
function closeModal() {
  addEquipmentModal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);

// Ouvrir la fenêtre modale de modification d'équipement
function openEditModal(equipmentId) {
  var editEquipmentModal = document.getElementById('editEquipmentModal');
  var closeEditModalButton = document.getElementById('closeEditModalButton');
  var editEquipmentForm = document.getElementById('editEquipmentForm');

  // Récupérer les données de l'équipement à modifier depuis Firestore
  db.collection('equipments').doc(equipmentId).get()
    .then(function(doc) {
      if (doc.exists) {
        var equipmentData = doc.data();

        // Pré-remplir les champs du formulaire avec les données existantes
document.getElementById('editDeliveryDate').value = equipmentData.dateLivraison;
document.getElementById('editSupplierClient').value = equipmentData.fournisseurClient;
document.getElementById('editBrand').value = equipmentData.marque;
document.getElementById('editType').value = equipmentData.type;
document.getElementById('editReference').value = equipmentData.reference;
document.getElementById('editSerialNumber').value = equipmentData.numeroSerie;
document.getElementById('editValue').value = equipmentData.valeurHT;
document.getElementById('editPurchaseInvoice').value = equipmentData.factureAchat;
document.getElementById('editInvoiceDate').value = equipmentData.dateFacture;
document.getElementById('editComplement').value = equipmentData.complementInfo;


        // Ajouter un événement de soumission du formulaire de modification d'équipement
        editEquipmentForm.addEventListener('submit', function(e) {
          e.preventDefault();

          var editedDateLivraison = document.getElementById('editDateLivraison').value;
          var editedFournisseurClient = document.getElementById('editFournisseurClient').value;
          var editedMarque = document.getElementById('editMarque').value;
          var editedType = document.getElementById('editType').value;
          var editedReference = document.getElementById('editReference').value;
          var editedNumeroSerie = document.getElementById('editNumeroSerie').value;
          var editedValeurHT = document.getElementById('editValeurHT').value;
          var editedFactureAchat = document.getElementById('editFactureAchat').value;
          var editedDateFacture = document.getElementById('editDateFacture').value;
          var editedComplementInfo = document.getElementById('editComplementInfo').value;

          var editedEquipment = {
            dateLivraison: editedDateLivraison,
            fournisseurClient: editedFournisseurClient,
            marque: editedMarque,
            type: editedType,
            reference: editedReference,
            numeroSerie: editedNumeroSerie,
            valeurHT: editedValeurHT,
            factureAchat: editedFactureAchat,
            dateFacture: editedDateFacture,
            complementInfo: editedComplementInfo
          };

          updateEquipment(equipmentId, editedEquipment);
        });

        // Ouvrir la fenêtre modale de modification d'équipement
        editEquipmentModal.style.display = 'block';

        // Fermer la fenêtre modale de modification
        function closeEditModal() {
          editEquipmentModal.style.display = 'none';
        }

        closeEditModalButton.addEventListener('click', closeEditModal);
      } else {
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.error('Error getting equipment: ', error);
    });
}

// Observer les modifications en temps réel des équipements
db.collection('equipments').onSnapshot(function(snapshot) {
  var changes = snapshot.docChanges();
  changes.forEach(function(change) {
    if (change.type === 'added') {
      renderEquipment(change.doc);
    } else if (change.type === 'removed') {
      var tr = equipmentTableBody.querySelector('[data-id=' + change.doc.id + ']');
      equipmentTableBody.removeChild(tr);
    } else if (change.type === 'modified') {
      var tr = equipmentTableBody.querySelector('[data-id=' + change.doc.id + ']');
      equipmentTableBody.removeChild(tr);
      renderEquipment(change.doc);
    }
  });
});

// Afficher les données de l'équipement dans le tableau
function renderEquipment(doc) {
  var tr = document.createElement('tr');
  tr.setAttribute('data-id', doc.id);
  tr.innerHTML = `
<td>${doc.data().dateLivraison}</td>
<td>${doc.data().fournisseurClient}</td>
<td>${doc.data().marque}</td>
<td>${doc.data().type}</td>
<td>${doc.data().reference}</td>
<td>${doc.data().numeroSerie}</td>
<td>${doc.data().valeurHT}</td>
<td>${doc.data().factureAchat}</td>
<td>${doc.data().dateFacture}</td>
<td>${doc.data().complementInfo}</td>

    <td>
      <button class="editButton" data-id="${doc.id}">Modifier</button>
      <button class="deleteButton" data-id="${doc.id}">Supprimer</button>
    </td>
  `;

  // Ajouter un événement de clic sur le bouton de modification
  var editButton = tr.querySelector('.editButton');
  editButton.addEventListener('click', function() {
    openEditModal(doc.id);
  });

  // Ajouter un événement de clic sur le bouton de suppression
  var deleteButton = tr.querySelector('.deleteButton');
  deleteButton.addEventListener('click', function() {
    deleteEquipment(doc.id);
  });

  equipmentTableBody.appendChild(tr);
}
