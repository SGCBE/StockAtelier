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

  const editIndexInput = document.getElementById('editIndex');
  editIndexInput.value = index;

  showModal('editModal');
}

// Fonction pour modifier un équipement
function editEquipment() {
  const editIndexInput = document.getElementById('editIndex');
  const index = editIndexInput.value;

  const equipment = equipmentList[index];

  const editDeliveryDateInput = document.getElementById('editDeliveryDate');
  equipment.deliveryDate = editDeliveryDateInput.value;

  const editSupplierClientInput = document.getElementById('editSupplierClient');
  equipment.supplierClient = editSupplierClientInput.value;

  const editBrandInput = document.getElementById('editBrand');
  equipment.brand = editBrandInput.value;

  const editTypeInput = document.getElementById('editType');
  equipment.type = editTypeInput.value;

  const editReferenceInput = document.getElementById('editReference');
  equipment.reference = editReferenceInput.value;

  const editSerialNumberInput = document.getElementById('editSerialNumber');
  equipment.serialNumber = editSerialNumberInput.value;

  const editValueInput = document.getElementById('editValue');
  equipment.value = editValueInput.value;

  const editPurchaseInvoiceInput = document.getElementById('editPurchaseInvoice');
  equipment.purchaseInvoice = editPurchaseInvoiceInput.value;

  const editInvoiceDateInput = document.getElementById('editInvoiceDate');
  equipment.invoiceDate = editInvoiceDateInput.value;

  const editComplementInput = document.getElementById('editComplement');
  equipment.complement = editComplementInput.value;

  displayEquipment();
  closeModal('editModal');
}

// Exemple d'ajout d'un équipement
addEquipment('2023-05-22', 'Fournisseur A', 'Marque A', 'Type A', 'Référence A', '123456', 1000, 'Facture A', '2023-05-15', 'Complément A');
addEquipment('2023-05-23', 'Fournisseur B', 'Marque B', 'Type B', 'Référence B', '654321', 2000, 'Facture B', '2023-05-16', 'Complément B');

// Afficher les équipements dans le tableau
displayEquipment();
