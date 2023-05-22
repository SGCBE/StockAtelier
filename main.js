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

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database service
var db = firebase.firestore();

// DOM elements
var equipmentTableBody = document.getElementById('equipmentTableBody');
var addEquipmentButton = document.getElementById('addEquipmentButton');
var addEquipmentModal = document.getElementById('addEquipmentModal');
var closeModalButton = document.getElementById('closeModalButton');
var addEquipmentForm = document.getElementById('addEquipmentForm');

// Add equipment form submit event
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

  // Add the equipment to Firestore
  db.collection('equipments').add({
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
  })
  .then(function(docRef) {
    console.log('Equipment added with ID: ', docRef.id);
    addEquipmentForm.reset();
    closeModal();
  })
  .catch(function(error) {
    console.error('Error adding equipment: ', error);
  });
});

// Open add equipment modal
addEquipmentButton.addEventListener('click', function() {
  addEquipmentModal.style.display = 'block';
});

// Close modal
function closeModal() {
  addEquipmentModal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);

// Real-time listener for equipment changes
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

// Render equipment data in the table
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

  // Add edit button click event
  var editButton = tr.querySelector('.editButton');
  editButton.addEventListener('click', function() {
    openEditModal(doc);
  });

  // Add delete button click event
  var deleteButton = tr.querySelector('.deleteButton');
  deleteButton.addEventListener('click', function() {
    deleteEquipment(doc);
  });

  equipmentTableBody.appendChild(tr);
}

// Open edit equipment modal
function openEditModal(doc) {
  var editEquipmentModal = document.getElementById('editEquipmentModal');
  var closeEditModalButton = document.getElementById('closeEditModalButton');
  var editEquipmentForm = document.getElementById('editEquipmentForm');

  // Prefill form fields with existing data
  document.getElementById('editDateLivraison').value = doc.data().dateLivraison;
  document.getElementById('editFournisseurClient').value = doc.data().fournisseurClient;
  document.getElementById('editMarque').value = doc.data().marque;
  document.getElementById('editType').value = doc.data().type;
  document.getElementById('editReference').value = doc.data().reference;
  document.getElementById('editNumeroSerie').value = doc.data().numeroSerie;
  document.getElementById('editValeurHT').value = doc.data().valeurHT;
  document.getElementById('editFactureAchat').value = doc.data().factureAchat;
  document.getElementById('editDateFacture').value = doc.data().dateFacture;
  document.getElementById('editComplementInfo').value = doc.data().complementInfo;

  // Submit edit equipment form event
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

    // Update the equipment in Firestore
    db.collection('equipments').doc(doc.id).update({
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
    })
    .then(function() {
      console.log('Equipment updated with ID: ', doc.id);
      editEquipmentForm.reset();
      closeEditModal();
    })
    .catch(function(error) {
      console.error('Error updating equipment: ', error);
    });
  });

  // Open edit equipment modal
  editEquipmentModal.style.display = 'block';

  // Close edit modal
  function closeEditModal() {
    editEquipmentModal.style.display = 'none';
  }

  closeEditModalButton.addEventListener('click', closeEditModal);
}

// Delete equipment
function deleteEquipment(doc) {
  var confirmation = confirm('Voulez-vous vraiment supprimer cet équipement ?');
  if (confirmation) {
    db.collection('equipments').doc(doc.id).delete()
    .then(function() {
      console.log('Equipment deleted with ID: ', doc.id);
    })
    .catch(function(error) {
      console.error('Error deleting equipment: ', error);
    });
  }
}

