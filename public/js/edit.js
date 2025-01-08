const form = document.getElementById("news-form");
const errorContainer = document.getElementById("error-container");
const articleId = new URLSearchParams(window.location.search).get("id"); // Récupérer l'ID de l'article à modifier (via l'URL)

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

function loadArticleData() {
  fetch(`URL_DE_VOTRE_API/${articleId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        document.getElementById("title").value = data.title;
        document.getElementById("content").value = data.content;
      }
    })
    .catch(() => {
      showError("Impossible de récupérer les données de l'article.");
    });
}

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

  fetch(`URL_DE_VOTRE_API/${articleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Article mis à jour :", data);
      form.reset();
      errorContainer.classList.add("d-none");
    })
    .catch((error) => {
      showError("Une erreur est survenue lors de la mise à jour.");
    });
});

if (articleId) {
  loadArticleData();
}
