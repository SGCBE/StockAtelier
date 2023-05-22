// Fonction pour ouvrir le modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Fonction pour fermer le modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Fonction pour soumettre le formulaire
function submitForm(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupère les valeurs du formulaire
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var price = document.getElementById("price").value;

  // Vérifie si les champs sont vides
  if (name === "" || description === "" || price === "") {
    document.getElementById("errorMessage").innerHTML = "Veuillez remplir tous les champs.";
  } else {
    // Ajoute une nouvelle ligne dans le tableau avec les valeurs du formulaire
    var table = document.querySelector("table tbody");
    var newRow = table.insertRow();
    newRow.innerHTML = "<td></td><td>" + name + "</td><td>" + description + "</td><td>" + price + "</td>";

    // Réinitialise les valeurs du formulaire
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";

    // Ferme le modal
    closeModal();
  }
}
