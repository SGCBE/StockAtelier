document.addEventListener("DOMContentLoaded", function() {
  const filterCategory = document.getElementById("filterCategory");
  const equipmentTableBody = document.getElementById("equipmentTableBody");
  const addButton = document.getElementById("addButton");
  const addModal = document.getElementById("addModal");
  const closeButtons = document.getElementsByClassName("close");
  const addForm = document.getElementById("addForm");

  // Fonction pour afficher les équipements en fonction de la catégorie sélectionnée
  function filterEquipment() {
    const selectedCategory = filterCategory.value;

    // Réinitialisation du tableau
    equipmentTableBody.innerHTML = "";

    // Filtrage des équipements
    const filteredEquipment = equipmentList.filter(function(equipment) {
      return selectedCategory === "" || equipment.category === selectedCategory;
    });

    // Affichage des équipements filtrés
    filteredEquipment.forEach(function(equipment) {
      const row = document.createElement("tr");

      const deliveryDateCell = document.createElement("td");
      deliveryDateCell.textContent = equipment.deliveryDate;
      row.appendChild(deliveryDateCell);

      const supplierClientCell = document.createElement("td");
      supplierClientCell.textContent = equipment.supplierClient;
      row.appendChild(supplierClientCell);

      const categoryCell = document.createElement("td");
      categoryCell.textContent = equipment.category;
      row.appendChild(categoryCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = equipment.name;
      row.appendChild(nameCell);

      equipmentTableBody.appendChild(row);
    });
  }

  // Gestion de l'événement de changement de catégorie
  if (filterCategory) {
    filterCategory.addEventListener("change", filterEquipment);
  }

  // Gestion de l'événement de clic sur le bouton "Ajouter un équipement"
  if (addButton) {
    addButton.addEventListener("click", function() {
      addModal.style.display = "block";
    });
  }

  // Gestion de l'événement de clic sur le bouton de fermeture du modal
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function() {
      addModal.style.display = "none";
    });
  }

  // Gestion de l'événement de soumission du formulaire d'ajout d'équipement
  if (addForm) {
    addForm.addEventListener("submit", function(event) {
      event.preventDefault();

      // Récupération des valeurs du formulaire
      const deliveryDate = document.getElementById("deliveryDate").value;
      const supplierClient = document.getElementById("supplierClient").value;
      const category = document.getElementById("category").value;
      const name = document.getElementById("name").value;
      const complement = document.getElementById("complement").value;

      // Création d'un nouvel objet équipement
      const newEquipment = {
        deliveryDate: deliveryDate,
        supplierClient: supplierClient,
        brand: brand,
        type:type,
        reference:reference,
        serialNumber:serialNumber,
        value:value,
        purchaseInvoice:purchaseInvoice,
        complement:complement,
        
      };

      // Ajout du nouvel équipement à la liste des équipements
      equipmentList.push(newEquipment);

      // Réinitialisation du formulaire
      addForm.reset();

      // Fermeture du modal d'ajout
      addModal.style.display = "none";

      // Filtrage et affichage des équipements mis à jour
      filterEquipment();
    });
  }
});
