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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  appId: "YOUR_APP_ID"
};

// Initialisez Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la collection "equipments" dans Firestore
const equipmentsCollection = firebase.firestore().collection('equipments');

// Le reste du code reste inchangé
// ...
