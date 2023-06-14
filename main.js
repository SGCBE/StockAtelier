document.addEventListener("DOMContentLoaded", function() {
  const equipmentList = document.getElementById("equipment-list");
  const addEquipmentModal = document.getElementById("add-equipment-modal");
  const addEquipmentForm = document.getElementById("add-equipment-form");
  const closeEquipmentDetailModal = document.querySelector("#equipment-detail-modal .close-modal");
  const addEquipmentButton = document.getElementById("add-equipment-button");
  let selectedEquipment;
  const equipment = {};

  const firebaseConfig = {
    apiKey: "AIzaSyCRxjJPOHEBAbnXQariFN6funIWPpsIe28",
    authDomain: "atelier---gestion-de-stock.firebaseapp.com",
    databaseURL: "https://atelier---gestion-de-stock-default-rtdb.firebaseio.com",
    projectId: "atelier---gestion-de-stock",
    storageBucket: "atelier---gestion-de-stock.appspot.com",
    messagingSenderId: "92935528444",
    appId: "1:92935528444:web:57786855ed9cc7ef129c79"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const equipmentRef = database.ref("equipments");

  function addEquipmentToDatabase(newEquipment) {
    const newEquipmentRef = database.ref("equipments").push();
    const equipmentKey = newEquipmentRef.key;
    newEquipment.key = equipmentKey;
    newEquipmentRef.set(newEquipment);
  }

  function loadEquipmentsFromDatabase() {
    equipmentRef.on("value", function(snapshot) {
      const equipments = snapshot.val();
      const equipmentTableBody = equipmentList.getElementsByTagName("tbody")[0];

      equipmentTableBody.innerHTML = "";

      for (let key in equipments) {
        const equipment = equipments[key];
        const row = createEquipmentRow(key, equipment);
        equipmentTableBody.appendChild(row);
      }
    });
  }

  loadEquipmentsFromDatabase();

  if (addEquipmentButton) {
    addEquipmentButton.addEventListener("click", function() {
      addEquipmentModal.style.display = "block";
    });
  }

  if (closeEquipmentDetailModal) {
    closeEquipmentDetailModal.addEventListener("click", function() {
      const modal = document.getElementById("equipment-detail-modal");
      modal.style.display = "none";
    });
  }

  addEquipmentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const categorie = document.getElementById("categorie-input").value;
    const designation = document.getElementById("designation-input").value;
    const quantite = document.getElementById("quantite-input").value;
    const marque = document.getElementById("marque-input").value;
    const modele = document.getElementById("modele-input").value;
    const dimensions = document.getElementById("dimensions-input").value;
    const prixAchatHT = document.getElementById("prix-input").value;

    const newEquipment = {
      categorie: categorie,
      designation: designation,
      quantite: quantite,
      marque: marque,
      modele: modele,
      dimensions: dimensions,
      prixAchatHT: prixAchatHT
    };

    addEquipmentToDatabase(newEquipment);
    addEquipmentForm.reset();
    addEquipmentModal.style.display = "none";
  });

  function createEquipmentRow(key, equipment) {
    const row = document.createElement("tr");

    if (row) {
      row.addEventListener("click", function() {
        selectedEquipment = equipment;
        const rows = document.querySelectorAll("#equipment-list tbody tr");
        rows.forEach(function(row) {
          row.classList.remove("highlight");
        });
        row.classList.add("highlight");
        openEditEquipmentModal(key);
      });
    }

    const columns = [
      equipment.designation,
      equipment.quantite,
      equipment.marque,
      equipment.modele,
      equipment.dimensions,
      equipment.prixAchatHT
    ];

    for (let i = 0; i < columns.length; i++) {
      const cell = document.createElement("td");
      cell.textContent = columns[i];
      row.appendChild(cell);
    }

    return row;
  }

  function closeEditEquipmentModal() {
    const modal = document.getElementById("equipment-detail-modal");
    modal.style.display = "none";
  }

  function openEditEquipmentModal(key) {
    const modal = document.getElementById("equipment-detail-modal");
    const equipmentDetail = modal.querySelector(".equipment-detail");
    const deleteButton = modal.querySelector(".btnSupprimer");
    const editForm = modal.querySelector(".btnModifier");

    if (equipmentDetail && selectedEquipment) {
      equipmentDetail.innerHTML = "";

      const title = document.createElement("h2");
      title.textContent = selectedEquipment.designation;
      equipmentDetail.appendChild(title);

      const detailList = document.createElement("ul");

      const categorie = createDetailItem("Catégorie", selectedEquipment.categorie);
      detailList.appendChild(categorie);

      const quantite = createDetailItem("Quantité", selectedEquipment.quantite);
      detailList.appendChild(quantite);

      const marque = createDetailItem("Marque", selectedEquipment.marque);
      detailList.appendChild(marque);

      const modele = createDetailItem("Modèle", selectedEquipment.modele);
      detailList.appendChild(modele);

      const dimensions = createDetailItem("Dimensions", selectedEquipment.dimensions);
      detailList.appendChild(dimensions);

      const prixAchatHT = createDetailItem("Prix d'achat HT", selectedEquipment.prixAchatHT);
      detailList.appendChild(prixAchatHT);

      equipmentDetail.appendChild(detailList);
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", function() {
        deleteEquipmentFromDatabase(key);
      });
    }

    if (editForm) {
      editForm.addEventListener("submit", function(event) {
        event.preventDefault();
        updateEquipmentInDatabase(key, editForm);
      });
    }

    modal.style.display = "block";
  }

  function createDetailItem(label, value) {
    const item = document.createElement("li");
    const labelElement = document.createElement("span");
    labelElement.textContent = label + ": ";
    item.appendChild(labelElement);
    const valueElement = document.createElement("span");
    valueElement.textContent = value;
    item.appendChild(valueElement);
    return item;
  }

  function deleteEquipmentFromDatabase(key) {
    const equipmentToDeleteRef = equipmentRef.child(key);
    equipmentToDeleteRef.remove();
    const modal = document.getElementById("equipment-detail-modal");
    modal.style.display = "none";
  }

  function updateEquipmentInDatabase(key, form) {
    const updates = {};
    updates["/equipments/" + key] = {
      categorie: form.categorie.value,
      designation: form.designation.value,
      quantite: form.quantite.value,
      marque: form.marque.value,
      modele: form.modele.value,
      dimensions: form.dimensions.value,
      prixAchatHT: form.prixAchatHT.value
    };
    database.ref().update(updates);
    const modal = document.getElementById("equipment-detail-modal");
    modal.style.display = "none";
  }
});