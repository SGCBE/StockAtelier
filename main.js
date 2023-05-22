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

// Remplacez les valeurs par vos propres informations de configuration Firebase
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

// Fonction pour afficher les détails d'un équipement dans le modal
function showEquipmentDetails(equipment) {
  detailsModalTitle.textContent = equipment.designation;
  detailsModalCategory.textContent = equipment.category;
  detailsModalDescription.textContent = equipment.description;

  if (equipment.imageUrl) {
    detailsModalImage.src = equipment.imageUrl;
    detailsModalImageContainer.style.display = 'block';
  } else {
    detailsModalImageContainer.style.display = 'none';
  }

  detailsModal.style.display = 'block';
}

// Fonction pour afficher la liste des équipements
function displayEquipmentList(equipments) {
  equipmentList.innerHTML = '';

  equipments.forEach((equipment) => {
    const equipmentCard = document.createElement('div');
    equipmentCard.classList.add('equipment-card');
    equipmentCard.textContent = equipment.designation;

    equipmentCard.addEventListener('click', () => {
      showEquipmentDetails(equipment);
    });

    equipmentList.appendChild(equipmentCard);
  });
}

// Fonction pour afficher l'aperçu de la photo sélectionnée
function showPhotoPreview(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      photoPreview.innerHTML = '';
      photoPreview.appendChild(img);
    };

    reader.readAsDataURL(file);
  } else {
    photoPreview.innerHTML = '';
  }
}

// Gérer l'ouverture du modal d'ajout d'équipement
function handleAddEquipmentClick() {
  addModal.style.display = 'block';
}

// Gérer la fermeture du modal des détails d'équipement
function handleDetailsModalClose() {
  detailsModal.style.display = 'none';
}

// Gérer la fermeture du modal d'ajout d'équipement
function handleAddModalClose() {
  addModal.style.display = 'none';
  addModalForm.reset();
  photoPreview.innerHTML = '';
}

// Gérer l'envoi du formulaire d'ajout d'équipement
function handleAddModalFormSubmit(event) {
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const category = document.getElementById('category').value;
  const designation = document.getElementById('designation').value;
  const description = document.getElementById('description').value;
  const quantity = document.getElementById('quantity').value;
  const photo = document.getElementById('photo').files[0];

  // Créer un objet représentant le nouvel équipement
  const newEquipment = {
    category,
    designation,
    description,
    quantity: parseInt(quantity),
  };

  // Enregistrer l'équipement dans Firebase Firestore
  equipmentsCollection.add(newEquipment)
    .then(() => {
      // Réinitialiser le formulaire et fermer le modal d'ajout
      addModalForm.reset();
      photoPreview.innerHTML = '';
      addModal.style.display = 'none';
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement de l'équipement:", error);
    });
}

// Ajouter des gestionnaires d'événements
addEquipmentBtn.addEventListener('click', handleAddEquipmentClick);
detailsModalClose.addEventListener('click', handleDetailsModalClose);
addModalClose.addEventListener('click', handleAddModalClose);
addModalForm.addEventListener('submit', handleAddModalFormSubmit);
document.getElementById('photo').addEventListener('change', showPhotoPreview);
