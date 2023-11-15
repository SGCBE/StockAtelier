let row;
	
function displayEquipments(equipments) {
  var tableBody = document.querySelector("#equipment-list tbody");
  tableBody.innerHTML = "";

  equipments.forEach(function (equipment) {
    row = document.createElement("tr");
    row.dataset.key = equipment.key;

    // Ajouter la classe de catégorie à la ligne
    row.className = "class-cat-" + equipment.categorie.toLowerCase();

row.innerHTML = `
  <td>${equipment.categorie}</td>
  <td>${equipment.designation}</td>
  <td>${equipment.quantite}</td>
  <td>${equipment.marque}</td>
  <td>${equipment.modele}</td>
  <td>${equipment.dimensions}</td>
  <td>${equipment.prix}</td>
`;

    // Ajouter une class CSS si la quantité est à 0
    if (equipment.quantite == 0) {
      console.log("Adding out-of-stock class to row");
      row.classList.add("out-of-stock");
    }

    tableBody.appendChild(row);

// Ajout d'un gestionnaire d'événements de délégation sur la table
document.getElementById("equipment-list").addEventListener("click", function (event) {
  var target = event.target;

  // Recherche de l'élément parent de type "tr" (ligne) du bouton cliqué
  var row = target.closest("tr");

  // Vérifiez si le clic a été effectué sur un bouton de modification
  if (target.classList.contains("edit-button") && row) {
    var equipmentKey = target.dataset.key;
    displayEditEquipmentModal(equipmentKey);
  }
});

    // Ajout d'un événement click pour afficher le détail de l'équipement
    row.addEventListener("click", function () {
      // Utilisation d'une fonction anonyme pour capturer la valeur de equipment
      (function (currentEquipment) {
        displayEquipmentDetail(currentEquipment.key);
      })(equipment);
    });
	tableBody.appendChild(row);
  });
}

// Fonction pour trier la colonne "Catégorie"
function trierParCategorie() {
  const table = document.getElementById("equipment-list");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.sort((a, b) => {
    const categorieA = a.cells[0].textContent.trim();
    const categorieB = b.cells[0].textContent.trim();
    return categorieA.localeCompare(categorieB);
  });

  // Supprime les lignes existantes
  rows.forEach(row => table.querySelector("tbody").removeChild(row));

  // Ajoute les lignes triées à nouveau
  rows.forEach(row => table.querySelector("tbody").appendChild(row));
}

// Fonction pour afficher les équipements triés
function displaySortedEquipments(columnIndex) {
  sortTable(columnIndex);
}

document.addEventListener("DOMContentLoaded", function() {
  // Configuration Firebase
  var firebaseConfig = {
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

  // Référence à la base de données
  var database = firebase.database();

  // Référence à la table "equipments"
  var equipmentsRef = database.ref("equipments");

  // Ajout d'un état pour suivre si le modal de détail est ouvert
  var isDetailModalOpen = false;

  // Vérifiez si l'utilisateur est connecté avant d'afficher les fonctionnalités de l'application
  function checkUserAuth() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // L'utilisateur est connecté, affichez les fonctionnalités de l'application
        var elementsToShow = document.querySelectorAll(".user-authenticated");
        for (var i = 0; i < elementsToShow.length; i++) {
          elementsToShow[i].style.display = "block";
        }

        var elementsToHide = document.querySelectorAll(".user-not-authenticated");
        for (var j = 0; j < elementsToHide.length; j++) {
          elementsToHide[j].style.display = "none";
        }
      } else {
        // L'utilisateur n'est pas connecté, masquez les fonctionnalités de l'application
        var elementsToShow = document.querySelectorAll(".user-authenticated");
        for (var i = 0; i < elementsToShow.length; i++) {
          elementsToShow[i].style.display = "none";
        }

        var elementsToHide = document.querySelectorAll(".user-not-authenticated");
        for (var j = 0; j < elementsToHide.length; j++) {
          elementsToHide[j].style.display = "block";
        }
      }
    });
  }

  // Appel de la fonction pour vérifier l'état de l'authentification
  checkUserAuth();

  // Affichage de la fenêtre modale d'authentification au chargement de la page
  var authModal = document.getElementById("auth-modal");
  authModal.style.display = "block";

 // Gestion de la soumission du formulaire d'authentification
  var authForm = document.getElementById("auth-form");
  authForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = authForm.elements["email-input"].value;
    var password = authForm.elements["password-input"].value;

    // Utilisation de Firebase Authentication pour se connecter avec l'email et le mot de passe
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        // Connexion réussie, fermer la fenêtre modale d'authentification
        authModal.style.display = "none";

        // Affichez les fonctionnalités de l'application maintenant que l'utilisateur est connecté
        checkUserAuth();
      })
      .catch(function (error) {
        // Gestion des erreurs de connexion
        var errorMessage = error.message;
        console.error(errorMessage);
        // Afficher un message d'erreur à l'utilisateur, si nécessaire.
      });
  });

  // Gestion du bouton "Mot de passe oublié"
  var forgotPasswordButton = document.getElementById("forgot-password-button");
  forgotPasswordButton.addEventListener("click", function () {
    var email = prompt("Entrez votre adresse email pour réinitialiser votre mot de passe :");
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
          alert("Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.");
        })
        .catch(function (error) {
          var errorMessage = error.message;
          console.error(errorMessage);
        });
    }
  });

  // Gestion du bouton "Créer un compte"
  var createAccountButton = document.getElementById("create-account-button");
  createAccountButton.addEventListener("click", function () {
    var email = prompt("Entrez votre adresse email pour créer un compte :");
    if (email) {
      var password = prompt("Entrez un mot de passe pour votre compte :");
      if (password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function () {
            alert("Compte créé avec succès !");
          })
          .catch(function (error) {
            var errorMessage = error.message;
            console.error(errorMessage);
            alert("Une erreur s'est produite lors de la création du compte.");
          });
      }
    }
  });

  // Fonction pour afficher la fenêtre modale de modification d'équipement
  function displayEditEquipmentModal(key, equipment) {
    var modal = document.getElementById("edit-equipment-modal");
    var closeButton = document.getElementById("bouton-modificationequipement-fermer");
    var form = document.getElementById("edit-equipment-form");
    var categorieInput = document.getElementById("edit-equipment-categorie");
    var designationInput = document.getElementById("edit-equipment-designation");
    var quantiteInput = document.getElementById("edit-equipment-quantite");
    var marqueInput = document.getElementById("edit-equipment-marque");
    var modeleInput = document.getElementById("edit-equipment-modele");
    var dimensionsInput = document.getElementById("edit-equipment-dimensions");
    var prixAchatHTInput = document.getElementById("edit-equipment-prixAchatHT");
    var detailsInput = document.getElementById("edit-equipment-details");

    categorieInput.value = equipment.categorie;
    designationInput.value = equipment.designation;
    quantiteInput.value = equipment.quantite;
    marqueInput.value = equipment.marque;
    modeleInput.value = equipment.modele;
    dimensionsInput.value = equipment.dimensions;
    prixAchatHTInput.value = equipment.prix;
    detailsInput.value = equipment.details;

    // Affichage de la fenêtre modale pour la modification
    modal.style.display = "block";

    // Fermeture de la fenêtre modale en cliquant sur le bouton de fermeture
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Fermer le modal "Détail de l'équipement" s'il est ouvert
    var detailModal = document.getElementById("equipment-detail-modal");
    detailModal.style.display = "none";

// Gestion de la soumission du formulaire de modification
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var updatedEquipment = {
    categorie: categorieInput.value,
    designation: designationInput.value,
    quantite: quantiteInput.value,
    marque: marqueInput.value,
    modele: modeleInput.value,
    dimensions: dimensionsInput.value,
    prix: prixAchatHTInput.value,
    details: detailsInput.value
  };

  // Mise à jour de l'équipement dans la base de données
  var equipmentRef = database.ref("equipments/" + key);
  equipmentRef.update(updatedEquipment)
    .then(function () {
        document.getElementById("equipment-detail-categorie").textContent = equipment.categorie;
        document.getElementById("equipment-detail-designation").textContent = equipment.designation;
        document.getElementById("equipment-detail-quantite").textContent = equipment.quantite;
        document.getElementById("equipment-detail-marque").textContent = equipment.marque;
        document.getElementById("equipment-detail-modele").textContent = equipment.modele;
        document.getElementById("equipment-detail-dimensions").textContent = equipment.dimensions;
        document.getElementById("equipment-detail-prixAchatHT").textContent = equipment.prix;
	document.getElementById("equipment-detail-details").textContent = equipment.details;
	    
    // Fermeture de la fenêtre modale après la mise à jour
    modal.style.display = "none";
  })
  .catch(function (error) {
    console.error("Erreur lors de la mise à jour de l'équipement :", error);
  })
  .finally(function () {
    // Mettre à jour le tableau des équipements après la résolution de la promesse
    equipmentsRef.once("value", function (snapshot) {
      var equipments = [];
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var equipment = childSnapshot.val();
        equipment.key = key;
        equipments.push(equipment);
      });
      displayEquipments(equipments);
    });
  })
  .catch(function (error) {
    console.error("Erreur lors de la mise à jour de l'équipement :", error);
  });
});
  }

  // Fonction pour afficher le détail d'un équipement dans une fenêtre modale
  function displayEquipmentDetail(key) {
    var equipmentRef = database.ref("equipments/" + key);
    equipmentRef.once("value", function (snapshot) {
      var equipment = snapshot.val();
      if (equipment) {
        var modal = document.getElementById("equipment-detail-modal");
        var closeButton = document.getElementById("bouton-detailequipement-fermer");
        var editButton = document.getElementById("bouton-detailequipement-modifier");
        var deleteButton = document.getElementById("bouton-detailequipement-supprimer");

        // Ajouter une classe pour indiquer que le modal est ouvert
        modal.classList.add("open");

        // Définir la clé de l'équipement dans l'attribut data-key du bouton "Modifier"
        editButton.setAttribute("data-key", key);

        document.getElementById("equipment-detail-categorie").textContent = equipment.categorie;
        document.getElementById("equipment-detail-designation").textContent = equipment.designation;
        document.getElementById("equipment-detail-quantite").textContent = equipment.quantite;
        document.getElementById("equipment-detail-marque").textContent = equipment.marque;
        document.getElementById("equipment-detail-modele").textContent = equipment.modele;
        document.getElementById("equipment-detail-dimensions").textContent = equipment.dimensions;
        document.getElementById("equipment-detail-prixAchatHT").textContent = equipment.prix;
	document.getElementById("equipment-detail-details").textContent = equipment.details;

        // Affichage de la fenêtre modale
        modal.style.display = "block";

        // Mettre à jour l'état du modal de détail
        isDetailModalOpen = true;

        // Fermeture de la fenêtre modale en cliquant sur le bouton de fermeture
        closeButton.addEventListener("click", function () {
          modal.style.display = "none";
          // Retirer la classe qui indique que le modal est ouvert
          modal.classList.remove("open");
        });

        // Gestion du bouton de modification de l'équipement
        editButton.addEventListener("click", function () {
          // Récupérer la clé depuis l'attribut data-key
          var equipmentKey = editButton.getAttribute("data-key");
          displayEditEquipmentModal(equipmentKey, equipment);
        });

        // Gestion du bouton de suppression de l'équipement
        deleteButton.addEventListener("click", function () {
          deleteEquipment(key);
        });
      } else {
        console.log("L'équipement n'existe pas ou n'a pas été trouvé.");
      }
    });

    // Mettre à jour le tableau des équipements uniquement si le modal de détail est fermé
    var modal = document.getElementById("equipment-detail-modal");
    if (!modal.classList.contains("open")) {
      equipmentsRef.once("value", function (snapshot) {
        var equipments = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var equipment = childSnapshot.val();
          equipment.key = key;
          equipments.push(equipment);
        });
        displayEquipments(equipments);
      });
    }
  }

// Fonction pour ajouter un nouvel équipement
function addEquipment(event) {
  event.preventDefault();
  var form = document.getElementById("add-equipment-form");
  var categorie = form.elements["categorie-input"].value;
  var designation = form.elements["designation-input"].value;
  var quantite = parseInt(form.elements["quantite-input"].value);
  var marque = form.elements["marque-input"].value;
  var modele = form.elements["modele-input"].value;
  var dimensions = form.elements["dimensions-input"].value;
  var prixAchatHT = parseFloat(form.elements["prix-input"].value);

  var newEquipment = {
    categorie: categorie,
    designation: designation,
    quantite: quantite,
    marque: marque,
    modele: modele,
    dimensions: dimensions,
    prix: prixAchatHT
  };

  // Envoi du nouvel équipement à la base de données
  var newEquipmentRef = equipmentsRef.push();
  newEquipmentRef.set(newEquipment);

  // Fermeture de la fenêtre modale après l'ajout de l'équipement
  var modal = document.getElementById("add-equipment-modal");
  modal.style.display = "none";

  // Réinitialisation du formulaire
  form.reset();

  // Mettre à jour le tableau d'équipements
  equipmentsRef.once("value", function(snapshot) {
    var equipments = [];
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var equipment = childSnapshot.val();
      equipment.key = key;
      equipments.push(equipment);
    });
    displayEquipments(equipments);
  });
}

  // Fonction pour supprimer un équipement
function deleteEquipment(key) {
  // Suppression de l'équipement dans la base de données
  var equipmentRef = database.ref("equipments/" + key);
  equipmentRef.remove();

  // Fermeture de la fenêtre modale après la suppression
  var modal = document.getElementById("equipment-detail-modal");
  modal.style.display = "none";

  // Mettre à jour le tableau d'équipements
  equipmentsRef.once("value", function(snapshot) {
    var equipments = [];
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var equipment = childSnapshot.val();
      equipment.key = key;
      equipments.push(equipment);
    });
    displayEquipments(equipments);
  });
}

  // Gestion du filtre par catégorie
  var categorieFilter = document.getElementById("categorie-filter");
  categorieFilter.addEventListener("change", function () {
    var selectedCategorie = categorieFilter.value;
    if (selectedCategorie === "All") {
      equipmentsRef.once("value", function (snapshot) {
        var equipments = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var equipment = childSnapshot.val();
          equipment.key = key;
          equipments.push(equipment);
        });
        displayEquipments(equipments);
      });
    } else {
      equipmentsRef.orderByChild("categorie").equalTo(selectedCategorie).once("value", function (snapshot) {
        var equipments = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var equipment = childSnapshot.val();
          equipment.key = key;
          equipments.push(equipment);
        });
        displayEquipments(equipments);
      });
    }
  });

  // Gestion du bouton d'ajout d'équipement
  var addEquipmentButton = document.getElementById("bouton-pageprincipale-ajouterequipement");
  addEquipmentButton.addEventListener("click", function () {
    var modal = document.getElementById("add-equipment-modal");
    var closeButton = document.getElementById("bouton-ajouterequipement-fermer");

    // Affichage de la fenêtre modale pour l'ajout
    modal.style.display = "block";

    // Fermeture de la fenêtre modale en cliquant sur le bouton de fermeture
    closeButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

  });

  // Gestion de la soumission du formulaire d'ajout d'équipement
  var addEquipmentForm = document.getElementById("add-equipment-form");
  addEquipmentForm.addEventListener("submit", addEquipment);

  // Récupération et affichage des équipements au chargement de la page
  equipmentsRef.once("value", function (snapshot) {
    var equipments = [];
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;
      var equipment = childSnapshot.val();
      equipment.key = key;
      equipments.push(equipment);
    });
    displayEquipments(equipments);
  });

  // Fonction pour trier la table par colonne
function sortTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("equipment-list");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      // Vérifiez si x et y ne sont pas nuls
      if (x && y) {
        var xValue = x.textContent || x.innerText;
        var yValue = y.textContent || y.innerText;
        if (xValue.toLowerCase() > yValue.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

  // Fonction pour afficher les équipements triés
  function displaySortedEquipments(columnIndex) {
    sortTable(columnIndex);
  }

  // Appel initial pour trier la colonne "Catégorie" au chargement de la page
  displaySortedEquipments(0); // Tri initial sur la colonne "Catégorie"

  // Ajouter un gestionnaire d'événement de clic aux en-têtes de colonne pour le tri
  var thElements = document.querySelectorAll(".class-pageprincipale-tableau th");
  thElements.forEach(function (th, columnIndex) {
    th.addEventListener("click", function () {
      // Appliquer le tri lorsque l'utilisateur clique sur l'en-tête de colonne
      displaySortedEquipments(columnIndex);

      // Réinitialiser la classe "sorted" sur tous les en-têtes de colonne
      thElements.forEach(function (header) {
        header.classList.remove("sorted");
      });

      // Ajouter la classe "sorted" à l'en-tête de colonne actuel
      th.classList.add("sorted");
    });
	  // Ajout d'un événement click pour afficher le détail de l'équipement
row.addEventListener("click", function () {
  // Utilisation d'une fonction anonyme pour capturer la valeur de equipment
  (function (currentEquipment) {
    displayEquipmentDetail(currentEquipment.key);
  })(equipment);
});
  });
});
