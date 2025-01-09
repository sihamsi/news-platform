const form = document.getElementById("news-form");
const errorContainer = document.getElementById("error-container");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Récupérer les valeurs des champs
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  // Validation des champs
  if (!title) {
    showError("Le titre est requis.");
    return;
  }

  if (!content) {
    showError("Le contenu est requis.");
    return;
  }

  // Sauvegarde de l'article dans le localStorage
  const articleData = {
    title,
    content,
  };

  const existingArticles = JSON.parse(localStorage.getItem("articles")) || [];
  existingArticles.push(articleData);
  localStorage.setItem("articles", JSON.stringify(existingArticles));

  alert("Article créé avec succès !");
  window.location.href = "news.html"; // Rediriger vers la page des articles
});
