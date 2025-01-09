document.addEventListener("DOMContentLoaded", () => {
  const articleId = new URLSearchParams(window.location.search).get("id");
  const articleTitleField = document.getElementById("article-title");
  const errorContainer = document.getElementById("error-container");
  const deleteButton = document.getElementById("delete-button");

  function showError(message) {
    errorContainer.classList.remove("d-none");
    errorContainer.classList.add("alert", "alert-danger");
    errorContainer.innerHTML = `<strong>Erreur :</strong> ${message}`;

    setTimeout(() => {
      errorContainer.classList.add("d-none");
      errorContainer.innerHTML = "";
    }, 5000);
  }

  if (articleId) {
    // Fetch pour récupérer le titre de l'article
    fetch(`http://localhost:3000/articles/${articleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'article");
        }
        return response.json();
      })
      .then((data) => {
        articleTitleField.value = data.title || "Titre introuvable";
      })
      .catch(() => {
        articleTitleField.value = "Erreur lors du chargement.";
      });
  } else {
    articleTitleField.value = "Aucun article sélectionné.";
  }

  deleteButton.addEventListener("click", () => {
    const articleTitle = articleTitleField.value.trim();

    if (!articleTitle) {
      showError("Le champ du titre de l'article ne peut pas être vide.");
      return;
    }

    if (!articleId) {
      showError("Aucun article sélectionné pour suppression.");
      return;
    }

    // Suppression de l'article
    fetch(`http://localhost:3000/articles/${articleId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'article");
        }
        return response.json();
      })
      .then(() => {
        alert("Article supprimé avec succès.");
        window.location.href = "news.html";
      })
      .catch(() => {
        showError("Impossible de supprimer l'article.");
      });
  });
});
