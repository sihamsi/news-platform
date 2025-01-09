const form = document.getElementById("news-form");
const errorContainer = document.getElementById("error-container");
const articleId = new URLSearchParams(window.location.search).get("id");

// Affiche un message d'erreur
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

// Charge les données de l'article à modifier
function loadArticleData() {
  if (!articleId) {
    showError("Aucun ID d'article spécifié dans l'URL.");
    return;
  }

  fetch(`http://localhost:3000/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur dans la récupération des données.");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        document.getElementById("title").value = data.title || "";
        document.getElementById("content").value = data.content || "";
      }
    })
    .catch((error) => {
      console.error(error);
      showError("Impossible de récupérer les données de l'article.");
    });
}

// Met à jour l'article
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title) {
    showError("Le titre est requis.");
    return;
  }

  if (!content) {
    showError("Le contenu est requis.");
    return;
  }

  const articleData = {
    title,
    content,
  };

  fetch(`http://localhost:3000/articles/${articleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Article mis à jour avec succès :", data);
      alert("Article mis à jour !");
      window.location.href = "news.html";
    })
    .catch((error) => {
      console.error(error);
      showError("Une erreur est survenue lors de la mise à jour.");
    });
});

// Charger les données au chargement de la page
if (articleId) {
  loadArticleData();
}
