// Tableau pour stocker les équipements
let equipmentList = [];

// Fonction pour ajouter un équipement
function addEquipment(deliveryDate, supplierClient, brand, type, reference, serialNumber, value, purchaseInvoice, invoiceDate, complement) {
  const equipment = {
    deliveryDate,
    supplierClient,
    brand,
    type,
    reference,
    serialNumber,
    value,
    purchaseInvoice,
    invoiceDate,
    complement
  };

  equipmentList.push(equipment);
}

// Fonction pour afficher les équipements dans le tableau
function displayEquipment() {
  const table = document.getElementById('equipmentTable');

  // Réinitialiser le contenu du tableau
  table.innerHTML = '';

  // Ajouter l'en-tête du tableau
  const headerRow = document.createElement('tr');
  const headers = ['Date de livraison', 'Fournisseur / Client', 'Marque', 'Type', 'Référence', 'Numéro de série', 'Valeur HT', 'Facture d\'achat', 'Date de facture', 'Informations complémentaires', 'Actions'];

  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  // Ajouter chaque équipement dans le tableau
  equipmentList.forEach((equipment, index) => {
    const row = document.createElement('tr');

    const deliveryDateCell = document.createElement('td');
    deliveryDateCell.textContent = equipment.category;
    row.appendChild(categoryCell);
    
    const deliveryDateCell = document.createElement('td');
    deliveryDateCell.textContent = equipment.deliveryDate;
    row.appendChild(deliveryDateCell);

    const supplierClientCell = document.createElement('td');
    supplierClientCell.textContent = equipment.supplierClient;
    row.appendChild(supplierClientCell);

    const brandCell = document.createElement('td');
    brandCell.textContent = equipment.brand;
    row.appendChild(brandCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = equipment.type;
    row.appendChild(typeCell);

    const referenceCell = document.createElement('td');
    referenceCell.textContent = equipment.reference;
    row.appendChild(referenceCell);

    const serialNumberCell = document.createElement('td');
    serialNumberCell.textContent = equipment.serialNumber;
    row.appendChild(serialNumberCell);

    const valueCell = document.createElement('td');
    valueCell.textContent = equipment.value;
    row.appendChild(valueCell);

    const purchaseInvoiceCell = document.createElement('td');
    purchaseInvoiceCell.textContent = equipment.purchaseInvoice;
    row.appendChild(purchaseInvoiceCell);

    const invoiceDateCell = document.createElement('td');
    invoiceDateCell.textContent = equipment.invoiceDate;
    row.appendChild(invoiceDateCell);

    const complementCell = document.createElement('td');
    complementCell.textContent = equipment.complement;
    row.appendChild(complementCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.addEventListener('click', () => openEditModal(index));
    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);

    table.appendChild(row);
  });
}

// Fonction pour ouvrir le modal de modification
function openEditModal(index) {
  const equipment = equipmentList[index];

  const editDeliveryDateInput = document.getElementById('editDeliveryDate');
  editDeliveryDateInput.value = equipment.deliveryDate;

  const editSupplierClientInput = document.getElementById('editSupplierClient');
  editSupplierClientInput.value = equipment.supplierClient;

  const editBrandInput = document.getElementById('editBrand');
  editBrandInput.value = equipment.brand;

  const editTypeInput = document.getElementById('editType');
  editTypeInput.value = equipment.type;

  const editReferenceInput = document.getElementById('editReference');
  editReferenceInput.value = equipment.reference;

  const editSerialNumberInput = document.getElementById('editSerialNumber');
  editSerialNumberInput.value = equipment.serialNumber;

  const editValueInput = document.getElementById('editValue');
  editValueInput.value = equipment.value;

  const editPurchaseInvoiceInput = document.getElementById('editPurchaseInvoice');
  editPurchaseInvoiceInput.value = equipment.purchaseInvoice;

  const editInvoiceDateInput = document.getElementById('editInvoiceDate');
  editInvoiceDateInput.value = equipment.invoiceDate;

  const editComplementInput = document.getElementById('editComplement');
  editComplementInput.value = equipment.complement;

  // Ouvrir le modal
  showModal('editModal');
}

// Fonction pour fermer le modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Fonction pour filtrer les équipements
function filterEquipment() {
  const filterValue = document.getElementById('filterInput').value.toLowerCase();

  const filteredEquipment = equipmentList.filter(equipment => {
    // Vérifier si le filtre correspond à la marque, au type ou à la référence de l'équipement
    const { brand, type, reference } = equipment;
    return brand.toLowerCase().includes(filterValue) || type.toLowerCase().includes(filterValue) || reference.toLowerCase().includes(filterValue);
  });

  // Afficher les équipements filtrés
  displayFilteredEquipment(filteredEquipment);
}

// Fonction pour afficher les équipements filtrés dans le tableau
function displayFilteredEquipment(filteredEquipment) {
  const table = document.getElementById('equipmentTable');

  // Réinitialiser le contenu du tableau
  table.innerHTML = '';

  // Ajouter l'en-tête du tableau
  const headerRow = document.createElement('tr');
  const headers = ['Date de livraison', 'Fournisseur / Client', 'Marque', 'Type', 'Référence', 'Numéro de série', 'Valeur HT', 'Facture d\'achat', 'Date de facture', 'Informations complémentaires', 'Actions'];

  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  // Ajouter chaque équipement filtré dans le tableau
  filteredEquipment.forEach((equipment, index) => {
    const row = document.createElement('tr');

    const deliveryDateCell = document.createElement('td');
    deliveryDateCell.textContent = equipment.deliveryDate;
    row.appendChild(deliveryDateCell);

    const supplierClientCell = document.createElement('td');
    supplierClientCell.textContent = equipment.supplierClient;
    row.appendChild(supplierClientCell);

    const brandCell = document.createElement('td');
    brandCell.textContent = equipment.brand;
    row.appendChild(brandCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = equipment.type;
    row.appendChild(typeCell);

    const referenceCell = document.createElement('td');
    referenceCell.textContent = equipment.reference;
    row.appendChild(referenceCell);

    const serialNumberCell = document.createElement('td');
    serialNumberCell.textContent = equipment.serialNumber;
    row.appendChild(serialNumberCell);

    const valueCell = document.createElement('td');
    valueCell.textContent = equipment.value;
    row.appendChild(valueCell);

    const purchaseInvoiceCell = document.createElement('td');
    purchaseInvoiceCell.textContent = equipment.purchaseInvoice;
    row.appendChild(purchaseInvoiceCell);

    const invoiceDateCell = document.createElement('td');
    invoiceDateCell.textContent = equipment.invoiceDate;
    row.appendChild(invoiceDateCell);

    const complementCell = document.createElement('td');
    complementCell.textContent = equipment.complement;
    row.appendChild(complementCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.addEventListener('click', () => openEditModal(index));
    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);

    table.appendChild(row);
  });
}

// Fonction pour afficher le modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

// Fonction pour ajouter un nouvel équipement
function addNewEquipment() {
  const deliveryDateInput = document.getElementById('deliveryDate');
  const supplierClientInput = document.getElementById('supplierClient');
  const brandInput = document.getElementById('brand');
  const typeInput = document.getElementById('type');
  const referenceInput = document.getElementById('reference');
  const serialNumberInput = document.getElementById('serialNumber');
  const valueInput = document.getElementById('value');
  const purchaseInvoiceInput = document.getElementById('purchaseInvoice');
  const invoiceDateInput = document.getElementById('invoiceDate');
  const complementInput = document.getElementById('complement');

  const deliveryDate = deliveryDateInput.value;
  const supplierClient = supplierClientInput.value;
  const brand = brandInput.value;
  const type = typeInput.value;
  const reference = referenceInput.value;
  const serialNumber = serialNumberInput.value;
  const value = valueInput.value;
  const purchaseInvoice = purchaseInvoiceInput.value;
  const invoiceDate = invoiceDateInput.value;
  const complement = complementInput.value;

  // Ajouter l'équipement à la liste
  addEquipment(deliveryDate, supplierClient, brand, type, reference, serialNumber, value, purchaseInvoice, invoiceDate, complement);

  // Réinitialiser les valeurs des champs
  deliveryDateInput.value = '';
  supplierClientInput.value = '';
  brandInput.value = '';
  typeInput.value = '';
  referenceInput.value = '';
  serialNumberInput.value = '';
  valueInput.value = '';
  purchaseInvoiceInput.value = '';
  invoiceDateInput.value = '';
  complementInput.value = '';

  // Fermer le modal
  closeModal('addModal');

  // Mettre à jour l'affichage du tableau des équipements
  displayEquipment();
}

// Mettre à jour l'affichage initial du tableau des équipements
displayEquipment();
