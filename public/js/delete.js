const errorContainer = document.getElementById("error-container");
const deleteButton = document.getElementById("delete-button");
const articleId = new URLSearchParams(window.location.search).get("id"); // Récupérer l'ID de l'article à supprimer (via l'URL)

function showError(message) {
  errorContainer.classList.remove("d-none");
  errorContainer.classList.add("alert", "alert-danger");
  errorContainer.innerHTML = `
    <strong>Erreur :</strong> ${message}
  `;

  setTimeout(() => {
    errorContainer.classList.add("d-none");
    errorContainer.innerHTML = "";
  }, 5000);
}

// Supprimer l'article
function deleteArticle() {
  if (!articleId) {
    showError("L'ID de l'article est manquant.");
    return;
  }

  fetch(`URL_DE_VOTRE_API/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Article supprimé :", data);
      // Rediriger vers la liste des articles après suppression
      window.location.href = "news.html";
    })
    .catch((error) => {
      showError("Une erreur est survenue lors de la suppression.");
    });
}

deleteButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Confirmer la suppression avant de procéder
  const confirmDelete = confirm(
    "Êtes-vous sûr de vouloir supprimer cet article ?"
  );
  if (confirmDelete) {
    deleteArticle();
  }
});
