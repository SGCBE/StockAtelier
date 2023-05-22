// Récupérer les références des éléments HTML
const equipmentList = document.getElementById('equipment-list');
const addEquipmentBtn = document.getElementById('add-equipment-btn');
const detailsModal = document.getElementById('details-modal');
const detailsModalClose = document.getElementById('details-modal-close');
const detailsModalTitle = document.getElementById('details-modal-title');
const detailsModalCategory = document.getElementById('details-modal-category');
const detailsModalDescription = document.getElementById('details-modal-description');
const detailsModalImageContainer = document.getElementById('details-modal-image-container');
const detailsModalImage = document.getElementById('details-modal-image');
const addModal = document.getElementById('add-modal');
const addModalForm = document.getElementById('add-modal-form');
const addModalClose = document.getElementById('add-modal-close');
const photoPreview = document.getElementById('photo-preview');

// Initialisez Firebase avec votre propre configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
  authDomain: "atelier---gestion-de-stock.firebaseapp.com",
  databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
  projectId: "atelier---gestion-de-stock",
  storageBucket: "atelier---gestion-de-stock.appspot.com",
  messagingSenderId: "92935528444",
  appId: "1:92935528444:web:57786855ed9cc7ef129c79"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la collection "equipments" dans Firestore
const equipmentsCollection = firebase.firestore().collection('equipments');

// Le reste du code reste inchangé
// ...
