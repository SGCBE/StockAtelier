document.addEventListener("DOMContentLoaded", function() {
  const filterCategory = document.getElementById("filterCategory");
  const equipmentTableBody = document.getElementById("equipmentTableBody");
  const addEquipmentButton = document.getElementById("addEquipmentButton");
  const addEquipmentModal = document.getElementById("addEquipmentModal");
  const closeModalButton = document.getElementById("closeModalButton");
  const addEquipmentForm = document.getElementById("addEquipmentForm");

  // Fonction pour afficher les équipements en fonction de la catégorie sélectionnée
  function filterEquipment() {
    const selectedCategory = filterCategory.value;

    // Réinitialisation du tableau
    equipmentTableBody.innerHTML = "";

    // Filtrage des équipements
    const filteredEquipment = equipment.filter(function(equipment) {
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
  filterCategory.addEventListener("change", filterEquipment);

  // Gestion de l'événement de clic sur le bouton "Ajouter équipement"
  addEquipmentButton.addEventListener("click", function() {
    addEquipmentModal.style.display = "block";
  });

  // Gestion de l'événement de clic sur le bouton de fermeture du modal
  closeModalButton.addEventListener("click", function() {
    addEquipmentModal.style.display = "none";
  });

  // Gestion de l'événement de soumission du formulaire d'ajout d'équipement
  addEquipmentForm.addEventListener("submit", function(event) {
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
      category: category,
      name: name,
      complement: complement
    };

    // Ajout du nouvel équipement à la liste des équipements
    equipment.push(newEquipment);

    // Réinitialisation du formulaire
    addEquipmentForm.reset();

    // Fermeture du modal
    addEquipmentModal.style.display = "none";

    // Filtrage et affichage des équipements mis à jour
    filterEquipment();
  });
});
