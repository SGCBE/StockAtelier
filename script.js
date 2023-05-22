const equipmentTableBody = document.getElementById('equipmentTableBody');
const addEquipmentButton = document.getElementById('addEquipmentButton');
const addEquipmentModal = document.getElementById('addEquipmentModal');
const closeModalButton = document.getElementById('closeModalButton');
const addEquipmentForm = document.getElementById('addEquipmentForm');

addEquipmentButton.addEventListener('click', () => {
  addEquipmentModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  addEquipmentModal.style.display = 'none';
});

addEquipmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dateLivraison = document.getElementById('dateLivraison').value;
  const fournisseurClient = document.getElementById('fournisseurClient').value;
  const marque = document.getElementById('marque').value;
  const type = document.getElementById('type').value;
  const reference = document.getElementById('reference').value;
  const numeroSerie = document.getElementById('numeroSerie').value;
  const valeurHT = document.getElementById('valeurHT').value;
  const factureAchat = document.getElementById('factureAchat').value;
  const dateFacture = document.getElementById('dateFacture').value;
  const complement = document.getElementById('complement').value;

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${dateLivraison}</td>
    <td>${fournisseurClient}</td>
    <td>${marque}</td>
    <td>${type}</td>
    <td>${reference}</td>
    <td>${numeroSerie}</td>
    <td>${valeurHT}</td>
    <td>${factureAchat}</td>
    <td>${dateFacture}</td>
    <td>${complement}</td>
  `;
  equipmentTableBody.appendChild(newRow);

  addEquipmentModal.style.display = 'none';
  addEquipmentForm.reset();
});
