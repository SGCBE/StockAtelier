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
firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const database = firebase.database();

// Référence à la table "equipments" dans la base de données
const equipmentRef = database.ref("equipments");

// Référence à l'emplacement de stockage dans Firebase Storage
const storageRef = firebase.storage().ref();

// Variables globales pour la capture de photo
let stream;
let videoTrack;
let photoCanvas;
let captureButton;

// Fonction pour afficher le modal
function showModal() {
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  addEquipmentModal.style.display = "block";

  // Démarrer la vidéo
  startVideo();
}

// Fonction pour masquer le modal
function hideModal() {
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  addEquipmentModal.style.display = "none";

  // Arrêter la vidéo et libérer la ressource du flux
  stopVideo();
}

// Fonction pour démarrer la vidéo
function startVideo() {
  const cameraPreview = document.getElementById("cameraPreview");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      cameraPreview.srcObject = stream;
      videoTrack = stream.getVideoTracks()[0];
      captureButton.disabled = false;
    })
    .catch((error) => {
      console.error("Erreur lors de l'accès à la caméra :", error);
    });
}

// Fonction pour arrêter la vidéo
function stopVideo() {
  const cameraPreview = document.getElementById("cameraPreview");

  if (videoTrack) {
    videoTrack.stop();
  }

  if (cameraPreview.srcObject) {
    cameraPreview.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
  }
}

// Fonction pour capturer la photo
function capturePhoto() {
  const cameraPreview = document.getElementById("cameraPreview");
  const photoCanvas = document.getElementById("photoCanvas");
  const context = photoCanvas.getContext("2d");

  // Définir la taille du canevas en fonction de la vidéo
  photoCanvas.width = cameraPreview.videoWidth;
  photoCanvas.height = cameraPreview.videoHeight;

  // Dessiner l'image capturée sur le canevas
  context.drawImage(cameraPreview, 0, 0, photoCanvas.width, photoCanvas.height);

  // Arrêter la vidéo
  stopVideo();
}

// Fonction pour ajouter un équipement à la base de données
function addEquipment(equipmentData) {
  equipmentRef.push().set(equipmentData)
    .then(() => {
      console.log("Équipement ajouté avec succès !");
      hideModal();
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout de l'équipement :", error);
    });
}

// Fonction pour télécharger la photo dans Firebase Storage
function uploadPhoto(photoData) {
  // Générer un nom de fichier unique pour la photo
  const filename = "photo_" + Date.now() + ".jpg";

  // Référence à l'emplacement spécifique où vous souhaitez stocker la photo
  const photoRef = storageRef.child("images/" + filename);

  // Téléchargement de la photo
  photoRef.putString(photoData, "data_url")
    .then((snapshot) => {
      console.log("Photo téléchargée avec succès !");
      // Obtenir l'URL de téléchargement de la photo
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      // Ajouter l'URL de la photo à l'objet equipmentData
      const equipmentData = {
        nom: document.getElementById("nom").value,
        description: document.getElementById("description").value,
        quantite: document.getElementById("quantite").value,
        photo: downloadURL
      };

      // Ajouter l'équipement à la base de données
      addEquipment(equipmentData);
    })
    .catch((error) => {
      console.error("Erreur lors du téléchargement de la photo :", error);
    });
}

// Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
  event.preventDefault();

  const nomInput = document.getElementById("nom");
  const descriptionInput = document.getElementById("description");
  const quantiteInput = document.getElementById("quantite");

  const equipmentData = {
    nom: nomInput.value,
    description: descriptionInput.value,
    quantite: quantiteInput.value
  };

  // Vérifier si une photo a été capturée
  if (photoCanvas.toDataURL) {
    // Convertir le canevas en une représentation de données d'URL
    const photoData = photoCanvas.toDataURL("image/jpeg");

    // Télécharger la photo dans Firebase Storage
    uploadPhoto(photoData);
  } else {
    // Ajouter l'équipement à la base de données sans photo
    addEquipment(equipmentData);
  }
}

// Fonction d'initialisation de l'application
function initializeApp() {
  // Référence aux éléments du DOM
  const addEquipmentButton = document.getElementById("addEquipmentButton");
  captureButton = document.getElementById("captureButton");
  photoCanvas = document.getElementById("photoCanvas");
  const addEquipmentForm = document.getElementById("addEquipmentForm");

  // Gérer l'événement clic sur le bouton "Ajouter un équipement"
  addEquipmentButton.addEventListener("click", showModal);

  // Gérer l'événement clic sur le bouton "Capturer la photo"
  captureButton.addEventListener("click", capturePhoto);

  // Gérer l'événement de soumission du formulaire
  addEquipmentForm.addEventListener("submit", handleFormSubmit);
}

// Exécuter la fonction d'initialisation de l'application une fois que le DOM est prêt
document.addEventListener("DOMContentLoaded", initializeApp);


